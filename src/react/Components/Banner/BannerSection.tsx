import {ISection} from "../../Interfaces";
import {IBanner, IViewTemplate} from "./Interfaces";
import { ReactComponent as Loader } from "../../../icons/infinityLoader.svg";
import React from "react";
import PopupWrapper from "../GameInfo/PopupWrapper";
import Banner from "./Banner";
import SAD_IMG from "../../../icons/sadSmile.svg";

/**
 * Component to display loaded banner data.
 *
 * @param {IViewTemplate<IThumb>} props ViewTemplate config: banners data.
 * @return {JSX.Element} JSX element of ViewTemplate.
 */
function ViewTemplate({items}: IViewTemplate) {
  return (
    <div className="banner-section__row">
      {items.map((item) => (
        <PopupWrapper key={item.id} id={item.id}>
          <Banner
            id={item.id}
            title={item.title}
            img={item.img}
            rating={item.rating}
            tags={item.tags}
          />
        </PopupWrapper>
      ))}
    </div>
  );
}

/**
 * Component to display error template.
 *
 * @return {JSX.Element} JSX element of ErrorTemplate.
 */
function ErrorTemplate() {
  return (
    <div className="banner-section__error">
      <img className="banner-section__error-img" src={SAD_IMG} alt="Error" />
      <div className="banner-section__error-label">
        Error while loading data...
      </div>
      <div className="banner-section__error-label">
        Check your internet connection and try again
      </div>
    </div>
  );
}

/**
 * Section with multiple banners.
 *
 * @param {ISection<IBanner>} props BannerSection config: title, banners data, has more to load flag.
 * @return {JSX.Element} JSX element of BannerSection.
 */
export default function BannerSection({
  title,
  items,
  withMore,
}: ISection<IBanner>) {
  return (
    <section className="banner-section page__banner-section">
      <div className="banner-section__title-container">
        <h3 className="banner-section__title">{title}</h3>
      </div>
      {items !== null && <ViewTemplate items={items}/>}
      {items === null && <ErrorTemplate />}
      {withMore && <Loader />}
    </section>
  );
}
