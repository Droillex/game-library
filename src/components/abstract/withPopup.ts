import {GamePopup, IPopupData} from "../gamePopup/gamePopup";
import { getTimingConfig } from "../helpers";

export abstract class WithPopup {
  protected readonly id: number;
  node: Element;
  popup: GamePopup | undefined;
  popupTimeout: ReturnType<typeof setTimeout> | undefined;
  private animation: Animation | undefined;
  private popupData: IPopupData | undefined;

  /**
   * Initializes element with popup on hover.
   *
   * @param {number} id Element id.
   * @param {Element} node Element node.
   * @return {WithPopup} Instance of WithPopup.
   */
  protected constructor(id: number, node: Element) {
    this.id = id;
    this.node = node;
    this.node.addEventListener("dataLoaded", this.setLoadedData.bind(this));
    this.node.addEventListener("mouseover", this.onMouseEnter.bind(this));
    this.node.addEventListener("mouseleave", this.onMouseLeave.bind(this));
  }

  /**
   * Remembers loaded data to prevent needless api calls.
   *
   * @param {Event} e Element id.
   * @return {WithPopup} Instance of WithPopup.
   */
  private setLoadedData(e: Event) {
    this.popupData = (e as CustomEvent).detail;
  }

  /**
   * Launches popup open procedure.
   *
   * @return {void}
   */
  private showPopup() {
    const clearAnimation = () => (this.animation = undefined);
    if (!this.popup) {
      this.popup = new GamePopup(this.node, this.id, this.popupData);
      this.node.appendChild(this.popup.node);
      this.animation = this.popup.node.animate(
        [{ transform: "scale(0)" }, { transform: "scale(1)" }],
        getTimingConfig(200)
      );
      this.animation.onfinish = clearAnimation.bind(this);
      this.animation.id = "open";
    }
  }

  /**
   * Launches hide popup procedure.
   *
   * @return {void}
   */
  private hidePopup() {
    const clearPopup = () => {
      if (this.popup) {
        this.node.removeChild(this.popup.node);
        this.popup = undefined;
        this.animation = undefined;
      }
    };
    const hideFunc = () => {
      if (this.popup) {
        this.popup.cleanup();
        this.animation = this.popup.node.animate(
          [{ transform: "scale(1)" }, { transform: "scale(0)" }],
          getTimingConfig(200)
        );
        this.animation.id = "close";
        this.animation.onfinish = clearPopup.bind(this);
      }
    };
    if (this.animation?.id === "open") {
      this.animation.onfinish = hideFunc.bind(this);
    } else if (!this.animation) {
      hideFunc();
    }
  }

  /**
   * Mouse enter event handler.
   *
   * @return {void}
   */
  private onMouseEnter() {
    if (!this.popupTimeout && !this.animation) {
      this.popupTimeout = setTimeout(this.showPopup.bind(this), 500);
    }
  }

  /**
   * Mouse leave event handler.
   *
   * @return {void}
   */
  private onMouseLeave() {
    if (this.popupTimeout) {
      clearTimeout(this.popupTimeout);
      this.popupTimeout = undefined;
    }
    this.hidePopup();
  }
}
