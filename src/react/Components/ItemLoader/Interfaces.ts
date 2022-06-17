import {FunctionComponent} from "react";
import {ISection} from "../../Interfaces";

interface IItemLoaderBase<T> {
    items: T[];
    withMore: boolean;
}

export interface IItemLoader<T> {
    Section: FunctionComponent<ISection<T>>;
    props: Omit<ISection<T>, keyof IItemLoaderBase<ISection<T>>>;
    initialItemCount: number;
    extraItemCount?: number;
    itemLoader: (limit: number, offset: number, abortSignal: AbortSignal) => Promise<T[]>;
}

export interface IItemLoaderState<T> {
    items: T[] | null;
    hasMore: boolean;
}