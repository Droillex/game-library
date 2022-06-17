import React from "react";
import DropdownBase from "./DropdownBase";
import { IDropdown, ISelectOption } from "./Interfaces";

/**
 * Dropdown with single active item.
 *
 * @param {IDropdownBase} props DropdownRadio config.
 * @return {JSX.Element} JSX element of DropdownRadio.
 */
export default function DropdownRadio({
  title,
  options,
  selectedOptions,
  onCheckboxChanged,
}: IDropdown<ISelectOption<string>>) {
  /**
   * Custom checkbox change handler.
   *
   * @param {React.ChangeEvent} e Checkbox input change event.
   * @return {void}
   */
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
            type="radio"
            name={title}
            value={id}
            onChange={onCheckboxChange}
            checked={selectedOptions.includes(id.toString())}
          />
        </label>
      ))}
    </DropdownBase>
  );
}
