import {ReactElement} from "react";

export interface IDropdownBase {
    title: string;
    children: ReactElement[];
}

export interface IDropdownProps<T> {
    id: string;
    title: string;
    options: T[];
}

export interface IDropdown<T> {
    title: string;
    options: T[];
    selectedOptions: string[];
    onCheckboxChanged: (id: string, state: boolean) => void;
}

export interface ISelectOption<T> {
    id: T;
    text: string;
}