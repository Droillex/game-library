import { getTimingConfig } from "../helpers";
import {ITitle} from "../filter/interfaces";

export abstract class DropdownBase {
  protected readonly node: Element;
  protected readonly dropdownNode: Element;
  private dropdownVisible: boolean;
  title: ITitle;
  private animation: Animation | undefined;

  /**
   * Initializes DropdownBase instance with set title and dropdown node.
   *
   * @param {ITitle} title Dropdown title.
   * @param {Element} dropdownNode Dropdown node element.
   * @return {DropdownBase} Instance of DropdownBase.
   */
  protected constructor(title: ITitle, dropdownNode: Element) {
    this.title = title;
    this.dropdownVisible = false;
    this.node = DropdownBase.makeNode(this);
    this.dropdownNode = dropdownNode;
    this.node.addEventListener("click", this.handleOpen.bind(this));
    this.node.addEventListener("mouseleave", this.closeDropdown.bind(this));
  }

  /**
   * Gets node element of current instance.
   *
   * @return {Element} Current dropdown node.
   */
  getNode(): Element {
    return this.node;
  }

  /**
   * Handles dropdown open event.
   *
   * @param {Event} e Trigger event.
   * @return {void}
   */
  private handleOpen(e: Event) {
    if (!(e.target as HTMLElement).closest(".dropdown__dropdown-container")) {
      this.dropdownVisible ? this.closeDropdown() : this.openDropdown();
    }
  }

  /**
   * Launches dropdown open procedure.
   *
   * @return {void}
   */
  private openDropdown() {
    const clearAnimation = () => (this.animation = undefined);
    if (!this.dropdownVisible) {
      this.node.appendChild(this.dropdownNode);
      this.dropdownVisible = true;
      const arrow = this.node.querySelector(".arrow") as HTMLElement;
      arrow.classList.remove("down");
      arrow.classList.add("up");
      this.animation = this.dropdownNode.animate(
        [{ transform: "scaleY(0)" }, { transform: "scaleY(1)" }],
        getTimingConfig(200)
      );
      this.animation.id = "open";
      this.animation.onfinish = clearAnimation.bind(this);
    }
  }

  /**
   * Launches dropdown close procedure.
   *
   * @return {void}
   */
  private closeDropdown() {
    const removeDropdown = () => {
      if (this.dropdownVisible) {
        this.node.removeChild(this.dropdownNode);
        this.dropdownVisible = false;
        this.animation = undefined;
      }
    };
    const animateClose = () => {
      const arrow = this.node.querySelector(".arrow") as HTMLElement;
      arrow.classList.remove("up");
      arrow.classList.add("down");
      this.animation = this.dropdownNode.animate(
        [{ transform: "scaleY(1)" }, { transform: "scaleY(0)" }],
        getTimingConfig(200)
      );
      this.animation.id = "close";
      this.animation.onfinish = removeDropdown.bind(this);
    };
    if (this.animation?.id === "open") {
      this.animation.onfinish = animateClose.bind(this);
    } else if (!this.animation) {
      animateClose();
    }
  }

  /**
   * Creates node element based on DropdownBase instance.
   *
   * @param {DropdownBase} dropdown Instance of DropdownBase.
   * @return {Element} Dropdown node.
   */
  private static makeNode(dropdown: DropdownBase) {
    const template = document.createElement("template");
    template.insertAdjacentHTML(
      "afterbegin",
      `<button class="filter__dropdown dropdown button button_align-left">
                <div>${dropdown.title.text}</div>
                <div class="arrow down"></div>
            </button>`
    );
    return template.children[0];
  }
}
