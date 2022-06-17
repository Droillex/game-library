import DropdownSelect from "../Dropdown/DropdownSelect";
import React from "react";
import Tag from "./Tag";
import DropdownRadio from "../Dropdown/DropdownRadio";
import {IFilter} from "./Interfaces";
import {getChangedValues} from "./Helpers";

/**
 * Filter component.
 *
 * @param {IBanner} props Filter config.
 * @return {JSX.Element} JSX element of Filter.
 */
export default function Filter({
  conditionsConfig,
  sortConfig,
  sortField,
  setSortField,
  selectedValues,
  setSelectedValues,
}: IFilter) {
  /**
   * Filter component.
   *
   * @param {number} idx Index of dropdown in filter array.
   * @param {string[]} newItems New active items for dropdown with specified index.
   * @return {void}
   */
  function setDropdownValues(idx: number, newItems: string[]) {
    const newValues = selectedValues.map((filter) => ({
      title: filter.title,
      id: filter.id,
      selectedIds: [...filter.selectedIds],
    }));
    newValues[idx].selectedIds = newItems;
    setSelectedValues(newValues);
  }

  /**
   * Dropdown change handler.
   *
   * @param {number} idx Index of dropdown in filter array.
   * @param {string} itemId Id of item being checked/unchecked.
   * @param {boolean} state Is item being checked (true) or unchecked (false).
   * @return {void}
   */
  function onDropdownChange(idx: number, itemId: string, state: boolean) {
    const newItems = getChangedValues(
      selectedValues[idx].selectedIds,
      itemId,
      state
    );
    setDropdownValues(idx, newItems);
  }

  /**
   * Reset filter values handler.
   *
   * @return {void}
   */
  function resetFilter() {
    setSortField([sortConfig.options[0].id]);
    setSelectedValues(
      selectedValues.map((val) => ({
        id: val.id,
        title: val.title,
        selectedIds: [],
      }))
    );
  }

  return (
    <div className="page__filter filter">
      {conditionsConfig.map((dropdown, idx) => (
        <DropdownSelect
          key={dropdown.title}
          title={dropdown.title}
          options={dropdown.options}
          selectedOptions={selectedValues[idx].selectedIds}
          onCheckboxChanged={(id: string, state: boolean) =>
            onDropdownChange(idx, id, state)
          }
        />
      ))}
      <DropdownRadio
        title={sortConfig.title}
        options={sortConfig.options}
        selectedOptions={sortField}
        onCheckboxChanged={(itemId: string, _: boolean) => {
          setSortField([itemId]);
        }}
      />
      <button
        className="filter__reset button button_cross"
        onClick={resetFilter}
      />
      {conditionsConfig.map((dropdown, idx) =>
        selectedValues[idx].selectedIds.length ? (
          <Tag
            key={dropdown.id}
            title={dropdown.title}
            values={dropdown.options
              .filter((opt) =>
                selectedValues[idx].selectedIds.includes(opt.id.toString())
              )
              .map((item) => item.text)}
            onReset={() => setDropdownValues(idx, [])}
          />
        ) : undefined
      )}
    </div>
  );
}
