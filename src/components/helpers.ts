import {
  EASING,
  GAME_MODES,
  GENRES,
  PLATFORMS,
  RATINGS,
  SORT_PARAMETERS,
} from "./consts";
import { IThumb, Thumb } from "./thumb/thumb";
import { ThumbSection } from "./thumb/thumbSection";
import { IBannerData } from "../api/interfaces";
import { BannerSection } from "./banner/bannerSection";
import { Banner } from "./banner/banner";
import { DropdownSelect } from "./filter/dropdownSelect";
import { DropdownRadio } from "./filter/dropdownRadio";
import { Filter } from "./filter/filter";
import { IFiltersData } from "./filter/interfaces";

/**
 * Options helper for Element.animate() method.
 *
 * @param {number} duration Animation duration in ms.
 * @param {EASING} easing Easing function.
 * @return {object} Animation config.
 */
export function getTimingConfig(
  duration: number,
  easing: EASING = EASING.EASE_IN_OUT
) {
  return { duration, easing };
}

/**
 * Rating config getter based on score number.
 *
 * @param {number} score Animation duration in ms.
 * @return {RATINGS} Rating config.
 */
export function getRating(score: number) {
  if (score >= 90) return RATINGS.VERY_POSITIVE;
  else if (score >= 70) return RATINGS.POSITIVE;
  else if (score >= 50) return RATINGS.MIXED;
  else if (score >= 30) return RATINGS.NEGATIVE;
  else return RATINGS.MOSTLY_NEGATIVE;
}

/**
 * Image preloader function.
 *
 * @param {string} src Image link.
 * @return {Promise<void>} Promise resolves when image had been preloaded.
 */
export function loadImage(src: string): Promise<void> {
  return new Promise<void>((resolve) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve();
  });
}

/**
 * Creates filter for main page.
 *
 * @return {Filter} Instance of Filter.
 */
export function createFilter() {
  const genres = new DropdownSelect({ id: "genres", text: "Genre" }, GENRES);
  const platforms = new DropdownSelect(
    { id: "platforms", text: "Platform" },
    PLATFORMS
  );
  const gameModes = new DropdownSelect(
    { id: "game_modes", text: "Game Modes" },
    GAME_MODES
  );
  const sort = new DropdownRadio(
    { id: "sort", text: "Sort by" },
    SORT_PARAMETERS
  );
  return new Filter([genres, platforms, gameModes], sort);
}

/**
 * Creates Thumb instance based on thumb data object.
 *
 * @param {IThumb} data Thumb data object.
 * @return {Thumb} Instance of Thumb.
 */
export function createThumb(data: IThumb) {
  return new Thumb(
    data.id,
    data.cover,
    data.title,
    data.genres,
    data.platforms
  );
}

/**
 * Creates ThumbSection instance based on title and thumb data array.
 *
 * @param {string} title Section title.
 * @param {IThumb[]} thumbsData Thumb data array.
 * @return {ThumbSection} Instance of ThumbSection.
 */
export function createThumbSection(title: string, thumbsData: IThumb[]) {
  return new ThumbSection(
    title,
    thumbsData.map((game) => createThumb(game))
  );
}

/**
 * Creates BannerSection instance based on title, banner data array and banner titles.
 *
 * @param {string} title Section title.
 * @param {IThumb[]} bannerData Thumb data array.
 * @param {object} bannerNames Object with banner titles.
 * @return {ThumbSection} Instance of ThumbSection.
 */
export function createBannerSection(
  title: string,
  bannerData: IBannerData[],
  bannerNames: { [key: number]: string }
) {
  return new BannerSection(
    title,
    bannerData.map(
      (banner) =>
        new Banner(
          banner.id,
          bannerNames[banner.id],
          banner.screenshots[
            Math.floor(Math.random() * banner.screenshots.length)
          ],
          Math.round(banner.rating),
          banner.genres
        )
    )
  );
}

/**
 * Constructs api query string.
 *
 * @param {string} searchString Game title search string.
 * @param {IFiltersData} filter United filters data.
 * @param {number} limit Max items count.
 * @param {number} offset Offset number for pagination.
 * @return {string} Query string.
 */
export function getQueryString(searchString: string, filter: IFiltersData, limit: number, offset: number) {
  let queryString =
    "where genres != null & cover != null & platforms != null & total_rating_count != null";
  if (searchString) {
    queryString += ` & name ~ *"${searchString}"*`;
  }
  if (filter.conditions.length) {
    queryString += ` & ${filter.conditions.join(" & ")}`;
  }
  queryString += `;limit ${limit};offset ${offset};`;
  queryString += `sort ${filter.sort} desc;`;
  return queryString;
}

/**
 * Promise error processing function.
 *
 * @param {Error} e Error instance.
 * @return {void}
 */
export function processError(e: Error) {
  switch (e.name) {
    case "AbortError":
      break;
    case "TooManyRequests":
      alert(`${e.message}\nIt's most likely problem with API. Try reloading the page.`);
      break;
    default:
      alert(e.message);
      break;
  }
}

/**
 * Converts default image path to small cover image size.
 *
 * @param {string} img Image path.
 * @return {string} New image path.
 */
export function getLogoImage(img: string) {
  return img.replace("t_thumb", "t_cover_small").replace("jpg", "png");
}

/**
 * Converts Unix date format to Date.
 *
 * @param {number} unixTimestamp Unix timestamp as number.
 * @return {Date} Converted datetime.
 */
export function unixToDate(unixTimestamp: number) {
  return new Date(unixTimestamp * 1000);
}