import {Thumb} from "./thumb";
import {INamedSection} from "../base/interfaces";

export class ThumbSection implements INamedSection<Thumb> {
  _node: Element;
  title: string;
  items: Thumb[];

  /**
   * Creates new ThumbSection instance from title string and thumb items array.
   *
   * @param {string} title Section title label value.
   * @param {Thumb[]} items Thumb items array.
   * @return {ThumbSection} Instance of class ThumbSection.
   */
  constructor(title: string, items: Thumb[]) {
    this.title = title;
    this.items = items;
    this._node = items.length
      ? ThumbSection.makeNode(this)
      : ThumbSection.makeEmptyNode();
  }

  /**
   * Gets node element of current instance.
   *
   * @return {Element} Thumb section node.
   */
  getNode() {
    return this._node;
  }

  /**
   * Adds thumbs inside section container.
   *
   * @param {Thumb[]} thumbs Array of Thumb instances.
   * @return {void}
   */
  addThumbs(thumbs: Thumb[]) {
    this._node
      .querySelector(".thumb-section__row")
      ?.append(...thumbs.map((thumb) => thumb.getNode()));
  }

  /**
   * Creates empty section node element.
   *
   * @return {Element} Empty section node element.
   */
  static makeEmptyNode() {
    const template = document.createElement("template");
    template.insertAdjacentHTML(
      "afterbegin",
      `
    <section class="thumb-section thumb-section_empty">
        <img class="thumb-section__empty-img" alt="Sad Smile" src="${process.env.PUBLIC_URL}/icons/sadSmile.svg"/>
        <div class="thumb-section__empty-label">No results for specified parameters</div>
    </section>
    `
    );
    return template.children[0];
  }

  /**
   * Creates non-empty thumb section node element.
   *
   * @param {ThumbSection} thumbSection ThumbSection instance.
   * @return {Element} Non-empty thumb section node element.
   */
  static makeNode(thumbSection: ThumbSection) {
    const template = document.createElement("template");
    template.insertAdjacentHTML(
      "afterbegin",
      `<section class="thumb-section page__thumb-section">
                <div class="banner-section__title-container">
                    <h3 class="banner-section__title">${thumbSection.title}</h3>
                </div>
                <div class="thumb-section__row">
                 
               </div>
            </section>`
    );
    const $thumbContainer = template.querySelector(
      ".thumb-section__row"
    ) as HTMLElement;
    thumbSection.items.forEach((thumb) =>
      $thumbContainer.appendChild(thumb.node)
    );
    return template.children[0];
  }
}
