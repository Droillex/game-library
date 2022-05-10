import { GAME_POPUP_HEIGHT, GAME_POPUP_WIDTH, MONTHS } from "../consts";
import Api from "../../api/api";
import {getRating, loadImage, processError} from "../helpers";
import {IPlatform} from "../thumb/thumb";

type HorizontalPosition = "left" | "right";
type VerticalPosition = "top" | "bottom";

const NO_IMAGE_SRC = `${process.env.PUBLIC_URL}/icons/noScreenshot.svg`;

export interface IPopupData {
  title: string;
  date: Date;
  totalRating?: number;
  ratingCount?: number;
  screenshots: string[];
  keywords?: string[];
  platforms: IPlatform[];
}

export class GamePopup {
  width: number = GAME_POPUP_WIDTH;
  height: number = GAME_POPUP_HEIGHT;
  node: Element;
  x: string;
  y: string;
  private abortController: AbortController;
  private fadeInterval: ReturnType<typeof setInterval> | undefined;
  private fadeAnimation: Animation | undefined;

  /**
   * Creates new GamePopup instance from opener element, game id and optional preloaded popup data.
   *
   * @param {Element} opener Opener node element.
   * @param {number} id Game id number.
   * @param {IPopupData} data Preloaded popup data (if available).
   * @return {PageController} Instance of class GamePopup.
   */
  constructor(opener: Element, id: number, data?: IPopupData) {
    this.abortController = new AbortController();
    const { left, top } = opener.getBoundingClientRect();
    const [x, y] = [
      left + opener.clientWidth + this.width > window.outerWidth
        ? ("right" as HorizontalPosition)
        : ("left" as HorizontalPosition),
      top + this.height > window.outerHeight
        ? ("bottom" as VerticalPosition)
        : ("top" as VerticalPosition),
    ];
    this.node = this.initNode(x, y);
    [this.x, this.y] = ["100%", "20px"];

    if (data) {
      this.setData(data);
    } else {
      Api.getPopupById(id, this.abortController.signal)
        .then((data) => {
          this.setData.call(this, data);
          const dataLoadedEvent = new CustomEvent("dataLoaded", {
            detail: data,
          });
          this.node.parentNode?.dispatchEvent(dataLoadedEvent);
        })
        .catch((e) => {
          processError(e);
          this.setError(e);
        });
    }
  }

  /**
   * Prevents various memory leaks.
   *
   * @return {void}
   */
  cleanup() {
    this.abortController.abort();
    if (this.fadeInterval) {
      clearInterval(this.fadeInterval);
    }
    if (this.fadeAnimation) {
      this.fadeAnimation.cancel();
    }
  }

  /**
   * Initializes popup with loading state.
   *
   * @param {HorizontalPosition} xPos Target horizontal position.
   * @param {VerticalPosition} yPos Target vertical position.
   * @return {Element} GamePopup node element.
   */
  private initNode(xPos: HorizontalPosition, yPos: VerticalPosition) {
    const horizontal = xPos === "right" ? `-${this.width}px` : "100%";
    const style = `left:${horizontal}; ${yPos}:20px; transform-origin: ${xPos} ${yPos}`;
    const template = document.createElement("template");
    template.insertAdjacentHTML(
      "afterbegin",
      `<div class="game-popup game-popup__${xPos} game-popup__${yPos}" style="${style}">
                <div class="game-popup__loading-container">
                    <img src="${process.env.PUBLIC_URL}/icons/infinityLoader.svg" alt="Loader"/>
                </div>
            </div>`
    );
    return template.children[0];
  }

  /**
   * Displays error message inside popup.
   *
   * @param {Error} error Error instance.
   * @return {void}
   */
  private setError(error: Error) {
    this.node.innerHTML = "";
    this.node.insertAdjacentHTML(
      "afterbegin",
      `<div class="game-popup__loading-container">
                <img class="game-popup__error-img" src="${process.env.PUBLIC_URL}/icons/sadSmile.svg" alt="Error"/>
                <div class="game-popup__error-message">${error.message}</div>
            </div>`
    );
  }

  /**
   * Displays loaded data inside popup.
   *
   * @param {IPopupData} data Popup game data.
   * @return {void}
   */
  private setData(data: IPopupData) {
    this.node.innerHTML = "";
    let ratingMarkup;
    if(data.totalRating) {
      const ratingData = getRating(data.totalRating);
      ratingMarkup = `<span class="${ratingData.cssClass}" title="${Math.round(data.totalRating)}%">
                        ${ratingData.title}
                      </span> (based on ${data.ratingCount} reviews)`;
    } else {
      ratingMarkup = "Not enough votes";
    }
    const releaseDate = `${data.date.getDay()} ${
      MONTHS[data.date.getMonth() - 1]
    } ${data.date.getFullYear()}`;
    this.node.insertAdjacentHTML(
      "afterbegin",
      `<div class="game-popup__title">${data.title}</div>
            <div class="game-popup__date">${releaseDate}</div>
            <div class="game-popup__image"></div>    
            <div class="game-popup__rating">
                <div>Overall Rating:</div>
                ${ratingMarkup}
            </div>        
            ${
              data.keywords
                ? `<div class="game-popup__tags-label">Tags</div>
              <div class="game-popup__tag-container">
                ${data.keywords.reduce(
                  (prev, next) =>
                    prev + `<div class="game-popup__tag">${next}</div>`,
                  ""
                )}
              </div>`
                : ""
            }`
    );

    const imgNode = document.createElement("img");
    imgNode.classList.add("game-popup__image__img");
    imgNode.src = `${process.env.PUBLIC_URL}/icons/infinityLoader.svg`;
    imgNode.alt = `${data.title} Screenshot`;

    if (data.screenshots.length > 1) {
      Promise.all(
        data.screenshots.map((screenshot) => loadImage(screenshot))
      ).then(() => {
        const fadeImage = () => {
          const anim = imgNode.animate([{ opacity: 1 }, { opacity: 0 }], {
            duration: 500,
          });
          this.fadeAnimation = anim;
          anim.onfinish = (animEvent) => {
            imgNode.src = data.screenshots[screenshotIdx];
            this.fadeAnimation = imgNode.animate(
              [{ opacity: 0 }, { opacity: 1 }],
              {
                duration: 500,
              }
            );
            screenshotIdx = (screenshotIdx + 1) % data.screenshots.length;
          };
        };
        imgNode.src = data.screenshots[0];
        let screenshotIdx = 1;
        this.fadeInterval = setInterval(fadeImage, 3000);
      });
    } else {
      if (data.screenshots.length === 1) {
        imgNode.src = data.screenshots[0];
      } else {
        imgNode.src = NO_IMAGE_SRC;
      }
    }
    this.node.querySelector(".game-popup__image")?.appendChild(imgNode);
  }
}
