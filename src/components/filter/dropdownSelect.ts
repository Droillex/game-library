import {DropdownBase} from "../abstract/dropdownBase";
import {IDropdownItem, ITitle} from "./interfaces";

export class DropdownSelect extends DropdownBase {
  /**
   * Creates new DropdownRadio instance from title string and dropdown items array.
   *
   * @param {ITitle} title Dropdown title object.
   * @param {IDropdownItem<number>} items Dropdown items array.
   * @return {DropdownSelect} Instance of class DropdownSelect.
   */
  constructor(title: ITitle, items: IDropdownItem<number>[]) {
    super(title, DropdownSelect.makeDropdown(items));
    this.dropdownNode
      .querySelectorAll("input")
      .forEach((input) =>
        input.addEventListener("change", this.valuesChanged.bind(this))
      );
  }

  /**
   * Resets dropdown input values.
   *
   * @return {void}
   */
  clearSelectedValues() {
    this.dropdownNode
      .querySelectorAll("input")
      .forEach((checkbox) => (checkbox.checked = false));
  }

  /**
   * Returns selected input values inside dropdown.
   *
   * @return {string[]} Selected inputs names array.
   */
  getSelectedValues() {
    const checkboxes: HTMLInputElement[] = Array.from(
      this.dropdownNode.querySelectorAll('input[type="checkbox"]:checked')
    );
    return checkboxes.map((checkbox) => checkbox.dataset["name"]);
  }

  /**
   * Returns selected input values inside dropdown.
   *
   * @return {string[]} Selected inputs ids array.
   */
  getSelectedValuesId() {
    const checkboxes: HTMLInputElement[] = Array.from(
        this.dropdownNode.querySelectorAll('input[type="checkbox"]:checked')
    );
    return checkboxes.map((checkbox) => checkbox.defaultValue);
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
   * @param {IDropdownItem<number>[]} items Dropdown items array.
   * @return {Element} Dropdown container element;
   */
  private static makeDropdown(items: IDropdownItem<number>[]): Element {
    const dropdownNode = document.createElement("div");
    dropdownNode.classList.add("dropdown__dropdown-container");
    items.forEach((item) => {
      dropdownNode.insertAdjacentHTML(
        "afterbegin",
        `
        <label class="dropdown__option">
            ${item.text}
            <input type="checkbox" data-name="${item.text}" name="${item.id}-checkbox" value="${item.id}"/>
        </label>`
      );
    });
    return dropdownNode;
  }
}
