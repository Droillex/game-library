export const RATINGS = {
  VERY_POSITIVE: { title: "Very Positive", cssClass: "rating_positive" },
  POSITIVE: { title: "Positive", cssClass: "rating_positive" },
  MIXED: { title: "Mixed", cssClass: "rating_mixed" },
  NEGATIVE: { title: "Negative", cssClass: "rating_negative" },
  MOSTLY_NEGATIVE: { title: "Mostly Negative", cssClass: "rating_negative" },
};

export const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const GENRES = [
  { text: "Adventure", id: 31 },
  { text: "Shooter", id: 5 },
  { text: "Fighting", id: 4 },
  { text: "Platform", id: 8 },
  { text: "Racing", id: 10 },
  { text: "Role-playing (RPG)", id: 12 },
  { text: "Strategy", id: 15 },
  { text: "Hack 'n Slash", id: 25 },
  { text: "Arcade", id: 33 },
  { text: "Visual Novel", id: 34 },
  { text: "MOBA", id: 36 },
]
  .sort((prev, next) => (prev.text > next.text ? 1 : -1))
  .reverse();

const PLATFORMS = [
  {
    id: 8,
    text: "PlayStation 2",
  },
  {
    id: 6,
    text: "PC (Windows)",
  },
  {
    id: 23,
    text: "Dreamcast",
  },
  {
    id: 130,
    text: "Nintendo Switch",
  },
  {
    id: 11,
    text: "Xbox",
  },
  {
    id: 24,
    text: "Game Boy Advance",
  },
  {
    id: 4,
    text: "Nintendo 64",
  },
  {
    id: 18,
    text: "NES",
  },
  {
    id: 41,
    text: "Wii U",
  },
  {
    id: 37,
    text: "Nintendo 3DS",
  },
  {
    id: 29,
    text: "Sega Mega Drive/Genesis",
  },
  {
    id: 38,
    text: "PlayStation Portable",
  },
  {
    id: 19,
    text: "SNES",
  },
  {
    id: 9,
    text: "PlayStation 3",
  },
  {
    id: 20,
    text: "Nintendo DS",
  },
  {
    id: 48,
    text: "PlayStation 4",
  },
  {
    id: 5,
    text: "Wii",
  },
  {
    id: 167,
    text: "PlayStation 5",
  },
  {
    id: 12,
    text: "Xbox 360",
  },
  {
    id: 169,
    text: "Xbox Series X|S",
  },
  {
    id: 49,
    text: "Xbox One",
  },
  {
    id: 7,
    text: "PlayStation",
  },
]
  .sort((prev, next) => (prev.text > next.text ? 1 : -1))
  .reverse();

const GAME_MODES = [
  { id: 1, text: "Single player" },
  { id: 2, text: "Multiplayer" },
  { id: 3, text: "Co-op" },
  { id: 4, text: "Split screen" },
  { id: 5, text: "MMO" },
  { id: 6, text: "Battle Royale" },
];

const SORT_PARAMETERS = [
  { id: "total_rating_count", text: "Votes" },
  { id: "name", text: "Name" },
  { id: "total_rating", text: "Rating" },
  { id: "first_release_date", text: "Release Date" },
  { id: "hypes", text: "Hypes" },
];

export const CONDITIONS_CONFIG = [
  { id: "genres", title: "Genres", options: GENRES },
  { id: "platforms", title: "Platform", options: PLATFORMS },
  { id: "game_modes", title: "Game Modes", options: GAME_MODES },
];

export const SORT_CONFIG = {
  id: "sort",
  title: "Sort",
  options: SORT_PARAMETERS,
};

export const DEFAULT_SEARCH_CONDITIONS = [
  "genres != null",
  "cover != null",
  "platforms != null",
  "total_rating_count != null",
];

export const INITIAL_ITEM_COUNT = 27;
export const EXTRA_ITEM_COUNT = 18;
export const LOAD_SCROLL_DELTA = 180;

export const BANNER_IDS = [119133, 11208, 114283];
export const BANNER_NAMES: { [key: number]: string } = {
  119133: "Challenge the Elden Lords",
  11208: "2B or not 2B?",
  114283: "Steal The Show (Again)",
};

export const DEFAULT_LAYOUT = {
  banners: [
    {
      title: "Highlights",
    },
  ],
  thumbs: [
    {
      title: "Best JRPG's",
      queryString:
          "where rating >= 90 & keywords = [521] & genres != null & cover != null;sort total_rating_count desc;limit 18;",
    },
    {
      title: "Popular",
      queryString:
          "where rating >= 85 & genres != null & cover != null;sort total_rating_count desc;limit 27;",
    },
  ],
};

export const INITIAL_FILTER_VALUE = SORT_CONFIG.options[0].id;