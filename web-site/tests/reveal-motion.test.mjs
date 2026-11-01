import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { test } from "node:test";
import vm from "node:vm";

// Exercise the actual hook with controllable observer and animation lifecycles.
// No browser, clock sleeps, or additional test dependencies are required.
const require = createRequire(import.meta.url);
const ts = require("typescript");
const source = ts.transpileModule(
  readFileSync(new URL("../src/motion/useRevealMotion.ts", import.meta.url), "utf8"),
  { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } },
).outputText;

class Element {
  constructor(className = "", children = []) {
    this.className = className;
    this.children = children;
    this.dataset = {};
    this.queries = 0;
    this.events = new Map();
    this.animations = [];
    children.forEach((child) => { child.parent = this; });
  }
  matches(selector) { return selector.split(",").includes(`.${this.className}`); }
  contains(node) {
    return this === node || this.children.some((child) => child.contains(node));
  }
  closest(selector) {
    return this.matches(selector) ? this : this.parent?.closest(selector);
  }
  querySelectorAll(selector) {
    this.queries++;
    return this.children.flatMap((child) => [
      ...(child.matches(selector) ? [child] : []),
      ...child.querySelectorAll(selector),
    ]);
  }
  addEventListener(name, handler) { this.events.set(name, handler); }
  removeEventListener(name) { this.events.delete(name); }
  animate(keyframes, options) {
    let resolve, reject;
    const finished = new Promise((yes, no) => { resolve = yes; reject = no; });
    const animation = {
      keyframes, options, finished, resolve, cancelled: false,
      cancel() { this.cancelled = true; reject(new Error("cancelled")); },
    };
    this.animations.push(animation);
    return animation;
  }
}

function setup({ count = 1, reduced = false, fine = false, phase = "idle" } = {}) {
  const cards = Array.from({ length: count }, () => new Element("media-card"));
  const route = new Element("route-stage", cards);
  route.dataset.phase = phase;
  const shell = new Element("site-shell", [route]);
  const document = { activeElement: null };
  let observer, mutations, cleanup;
  class IntersectionObserver {
    constructor(callback) {
      this.callback = callback;
      this.observed = new Set();
      observer = this;
    }
    observe(element) { this.observed.add(element); }
    unobserve(element) { this.observed.delete(element); }
    disconnect() { this.disconnected = true; }
    deliver(elements, isIntersecting = true) {
      this.callback(elements.map((target) => ({ target, isIntersecting })));
    }
  }
  class MutationObserver {
    constructor(callback) { this.callback = callback; mutations = this; }
    observe() {}
    disconnect() { this.disconnected = true; }
  }
  const exports = {};
  vm.runInNewContext(source, {
    exports, Element, IntersectionObserver, MutationObserver, document,
    window: { IntersectionObserver, matchMedia: () => ({ matches: fine }) },
    require(name) {
      if (name === "react") return { useEffect: (effect) => { cleanup = effect(); } };
      if (name === "./preferences") return {
        CONSOLE_EASE: "ease-out", useReducedMotion: () => reduced,
      };
      throw new Error(`Unexpected import: ${name}`);
    },
  });
  exports.useRevealMotion({ current: shell });
  return { cards, route, shell, document, observer, mutations, cleanup };
}

test("touch reveals use opacity only, no stagger, and bounded concurrency", () => {
  const { cards, observer, cleanup } = setup({ count: 20 });
  observer.deliver(cards);
  assert.equal(cards.flatMap((card) => card.animations).length, 8);
  for (const card of cards.slice(0, 8)) {
    const { keyframes, options } = card.animations[0];
    assert.equal(options.delay, 0);
    assert.equal(options.duration, 240);
    assert.ok(keyframes.every((frame) => Object.keys(frame).join() === "opacity"));
  }
  assert.ok(cards.slice(8).every((card) => !observer.observed.has(card)));
  cleanup();
});

test("route transitions do not start nested reveal animations", () => {
  const { cards, observer, cleanup } = setup({ phase: "entering" });
  observer.deliver(cards);
  assert.equal(cards[0].animations.length, 0);
  assert.equal(observer.observed.size, 0);
  cleanup();
});

test("filter mutations register only added subtrees and cancel removed cards", () => {
  const { cards, shell, route, observer, mutations, cleanup } = setup();
  observer.deliver(cards);
  const queries = shell.queries;
  const added = new Element("media-card");
  route.children = [added];
  added.parent = route;
  mutations.callback([{ removedNodes: cards, addedNodes: [added] }]);
  assert.equal(shell.queries, queries);
  assert.equal(cards[0].animations[0].cancelled, true);
  assert.equal(observer.observed.has(cards[0]), false);
  assert.equal(observer.observed.has(added), true);
  mutations.callback([{ removedNodes: [], addedNodes: [{ nodeType: 3 }] }]);
  assert.equal(shell.queries, queries);
  cleanup();
});

test("scrolling past or focusing a card finishes its reveal immediately", () => {
  const { cards, shell, observer, cleanup } = setup({ count: 2 });
  observer.deliver(cards);
  observer.deliver([cards[0]], false);
  assert.equal(cards[0].animations[0].cancelled, true);
  shell.events.get("focusin")({ target: cards[1] });
  assert.equal(cards[1].animations[0].cancelled, true);
  cleanup();
});

test("finished reveals and unmounted hooks release animation effects", async () => {
  const { cards, shell, observer, mutations, cleanup } = setup({ count: 2 });
  observer.deliver(cards);
  cards[0].animations[0].resolve();
  await Promise.resolve();
  assert.equal(cards[0].animations[0].cancelled, true);
  assert.equal(observer.observed.has(cards[0]), false);
  cleanup();
  assert.equal(cards[1].animations[0].cancelled, true);
  assert.equal(observer.disconnected, true);
  assert.equal(mutations.disconnected, true);
  assert.equal(shell.events.size, 0);
});

test("reduced motion leaves content visible without attaching observers", () => {
  const { cards, observer, mutations, cleanup } = setup({ reduced: true });
  assert.equal(observer, undefined);
  assert.equal(mutations, undefined);
  assert.equal(cleanup, undefined);
  assert.equal(cards[0].animations.length, 0);
});

test("focused cards and browsers without animate keep content visible", () => {
  const { cards, document, observer, cleanup } = setup({ count: 2 });
  document.activeElement = cards[0];
  cards[1].animate = undefined;
  observer.deliver(cards);
  assert.ok(cards.every((card) => card.animations.length === 0));
  assert.equal(observer.observed.size, 0);
  cleanup();
});

test("desktop staggering stops at 60ms, even for later grid entries", () => {
  const { cards, observer, cleanup } = setup({ count: 8, fine: true });
  observer.deliver(cards);
  assert.equal(cards[0].animations[0].options.delay, 0);
  assert.equal(cards[7].animations[0].options.delay, 60);
  cleanup();
});
