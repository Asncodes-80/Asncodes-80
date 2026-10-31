import { text, type LocalizedText } from "./resume";

/** Shared, explicit lifecycle states. Labels adapt to playing, watching, or reading. */
export type MediaStatus = "completed" | "in-progress" | "planned";
export type MediaKind = "game" | "film" | "book";

export interface Interest {
  id: string;
  kind: MediaKind;
  title: string;
  localizedTitle?: LocalizedText;
  creator?: string;
  status: MediaStatus;
  /** Path relative to public/. All artwork is served locally. */
  artwork: string;
  artworkAlt: string;
  artworkFit?: "cover" | "contain";
  /** Exact source for the cover/poster; displayed in the details dialog. */
  artworkSource: string;
  genres: string[];
  note?: LocalizedText;
  href?: string;
  /** A featured title can use separate crops for the hero and mobile layouts. */
  spotlight?: {
    label: LocalizedText;
    artwork: string;
    wideArtwork: string;
  };
}

const game = (
  slug: string,
  title: string,
  status: MediaStatus,
  appId: number,
  genres: string[],
  href?: string,
): Interest => ({
  id: slug,
  kind: "game",
  title,
  status,
  genres,
  artwork: `images/interests/${slug}.webp`,
  artworkAlt: `${title} — official key art`,
  artworkSource: `https://cdn.akamai.steamstatic.com/steam/apps/${appId}/library_600x900_2x.jpg`,
  href: href ?? `https://store.steampowered.com/app/${appId}/`,
});

