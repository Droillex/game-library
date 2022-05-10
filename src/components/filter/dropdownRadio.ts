import {DropdownBase} from "../abstract/dropdownBase";
import {IDropdownItem, ITitle} from "./interfaces";

export class DropdownRadio extends DropdownBase {
  /**
   * Creates new DropdownRadio instance from title string and dropdown items array.
   *
   * @param {string} title Dropdown label title.
   * @param {IDropdownItem<string>} items Dropdown items array.
   * @return {DropdownRadio} Instance of class DropdownRadio.
   */
  constructor(title: ITitle, items: IDropdownItem<string>[]) {
    super(title, DropdownRadio.makeDropdown(title, items));
    this.dropdownNode
      .querySelectorAll("input")
      .forEach((input) =>
        input.addEventListener("change", this.valuesChanged.bind(this))
      );
    (this.dropdownNode.querySelector("input") as HTMLInputElement).checked =
      true;
  }

  /**
   * Sets dropdown value to default.
   *
   * @return {void}
   */
  clearSelectedValues() {
    (this.dropdownNode.querySelector("input") as HTMLInputElement).checked =
      true;
  }

  /**
   * Returns selected input values inside dropdown.
   *
   * @return {string[]} Selected inputs names array.
   */
  getSelectedValues() {
    const checkboxes: HTMLInputElement[] = Array.from(
      this.dropdownNode.querySelectorAll('input[type="radio"]:checked')
    );
    return checkboxes.map((checkbox) => checkbox.dataset["name"]);
  }

  /**
   * Returns selected input values inside dropdown.
   *
   * @return {string[]} Selected inputs ids array.
   */
  getSelectedValuesId() {
    return (
      this.dropdownNode.querySelector(
        'input[type="radio"]:checked'
      ) as HTMLInputElement
    ).defaultValue;
  }

  /**
   * Triggers "valuesChanged" custom event.
   *
   * @param {Event} e Input changed event.
   * @return {void}
   */
  private valuesChanged(e: Event) {
    const event = new CustomEvent("valuesChanged", { detail: this.title.id });
    this.node.parentNode?.dispatchEvent(event);
  }

  /**
   * Creates dropdown node.
   *
   * @param {ITitle} title Dropdown label title.
   * @param {IDropdownItem<string>[]} items Dropdown items array.
   * @return {Element} Dropdown container element;
   */
  private static makeDropdown(
    title: ITitle,
    items: IDropdownItem<string>[]
  ): Element {
    const dropdownNode = document.createElement("div");
    dropdownNode.classList.add("dropdown__dropdown-container");
    items.forEach((item) => {
      dropdownNode.insertAdjacentHTML(
        "afterbegin",
        `
        <label class="dropdown__option">
            ${item.text}
            <input type="radio" data-name="${item.text}" name="${title.text}" value="${item.id}"/>
        </label>`
      );
    });
    return dropdownNode;
  }
}
