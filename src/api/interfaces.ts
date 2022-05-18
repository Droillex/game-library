export interface IMultiqueryResponse<T> {
    name: string;
    result: T;
}

export interface IThumbResponse {
    id: number;
    cover: number;
    genres: number[];
    name: string;
    platforms: number[];
}

export interface IImageResponse {
    id: number;
    url: string;
}

export interface IGenreResponse {
    id: number;
    name: string;
}

export interface IGenreResponse {
    id: number;
    name: string;
    platform_logo: number;
}

export interface IPlatformData {
    id: number;
    name: string;
    platform_logo: number;
    url?: string;
}

export interface IGameDataResponse {
    id: number;
    first_release_date: number;
    name: string;
    platforms: number[];
    total_rating: number;
    total_rating_count: number;
    screenshots: number[];
    keywords?: number[];
}

export interface IBannerResponse {
    id: number;
    name: string;
    rating: number;
    screenshots: string[];
    genres: number[];
}

export interface IBannerData {
    id: number;
    title: string;
    rating: number;
    screenshots: string[];
    genres: string[];
}

export interface IKeywordData {
    id: number;
    name: string;
}