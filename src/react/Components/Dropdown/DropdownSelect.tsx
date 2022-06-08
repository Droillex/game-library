import React from "react";
import DropdownBase from "./DropdownBase";
import { IDropdown, ISelectOption } from "./Interfaces";

/**
 * Dropdown with multiple active items.
 *
 * @param {IDropdownBase} props DropdownSelect config.
 * @return {JSX.Element} JSX element of DropdownSelect.
 */
export default function DropdownSelect({
  title,
  options,
  selectedOptions,
  onCheckboxChanged,
}: IDropdown<ISelectOption<number>>) {
  function onCheckboxChange(e: React.ChangeEvent) {
    const target = e.target as HTMLInputElement;
    onCheckboxChanged(target.value, target.checked);
  }

  return (
    <DropdownBase title={title}>
      {options.map(({ id, text }) => (
        <label className="dropdown__option" key={id}>
          {text}
          <input
            type="checkbox"
            name={id.toString()}
            value={id}
            onChange={onCheckboxChange}
            checked={selectedOptions.includes(id.toString())}
          />
        </label>
      ))}
    </DropdownBase>
  );
}
