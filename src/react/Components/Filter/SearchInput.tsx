import { ReactComponent as Search } from "../../../icons/search.svg";
import React from "react";

interface ISearchInput {
  value: string;
  onChange: (value: string) => void;
}

/**
 * SearchInput component.
 *
 * @param {ISearchInput} props SearchInput config.
 * @return {JSX.Element} JSX element of SearchInput.
 */
export default function SearchInput({ value, onChange }: ISearchInput) {
  return (
    <div className="header__search">
      <Search className="header__search-icon" />
      <input
        className="header__search-input"
        placeholder="Search the library..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
