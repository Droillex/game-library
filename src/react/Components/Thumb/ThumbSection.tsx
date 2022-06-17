import {IErrorTemplate, ISection, IViewTemplate} from "../../Interfaces";
import Thumb from "./Thumb";
import { IThumb } from "./Interfaces";
import { ReactComponent as Loader } from "../../../icons/infinityLoader.svg";
import { ReactComponent as SadFace } from "../../../icons/sadSmile.svg";
import React from "react";
import PopupWrapper from "../GameInfo/PopupWrapper";
import SAD_IMG from "../../../icons/sadSmile.svg";


/**
 * Component to display empty template.
 *
 * @return {JSX.Element} JSX element of EmptyTemplate.
 */
function EmptyTemplate() {
  return (
    <>
      <SadFace className="thumb-section__empty-img" />
      <div className="thumb-section__empty-label">
        No results for specified parameters
      </div>
    </>
  );
}

/**
 * Component to display loaded thumb data.
 *
 * @param {IViewTemplate<IThumb>} props ViewTemplate config: title and thumbs data.
 * @return {JSX.Element} JSX element of ViewTemplate.
 */
function ViewTemplate({ title, items }: IViewTemplate<IThumb>) {
  return (
    <>
      <div className="banner-section__title-container">
        <h3 className="banner-section__title">{title}</h3>
      </div>
      <div className="thumb-section__row">
        {items.map((thumb) => (
          <PopupWrapper key={thumb.id} id={thumb.id}>
            <Thumb
              key={thumb.id}
              id={thumb.id}
              title={thumb.title}
              cover={thumb.cover}
              genres={thumb.genres}
              platforms={thumb.platforms}
            />
          </PopupWrapper>
        ))}
      </div>
    </>
  );
}

/**
 * Component to display error template.
 *
 * @param {IViewTemplate<IThumb>} props IErrorTemplate config: section title.
 * @return {JSX.Element} JSX element of ErrorTemplate.
 */
function ErrorTemplate({ title }: IErrorTemplate) {
    return (
        <>
            <div className="banner-section__title-container">
                <h3 className="banner-section__title">{title}</h3>
            </div>
            <div className="thumb-section__error">
                <img className="thumb-section__error-img" src={SAD_IMG} alt="Error"/>
                <div className="thumb-section__error-label">Error while loading data...</div>
                <div className="thumb-section__error-label">Check your internet connection and try again</div>
            </div>
        </>
    );
}

/**
 * Section with multiple thumbs.
 *
 * @param {ISection<IThumb>} props BannerSection config: title, thumbs data, has more to load flag.
 * @return {JSX.Element} JSX element of ThumbSection.
 */
export default function ThumbSection({
  title,
  items,
  withMore,
}: ISection<IThumb>) {
  return (
    <section
      className={`thumb-section page__thumb-section ${
        items && items.length === 0 && !withMore ? "thumb-section_empty" : ""
      }`}
    >
      {items === null && <ErrorTemplate title={title}/>}
      {items && items.length === 0 && !withMore && <EmptyTemplate />}
      {((items && items.length > 0) || withMore) && <ViewTemplate title={title} items={items as IThumb[]} />}
      {withMore && <Loader />}
    </section>
  );
}
