import React from "react";

interface ITag {
    title: string;
    values: string[];
    onReset: () => void;
}

/**
 * Component to display Tag.
 *
 * @param {ITag} props Tag config to display.
 * @return {JSX.Element} JSX element of Tag.
 */
export default function Tag({title, values, onReset}: ITag) {
  return (
    <div className="filter__item">
      <div className="filter__item-text">{title}: {values.join(", ")}</div>
      <button className="filter__item-reset button button_cross" onClick={onReset}/>
    </div>
  );
}