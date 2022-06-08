export interface IBanner {
    id: number;
    title: string;
    img: string;
    rating: number;
    tags: string[];
}

export interface IViewTemplate {
    items: IBanner[];
}