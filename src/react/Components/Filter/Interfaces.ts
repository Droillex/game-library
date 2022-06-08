import {IDropdownProps, ISelectOption} from "../Dropdown/Interfaces";

export interface IFilterValue {
  id: string;
  title: string;
  selectedIds: string[];
}

export interface IFilter {
  conditionsConfig: IDropdownProps<ISelectOption<number>>[];
  sortConfig: IDropdownProps<ISelectOption<string>>;
  sortField: string[];
  setSortField: (id: string[]) => void;
  selectedValues: IFilterValue[];
  setSelectedValues: (newValues: IFilterValue[]) => void;
}