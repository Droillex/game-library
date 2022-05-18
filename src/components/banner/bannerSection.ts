import { Banner } from "./banner";
import {INamedSection} from "../base/interfaces";

export class BannerSection implements INamedSection<Banner> {
  private readonly _node: Element;
  title: string;
  items: Banner[];

  /**
   * Creates new BannerSection instance from title string and Banner instance items array.
   *
   * @param {string} title Section label title.
   * @param {Banner[]} items Banner instances array.
   * @return {BannerSection} Instance of class BannerSection.
   */
  constructor(title: string, items: Banner[]) {
    this.title = title;
    this.items = items;
    this._node = BannerSection.makeNode(this);
  }

  /**
   * Gets node element of current instance.
   *
   * @return {Element} Current dropdown node.
   */
  getNode(): Element {
    return this._node;
  }

  /**
   * Creates node element based on BannerSection instance.
   *
   * @param {BannerSection} bannerSection Instance of BannerSection.
   * @return {HTMLElement} Banner section node.
   */
  static makeNode(bannerSection: BannerSection) {
    const bannerSectionNode: HTMLTemplateElement =
      document.createElement("template");
    bannerSectionNode.insertAdjacentHTML(
      "afterbegin",
      `
        <section class="banner-section page__banner-section">
            <div class="banner-section__title-container">
                <h3 class="banner-section__title">${bannerSection.title}</h3>
            </div>
            <div class="banner-section__row"></div>
        </section>
        `
    );
    const $bannerContainer = bannerSectionNode.querySelector(
      ".banner-section__row"
    ) as HTMLElement;
    bannerSection.items.forEach((banner) =>
      $bannerContainer.appendChild(banner.getNode())
    );
    return bannerSectionNode.children[0] as HTMLElement;
  }
}
