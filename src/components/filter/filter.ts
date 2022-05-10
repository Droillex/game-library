import {INode} from "../base/interfaces";
import {Tag} from "./tag";
import {DropdownSelect} from "./dropdownSelect";
import {DropdownRadio} from "./dropdownRadio";
import {getTimingConfig} from "../helpers";
import {IFiltersData} from "./interfaces";

interface IFilters {
    [key: string]: DropdownSelect;
}

interface ITags {
    [key: string]: Tag;
}

export class Filter implements INode {
  private readonly node: Element;
  private filters: IFilters;
  private sortDropdown: DropdownRadio;
  private tags: ITags;
  private resetBtnNode: Element;

  /**
   * Creates new Filter instance from DropdownSelect array and DropdownRadio instance.
   *
   * @param {DropdownSelect[]} dropdowns DropdownSelect instances array.
   * @param {DropdownRadio} dropdownRadio DropdownRadio instance.
   * @return {Filter} Instance of Filter.
   */
  constructor(dropdowns: DropdownSelect[], dropdownRadio: DropdownRadio) {
    this.node = Filter.makeNode(this);
    this.sortDropdown = dropdownRadio;
    this.filters = Object.fromEntries(
      dropdowns.map((dropdown) => [dropdown.title.id, dropdown])
    );
    this.tags = Object.fromEntries(
      dropdowns.map((dropdown) => [
        dropdown.title.id,
        new Tag(dropdown.title, ""),
      ])
    );
    this.resetBtnNode = this.node.querySelector(
      ".filter__reset"
    ) as HTMLElement;
    dropdowns.forEach((dropdown) =>
      this.resetBtnNode.before(dropdown.getNode())
    );
    this.resetBtnNode.before(this.sortDropdown.getNode());
    Object.values(this.tags).forEach((tag) =>
      this.node.appendChild(tag.getNode())
    );
    this.node.addEventListener(
      "valuesChanged",
      this.onValuesChanged.bind(this)
    );
    this.node.addEventListener("tagCleared", this.clearTag.bind(this));
  }

  /**
   * Gets current instance node element.
   *
   * @return {Element} Filter node element.
   */
  getNode(): Element {
    return this.node;
  }

  /**
   * Aggregates filtering conditions from all inner elements.
   *
   * @return {IFiltersData} Aggregated filter conditions.
   */
  getFilters(): IFiltersData {
    const filterData: string[] = [];
    Object.keys(this.filters).forEach((key) => {
      const selectedValuesId = this.filters[key].getSelectedValuesId();
      if (selectedValuesId.length) {
        filterData.push(`${key} = [${selectedValuesId.join(", ")}]`);
      }
    });
    const sortField = this.sortDropdown.getSelectedValuesId();
    return { conditions: filterData, sort: sortField };
  }

  /**
   * Triggers "filterChanged" event.
   *
   * @return {void}
   */
  private notifyChange() {
    const filterData = this.getFilters();
    const event = new CustomEvent("filterChanged", { detail: filterData });
    this.node.parentNode?.dispatchEvent(event);
  }

  /**
   * Clears filter tag by id.
   *
   * @param {Event} e Custom clear tag event.
   * @return {void}
   */
  private clearTag(e: Event) {
    const title = (e as CustomEvent).detail;
    this.filters[title].clearSelectedValues();
    this.tags[title].setValue("");
    this.notifyChange();
  }

  /**
   * Clears all inner filters and search field.
   *
   * @return {void}
   */
  private clearFilters() {
    this.resetBtnNode.animate(
      [{ transform: "scale(0.9)" }, { transform: "scale(1)" }],
      getTimingConfig(300)
    );
    Object.values(this.filters).forEach((dropdown) =>
      dropdown.clearSelectedValues()
    );
    this.sortDropdown.clearSelectedValues();
    (document.querySelector(".header__search-input") as HTMLInputElement).value = "";
    Object.values(this.tags).forEach((tag) => tag.setValue(""));
    this.notifyChange();
  }

  /**
   * Single filter values changed event.
   *
   * @param {Event} e Custom dropdown value changed event.
   * @return {void}
   */
  private onValuesChanged(e: Event) {
    const filterKey = (e as CustomEvent).detail;
    if (Object.keys(this.filters).includes(filterKey)) {
      const values = this.filters[filterKey].getSelectedValues();
      this.tags[filterKey].setValue(values.join(", "));
    }
    this.notifyChange();
  }

  /**
   * Creates node element based on Filter instance.
   *
   * @param {Filter} filter Instance of Filter.
   * @return {Element} Filter node.
   */
  static makeNode(filter: Filter): Element {
    const template = document.createElement("template");
    template.insertAdjacentHTML(
      "afterbegin",
      `<div class="page__filter filter"></div>`
    );
    const resetBtn = document.createElement("button");
    resetBtn.classList.add("filter__reset", "button", "button_cross");
    resetBtn.addEventListener("click", filter.clearFilters.bind(filter));
    template.children[0].appendChild(resetBtn);
    return template.children[0];
  }
}
