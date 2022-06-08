export interface IThumb {
    id: number;
    title: string;
    cover: string;
    genres: string[];
    platforms: IPlatform[];
}

export interface IPlatform {
    name: string;
    url: string;
}