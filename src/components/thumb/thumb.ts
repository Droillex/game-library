import { WithPopup } from "../abstract/withPopup";
import { INode } from "../base/interfaces";

export interface IPlatform {
  name: string;
  url: string;
}

export interface IThumb {
  id: number;
  title: string;
  cover: string;
  genres: string[];
  platforms: IPlatform[];
}

export class Thumb extends WithPopup implements INode {
  private readonly _node: Element;
  cover: string;
  title: string;
  genres: string[];
  platforms: IPlatform[];

  /**
   * Creates new Thumb instance.
   *
   * @param {number} id Game id.
   * @param {string} cover Cover image link.
   * @param {string} title Game title.
   * @param {string[]} genres Set of genres.
   * @param {IPlatform[]} platforms Available platforms.
   * @return {Thumb} New Thumb instance.
   */
  constructor(
    id: number,
    cover: string,
    title: string,
    genres: string[],
    platforms: IPlatform[]
  ) {
    const node = Thumb.makeNode(cover, title, genres, platforms);
    super(id, node);
    this._node = node;
    this.cover = cover;
    this.title = title;
    this.genres = genres;
    this.platforms = platforms;
  }

  /**
   * Gets node element of current instance.
   *
   * @return {Element} Current thumb node.
   */
  getNode() {
    return this._node;
  }

  /**
   * Creates Thumb node element based on cover link, title, genres and platforms arrays.
   *
   * @param {string} cover Game cover link.
   * @param {string} title Game title.
   * @param {string[]} genres Set of genres.
   * @param {IPlatform[]} platformsAll Set of available platforms.
   * @return {Element} Thumb node.
   */
  static makeNode(
    cover: string,
    title: string,
    genres: string[],
    platformsAll: IPlatform[]
  ) {
    const platforms = platformsAll.slice(0, 5);
    const template = document.createElement("template");
    template.insertAdjacentHTML(
      "afterbegin",
      `<div style="position: relative"><div class="thumb-container">
                    <article class="thumb">
                        <div class="thumb__cover">
                            <img class="thumb__cover-image" src="${cover}" alt="${title} Cover"/>
                        </div>
                        <div class="thumb__info">
                            <div class="thumb__title" title="${title}">${title}</div>
                            <div class="thumb__genre" title="${genres.join(
                              ", "
                            )}">${genres.join(", ")}</div>
                            <div class="thumb__platforms">
                                ${platforms.reduce(
                                  (prev, next) =>
                                    prev +
                                    `<img class="thumb__platform-icon" title="${next.name}" alt="${next.name}" src="${next.url}"/>`,
                                  ""
                                )}
                            </div>
                        </div>
                    </article>   
                </div>
                </div>`
    );
    return template.children[0];
  }
}
