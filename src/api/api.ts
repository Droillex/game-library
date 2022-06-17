import {
  IBannerData,
  IBannerResponse,
  IGameDataResponse,
  IGenreResponse,
  IImageResponse,
  IKeywordData,
  IMultiqueryResponse,
  IPlatformData,
  IThumbResponse,
} from "./interfaces";
import { IPlatform, IThumb } from "../components/thumb/thumb";
import {getLogoImage, processError, unixToDate} from "../components/helpers";
import { IPopupData } from "../components/gamePopup/gamePopup";

export default class Api {
  private static urlBase =
    "";
  private static clientId = "";
  private static bearerToken = "";

  /**
   * Sets credentials for future api calls.
   *
   * @param {Filter} filter Filter instance.
   * @param {string} clientID Twitch dev account client ID.
   * @param {string} bearerToken Twitch dev account bearer token.
   * @return {void}
   */
  static setCredentials(clientID: string, bearerToken: string) {
    Api.clientId = clientID;
    Api.bearerToken = bearerToken;
  }

  /**
   * Makes multiple api calls to construct thumb data based on filter string.
   *
   * @param {Filter} filter Filter (query) string for api call.
   * @param {AbortSignal} signal Abort signal to cancel request on certain conditions.
   * @return {Promise<IThumb[]>} Data array for Thumb instances
   */
  static async getThumbData(
    filter: string,
    signal?: AbortSignal
  ): Promise<IThumb[]> {
    const gameData: IThumbResponse[] = await Api.post(
      "/games",
      `fields name,cover,genres,platforms;${filter}`,
      signal
    );

    if (gameData.length === 0) return [];

    const genreIdsSet = new Set();
    const platformIdsSet = new Set();
    const coverIds: number[] = [];
    gameData.forEach((game) => {
      game.genres.forEach((genre) => genreIdsSet.add(genre));
      game.platforms.forEach((platform) => platformIdsSet.add(platform));
      coverIds.push(game.cover);
    });
    const [genreIds, platformIds] = [
      Array.from(genreIdsSet),
      Array.from(platformIdsSet),
    ];

    const promises = [
      Api.post(
        "/covers",
        `fields url; where id = (${coverIds.join(", ")});limit ${
          coverIds.length
        };`,
        signal
      ),
      Api.post(
        "/genres",
        `fields name;where id = (${genreIds.join(", ")});limit ${
          genreIds.length
        };`,
        signal
      ),
      Api.post(
        "/platforms",
        `fields name, platform_logo;where id = (${platformIds.join(
          ", "
        )}) & platform_logo != null;sort platform_logo desc;limit ${
          platformIds.length
        };`,
        signal
      ),
    ];

    //@ts-ignore
    const [coversData, genresData, platformsNameData]: [
      IImageResponse[],
      IGenreResponse[],
      IPlatformData[]
    ] = await Promise.all(promises);

    const platformLogoIds = platformsNameData.map(
      (platform) => platform.platform_logo
    );
    const platformLogosData: IImageResponse[] = await Api.post(
      "/platform_logos",
      `fields url;where id = (${platformLogoIds.join(
        ", "
      )});sort id desc;limit ${platformIds.length};`
    );

    const platformsData = platformsNameData.map((pl, idx) => ({
      id: pl.id,
      name: pl.name,
      url: platformLogosData[idx].url,
    }));

    return gameData.map((game) => ({
      id: game.id,
      title: game.name,
      cover: (
        coversData.find((cov) => cov.id === game.cover) as IImageResponse
      ).url.replace("t_thumb", "t_cover_big"),
      genres: (
        genresData.filter((genre) =>
          game.genres.includes(genre.id)
        ) as IGenreResponse[]
      ).map((genre) => genre.name),
      platforms: (
        platformsData.filter((platform) =>
          game.platforms.includes(platform.id)
        ) as IPlatformData[]
      ).map((pl) => ({
        name: pl.name,
        url: getLogoImage(pl.url as string),
      })),
    }));
  }

