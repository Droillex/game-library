export interface IDropdownItem<T> {
    id: T;
    text: string;
}

export interface ITitle {
    id: string;
    text: string;
}

export interface IFiltersData {
    conditions: string[];
    sort: string;
}