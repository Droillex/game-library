import { WithPopup } from "../abstract/withPopup";
import {INode} from "../base/interfaces";

interface IBanner extends INode {
  title: string;
  img: string;
  rating: number;
  tags: string[];
}

export class Banner extends WithPopup implements IBanner{
  private readonly _node: Element;
  title: string;
  img: string;
  rating: number;
  tags: string[];

  constructor(id: number, title: string, img: string, rating: number, tags: string[]) {
    const node = Banner.makeNode(title, img, rating, tags);
    super(id, node);
    this._node = node;
    this.title = title;
    this.img = img;
    this.rating = rating;
    this.tags = tags;
  }

  getNode() {
    return this._node;
  }

  static makeNode(title: string, img: string, rating: number, tags: string[]): Element {
    const bannerTemplate: HTMLTemplateElement =
      document.createElement("template");
    bannerTemplate.insertAdjacentHTML(
      "afterbegin",
      `<div style="position: relative"><article class="banner">
                <img class="banner__background" src=${img} alt="Game Banner"/>
                <div class="banner__rating">${rating}</div>
                <div class="banner__tag-container">
                    ${tags.reduce(
                      (prev, next) =>
                        prev + `<div class="banner__tag">${next}</div>`,
                      ""
                    )}
                </div>
                <div class="banner__title">${title}</div>                                                          
            </article></div>`
    );
    return bannerTemplate.children[0];
  }
}
