export interface INode {
    getNode(): Element;
}

export interface INamedSection<T> extends INode{
    title: string;
    items: T[];
}