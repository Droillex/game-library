import { INode } from "../base/interfaces";
import { ITitle } from "./interfaces";

export class Tag implements INode {
  private readonly _node: Element;
  title: ITitle;
  private value: string;

  /**
   * Creates new Tag instance from title object and value.
   *
   * @param {ITitle} title Tag title object.
   * @param {string} value Tag values string.
   * @return {Tag} Instance of Tag.
   */
  constructor(title: ITitle, value: string) {
    this.title = title;
    this.value = value;
    this._node = Tag.makeNode(this);
    this.setVisibility(!!value.length);
  }

  /**
   * Gets node element of current instance.
   *
   * @return {Element} Current tag node.
   */
  getNode(): Element {
    return this._node;
  }

  /**
   * Sets tag value.
   *
   * @param {string} value Tag label value.
   * @return {void}
   */
  setValue(value: string) {
    this.value = value;
    this.setVisibility(!!value.length);
    (
      this._node.querySelector(".filter__item-text") as HTMLElement
    ).textContent = `${this.title.text}: ${this.value}`;
  }

  /**
   * Toggles tag visibility.
   *
   * @param {boolean} isVisible Visibility flag.
   * @return {void}
   */
  private setVisibility(isVisible: boolean) {
    this._node.classList.add(
      isVisible ? "filter__item_visible" : "filter__item_hidden"
    );
    this._node.classList.remove(
      isVisible ? "filter__item_hidden" : "filter__item_visible"
    );
  }

  /**
   * Triggers "tagCleared" custom event.
   *
   * @return {void}
   */
  private clearTag() {
    const event = new CustomEvent("tagCleared", { detail: this.title.id });
    this._node.parentNode?.dispatchEvent(event);
  }

  /**
   * Creates node element based on Tag instance.
   *
   * @param {Tag} tag Instance of Tag.
   * @return {Element} Tag node.
   */
  private static makeNode(tag: Tag) {
    const template = document.createElement("template");
    template.insertAdjacentHTML(
      "afterbegin",
      `<div class="filter__item">
                <div class="filter__item-text">${tag.title.text}: ${tag.value}</div>
            </div>`
    );
    const clearBtn = document.createElement("button");
    clearBtn.classList.add("filter__item-reset", "button", "button_cross");
    clearBtn.addEventListener("click", tag.clearTag.bind(tag));
    (template.querySelector(".filter__item") as HTMLElement).appendChild(
      clearBtn
    );
    return template.children[0];
  }
}
