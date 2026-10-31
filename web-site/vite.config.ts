import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { copyFile } from "node:fs/promises";
import { resolve } from "node:path";

let outputDirectory = "dist";

export default defineConfig({
  base: process.env.VITE_BASE_PATH || "/Asncodes-80/",
  plugins: [
    react(),
    {
      name: "github-pages-spa-fallback",
      apply: "build",
      configResolved(config) {
        outputDirectory = resolve(config.root, config.build.outDir);
      },
      async closeBundle() {
        await copyFile(
          resolve(outputDirectory, "index.html"),
          resolve(outputDirectory, "404.html"),
        );
      },
    },
  ],
});