  /**
   * Makes multiple api calls to construct banner data based on game id.
   *
   * @param {number[]} gameId Array of game id's.
   * @param {AbortSignal} signal Abort signal to cancel request on certain conditions.
   * @return {Promise<IBannerData[]>} Data array for Banner instances
   */
  static async getBannerById(gameId: number[], signal?: AbortSignal) {
    const gameData: IBannerResponse[] = await Api.post(
      "/games",
      `fields name,rating,genres;where id = (${gameId.join(", ")});`,
      signal
    );

    const screenshotQueries = gameData.map(
      (game) =>
        `query screenshots "${game.name}" {fields url;where game = ${game.id};};`
    );
    const screenshots: IMultiqueryResponse<IImageResponse[]>[] = await Api.post(
      "/multiquery",
      screenshotQueries.join("\n"),
      signal
    );

    const genreQueries = gameData.map(
      (game) =>
        `query genres "${
          game.name
        }" {fields name;where id = (${game.genres.join(", ")});};`
    );
    const genres: IMultiqueryResponse<IGenreResponse[]>[] = await Api.post(
      "/multiquery",
      genreQueries.join("\n"),
      signal
    );

    const bannerData: IBannerData[] = gameData.map((game) => ({
      id: game.id,
      title: game.name,
      rating: game.rating,
      genres: [],
      screenshots: [],
    }));
    gameData.forEach((_, idx) => {
      bannerData[idx].genres = genres[idx].result.map((genre) => genre.name);
      bannerData[idx].screenshots = screenshots[idx].result.map((screenshot) =>
        screenshot.url.replace("t_thumb", "t_screenshot_big")
      );
    });
    return bannerData;
  }

  /**
   * Makes multiple api calls to construct popup data based on game id.
   *
   * @param {number} gameId Game id number.
   * @param {AbortSignal} signal Abort signal to cancel request on certain conditions.
   * @return {Promise<IPopupData>} Data object for GamePopup instance
   */
  static async getPopupById(
    gameId: number,
    signal?: AbortSignal
  ): Promise<IPopupData> {
    const gameData: IGameDataResponse = (
      await Api.post(
        "/games",
        `fields name,screenshots,first_release_date,total_rating,total_rating_count,keywords,platforms;where id = ${gameId};`,
        signal
      )
    )[0];

    const promises = [
      Api.post("/screenshots", `fields url;where game = ${gameId};`, signal),
      Api.post(
        "/platforms",
        `fields name, platform_logo;where id = (${gameData.platforms.join(
          ", "
        )}) & platform_logo != null;sort platform_logo desc;`,
        signal
      ),
    ];

    if (gameData.keywords) {
      promises.push(
        Api.post(
          "/keywords",
          `fields name;where id = (${gameData.keywords.join(", ")});`,
          signal
        )
      );
    }

    // @ts-ignore
    const [screenshotData, platformData, keywordsData]: [
      IImageResponse[],
      IPlatformData[],
      IKeywordData[]
    ] = await Promise.all(promises);

    const screenshots = screenshotData.map((screenData) =>
      screenData.url.replace("t_thumb", "t_screenshot_med")
    );

    const platformDataLogo: IImageResponse[] = await Api.post(
      "/platform_logos",
      `fields url;where id = (${platformData
        .map((plat) => plat.platform_logo)
        .join(", ")});sort id desc;`,
      signal
    );
    const platforms: IPlatform[] = platformData.map((platform, idx) => ({
      name: platform.name,
      url: platformDataLogo[idx].url,
    }));

    return {
      title: gameData.name,
      date: unixToDate(gameData.first_release_date),
      totalRating: gameData.total_rating,
      ratingCount: gameData.total_rating_count,
      screenshots,
      keywords: keywordsData && keywordsData.map((keyword) => keyword.name),
      platforms,
    };
  }

  /**
   * Pre-configured method to make POST request to API.
   *
   * @param {string} path Path to endpoint.
   * @param {string | object} payload Payload to add to POST request.
   * @param {AbortSignal} signal Abort signal to cancel promise.
   * @return {Promise<object>} JSON of incoming response.
   */
  static async post(
    path: string,
    payload?: string | object,
    signal?: AbortSignal
  ) {
    const postResult = await fetch(`${Api.urlBase}${path}`, {
      method: "POST",
      signal,
      headers: {
        "Client-ID": Api.clientId,
        Authorization: `Bearer ${Api.bearerToken}`,
        "Content-Type":
          typeof payload === "string" ? "text/plain" : "application/json",
      },
      body: typeof payload === "object" ? JSON.stringify(payload) : payload,
    });
    if(postResult.ok) {
      return await postResult.json();
    } else {
      const error = new Error(`${postResult.status}: ${postResult.statusText}`);
      error.name = postResult.statusText.replaceAll(" ", "");
      processError(error);
    }
  }
}
