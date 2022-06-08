export interface ISection<T> {
    title: string;
    items: T[] | null;
    withMore: boolean;
}

export interface IViewTemplate<T> {
    title: string;
    items: T[];
}

export interface IErrorTemplate {
    title: string;
}

interface ISectionBase {
    title: string;
    queryString?: string;
}

export interface ILayout {
    banners: ISectionBase[];
    thumbs: ISectionBase[];
}