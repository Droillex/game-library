import {IPlatform} from "../Thumb/Interfaces";
import { ReactElement } from "react";

export interface IPopupData {
    title: string;
    date: Date;
    totalRating?: number;
    ratingCount?: number;
    screenshots: string[];
    keywords?: string[];
    platforms: IPlatform[];
}

export interface IGameInfo {
    data: IPopupData | undefined | null;
    horizontal: "left" | "right";
    vertical: "top" | "bottom";
    style?: object;
}

export interface IPopupWrapper {
    id: number;
    children: ReactElement;
}

export interface IImageFade {
    images: string[];
    title?: string;
    delay?: number;
}

export interface IPopupPosition {
    horizontal: "left" | "right";
    vertical: "top" | "bottom";
}

export type HorizontalPosition = "left" | "right";
export type VerticalPosition = "top" | "bottom";