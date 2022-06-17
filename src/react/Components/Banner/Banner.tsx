import React from "react";
import {IBanner} from "./Interfaces";

/**
 * Component to display Banner.
 *
 * @param {IBanner} props Banner config to display.
 * @return {JSX.Element} JSX element of Banner.
 */
export default function Banner({ title, img, rating, tags }: IBanner) {
  return (
    <article className="banner">
      <img className="banner__background" src={img} alt="Game Banner" />
      <div className="banner__rating">{Math.floor(rating)}</div>
      <div className="banner__tag-container">
        {tags.map((tag) => (
          <div key={tag} className="banner__tag">
            {tag}
          </div>
        ))}
      </div>
      <div className="banner__title">{title}</div>
    </article>
  );
}