/** Alireza's own selections. No invented ratings, reviews, or completion dates. */
export const interests: Interest[] = [
  game("mafia-ii", "Mafia II", "completed", 50130, ["Action", "Crime"]),
  game("mafia-iii", "Mafia III", "completed", 360430, ["Open world", "Crime"]),
  game(
    "gta-san-andreas",
    "Grand Theft Auto: San Andreas",
    "completed",
    12120,
    ["Open world", "Action"],
    "https://www.rockstargames.com/games/sanandreas",
  ),
  game("gta-iv", "Grand Theft Auto IV", "completed", 12210, [
    "Open world",
    "Liberty City",
  ]),
  game(
    "gta-v",
    "Grand Theft Auto V",
    "completed",
    271590,
    ["Open world", "Action"],
    "https://www.rockstargames.com/gta-v",
  ),
  game("rdr2", "Red Dead Redemption 2", "completed", 1174180, [
    "Open world",
    "Western",
  ]),
  game("rdr", "Red Dead Redemption", "completed", 2668510, [
    "Open world",
    "Western",
  ]),
  game("pubg", "PUBG: Battlegrounds", "completed", 578080, [
    "Battle royale",
    "Multiplayer",
  ]),
  game("cyberpunk", "Cyberpunk 2077", "in-progress", 1091500, [
    "RPG",
    "Cyberpunk",
  ]),
  {
    id: "gta-vi",
    kind: "game",
    title: "GTA VI",
    status: "planned",
    artwork: "images/interests/gta-vi.webp",
    artworkAlt:
      "GTA VI — official Rockstar artwork of Jason and Lucia beside a car at sunset",
    artworkSource: "https://www.rockstargames.com/VI/media/artwork-wallpapers",
    genres: ["Open world", "Action"],
    note: text(
      "I've been eagerly waiting for 13 years.",
      "۱۳ ساله مشتاقانه منتظرشم.",
    ),
    href: "https://www.rockstargames.com/VI/",
    spotlight: {
      label: text("MOST ANTICIPATED", "مشتاقانه در انتظار"),
      artwork: "images/interests/gta-vi-jason-lucia.webp",
      wideArtwork: "images/interests/gta-vi-jason-lucia-wide.webp",
    },
  },
  {
    id: "first-light",
    kind: "game",
    title: "007 First Light",
    status: "in-progress",
    artwork: "images/interests/007-first-light.webp",
    artworkAlt: "007 First Light — official key art",
    artworkSource:
      "https://store-images.s-microsoft.com/image/apps.8071.14287567326939893.1fdb2217-3463-49e6-b44c-c16587b03bc8.d8033845-8141-4dc4-b49e-2a8e6749235d",
    genres: ["Action", "Espionage"],
    href: "https://store.steampowered.com/app/3768760/",
  },
  game("ghost-of-tsushima", "Ghost of Tsushima", "planned", 2215430, [
    "Open world",
    "Samurai",
  ]),
  game("witcher-3", "The Witcher 3: Wild Hunt", "planned", 292030, [
    "RPG",
    "Fantasy",
  ]),
  game("last-of-us-1", "The Last of Us Part I", "planned", 1888930, [
    "Action",
    "Survival",
  ]),
  game("last-of-us-2", "The Last of Us Part II", "planned", 2531310, [
    "Action",
    "Survival",
  ]),
  {
    id: "dropout",
    kind: "film",
    title: "The Dropout",
    status: "completed",
    genres: ["Limited series", "Drama"],
    artwork: "images/interests/dropout.webp",
    artworkAlt: "The Dropout — Amanda Seyfried in the official series poster",
    artworkSource: "https://www.flicks.co.nz/tv/the-dropout-miniseries/",
    href: "https://www.hulu.com/series/the-dropout-13988f84-f1c8-40dd-a73c-4e71ab4bbe63",
  },
  {
    id: "blackberry",
    kind: "film",
    title: "BlackBerry",
    status: "completed",
    genres: ["Film", "Biographical drama"],
    artwork: "images/interests/blackberry.webp",
    artworkAlt: "BlackBerry — official 2023 film poster",
    artworkSource:
      "https://www.forgetfulfilmcritic.com/home/2023/06/02/blackberry",
    href: "https://www.imdb.com/title/tt21867434/",
  },
  {
    id: "intern",
    kind: "film",
    title: "The Intern",
    status: "completed",
    genres: ["Film", "Comedy-drama"],
    artwork: "images/interests/intern.webp",
    artworkAlt:
      "The Intern — official film poster with Robert De Niro and Anne Hathaway",
    artworkSource:
      "https://m.media-amazon.com/images/M/MV5BMTUyNjE5NjI5OF5BMl5BanBnXkFtZTgwNzYzMzU3NjE@._V1_.jpg",
    href: "https://www.warnerbros.com/movies/intern",
  },
  {
    id: "wecrashed",
    kind: "film",
    title: "WeCrashed",
    status: "completed",
    genres: ["Limited series", "Drama"],
    artwork: "images/interests/wecrashed.webp",
    artworkAlt: "WeCrashed — official Apple TV series key art",
    artworkSource: "https://www.apple.com/tv-pr/originals/wecrashed/",
    href: "https://www.apple.com/tv-pr/originals/wecrashed/",
  },
  {
    id: "legends",
    kind: "film",
    title: "DC’s Legends of Tomorrow",
    status: "completed",
    genres: ["Series", "Science fiction"],
    artwork: "images/interests/legends.webp",
    artworkAlt: "DC’s Legends of Tomorrow — ensemble cast series poster",
    artworkSource: "https://www.imdb.com/title/tt4532368/",
    href: "https://www.dc.com/tv/dcs-legends-of-tomorrow-2016-2022",
  },
  {
    id: "obsession",
    kind: "film",
    title: "Obsession",
    creator: "Curry Barker",
    status: "completed",
    genres: ["Film", "Horror"],
    artwork: "images/interests/obsession.webp",
    artworkAlt: "Obsession — official Focus Features film poster",
    artworkSource: "https://www.focusfeatures.com/obsession",
    href: "https://www.focusfeatures.com/obsession",
    note: text(
      "The horror film by Curry Barker, the filmmaker behind the YouTube channel that's a bad idea.",
      "فیلم ترسناک کری بارکر؛ فیلم‌ساز و یکی از سازندگان کانال یوتیوب that's a bad idea.",
    ),
  },
  {
    id: "monk",
    kind: "film",
    title: "Monk",
    creator: "Andy Breckman",
    status: "completed",
    genres: ["Series", "Detective", "Comedy-drama"],
    artwork: "images/interests/monk.webp",
    artworkFit: "contain",
    artworkAlt: "Monk — series poster featuring Tony Shalhoub as Adrian Monk",
    artworkSource:
      "https://m.media-amazon.com/images/I/812AGSrbk4L._AC_UF894%2C1000_QL80_.jpg",
    href: "https://www.usanetwork.com/usa-insider/monk-show-how-to-watch-where-to-stream",
    note: text(
      "Adrian Monk, played by Tony Shalhoub, solves mysteries in San Francisco with an extraordinary eye for detail.",
      "آدریان مانک با بازی تونی شالهوب؛ کارآگاهی در سان‌فرانسیسکو که با دقتی فوق‌العاده به جزئیات، معماها را حل می‌کند.",
    ),
  },
  {
    id: "flamin-hot",
    kind: "film",
    title: "Flamin’ Hot",
    creator: "Eva Longoria",
    status: "completed",
    genres: ["Film", "Biographical drama"],
    artwork: "images/interests/flamin-hot.webp",
    artworkAlt: "Flamin’ Hot — official Searchlight Pictures film poster",
    artworkSource: "https://www.searchlightpictures.com/flamin-hot",
    href: "https://www.searchlightpictures.com/flamin-hot",
    note: text(
      "A film centered on Richard Montañez, directed by Eva Longoria and starring Jesse Garcia.",
      "فیلمی دربارهٔ ریچارد مونتانیِز به کارگردانی اوا لونگوریا و با بازی جسی گارسیا.",
    ),
  },
  {
    id: "gifts-of-imperfection",
    kind: "book",
    title: "The Gifts of Imperfection",
    localizedTitle: text("The Gifts of Imperfection", "موهبت کامل نبودن"),
    creator: "Brené Brown",
    status: "completed",
    genres: ["Self-acceptance", "Psychology"],
    artwork: "images/interests/gifts-of-imperfection.webp",
    artworkAlt: "The Gifts of Imperfection by Brené Brown — book cover",
    artworkSource:
      "https://www.shelfreflection.com/blog/thegiftsofimperfection",
    href: "https://brenebrown.com/book/the-gifts-of-imperfection/",
  },
  {
    id: "atomic-habits",
    kind: "book",
    title: "Atomic Habits",
    creator: "James Clear",
    status: "completed",
    genres: ["Habits", "Personal growth"],
    artwork: "images/interests/atomic-habits.webp",
    artworkAlt: "Atomic Habits by James Clear — book cover",
    artworkSource: "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg",
    href: "https://jamesclear.com/atomic-habits",
  },
  {
    id: "slow-productivity",
    kind: "book",
    title: "Slow Productivity",
    creator: "Cal Newport",
    status: "completed",
    genres: ["Focus", "Productivity"],
    artwork: "images/interests/slow-productivity.webp",
    artworkAlt: "Slow Productivity by Cal Newport — book cover",
    artworkSource:
      "https://calnewport.com/wp-content/uploads/2024/01/slow-productivity-cover-new.jpg",
    href: "https://calnewport.com/slow/",
  },
  {
    id: "thinking-in-bets",
    kind: "book",
    title: "Thinking in Bets",
    creator: "Annie Duke",
    status: "completed",
    genres: ["Decision-making", "Psychology"],
    artwork: "images/interests/thinking-in-bets.webp",
    artworkAlt: "Thinking in Bets by Annie Duke — book cover",
    artworkSource: "https://covers.openlibrary.org/b/isbn/9780735216372-L.jpg",
    href: "https://www.annieduke.com/books/",
  },
  {
    id: "think-again",
    kind: "book",
    title: "Think Again",
    creator: "Adam Grant",
    status: "completed",
    genres: ["Rethinking", "Psychology"],
    artwork: "images/interests/think-again.webp",
    artworkAlt: "Think Again by Adam Grant — book cover",
    artworkSource: "https://covers.openlibrary.org/b/isbn/9781984878106-L.jpg",
    href: "https://adamgrant.net/book/think-again/",
  },
  {
    id: "measure-what-matters",
    kind: "book",
    title: "Measure What Matters",
    creator: "John Doerr",
    status: "completed",
    genres: ["OKRs", "Leadership"],
    artwork: "images/interests/measure-what-matters.webp",
    artworkAlt: "Measure What Matters by John Doerr — book cover",
    artworkSource: "https://covers.openlibrary.org/b/isbn/9780525536222-L.jpg",
    href: "https://www.whatmatters.com/the-book",
  },
];

export const mediaStatuses: MediaStatus[] = [
  "in-progress",
  "completed",
  "planned",
];
