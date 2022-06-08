import { MONTHS } from "../../consts";
import { RATINGS } from "../../../components/consts";
import {IGameInfo, IImageFade, IPopupData} from "./Interfaces";
import EMPTY_IMG from "../../../icons/noScreenshot.svg";
import SAD_IMG from "../../../icons/sadSmile.svg";
import LOADING_IMG from "../../../icons/infinityLoader.svg";
import { animated, config, useTransition } from "react-spring";
import {useState} from "react";

/**
 * Formats release date to format dd mon yyyy.
 *
 * @param {Date} date Date object to format.
 * @return {string} Formatted date.
 */
function releaseDateGetter(date: Date) {
  return `${date.getDay()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

/**
 * Rating config getter based on score number.
 *
 * @param {number} score Animation duration in ms.
 * @return {RATINGS} Rating config.
 */
export function getRating(score: number | undefined) {
  if (score === undefined) return undefined;
  if (score >= 90) return RATINGS.VERY_POSITIVE;
  else if (score >= 70) return RATINGS.POSITIVE;
  else if (score >= 50) return RATINGS.MIXED;
  else if (score >= 30) return RATINGS.NEGATIVE;
  else return RATINGS.MOSTLY_NEGATIVE;
}

/**
 * Component to fade through multiple images.
 *
 * @param {IImageFade} props Fader config: image src array, img game title and animation start delay.
 * @return {JSX.Element} JSX element of image fader.
 */
function ImageFade({images, title, delay = 200}: IImageFade) {
    const [screenshotIdx, setScreenshotIdx] = useState(0);
    const fade = useTransition(screenshotIdx, {
      from: { opacity: 0 },
      enter: { opacity: 1 },
      leave: { opacity: 0 },
      config: config.molasses,
      delay,
      onRest: (anim) => {
        if (anim.finished) setScreenshotIdx((screenshotIdx + 1) % images.length);
      },
    });

    return fade(({opacity}, idx) => <animated.img
        style={{opacity: opacity.to({ range: [0.0, 1.0], output: [0, 1] })}}
        className="game-popup__image__img"
        src={images[idx]}
        alt={`${title} Screenshot`}
    />)
}

/**
 * Component to display successfully loaded game info.
 *
 * @param {IPopupData} props ViewTemplate config.
 * @return {JSX.Element} JSX element of ViewTemplate.
 */
function ViewTemplate({ data }: { data: IPopupData }) {
  const ratingConfig = getRating(data?.totalRating);
  return (
    <>
      <>
        <div className="game-popup__title">{data?.title}</div>
        <div className="game-popup__date">
          {releaseDateGetter(data?.date || new Date())}
        </div>
        <div className="game-popup__image">
          {data.screenshots.length ? (
            <ImageFade title={data.title} images={data.screenshots} />
          ) : (
            <img
              className="game-popup__image__img"
              src={data?.screenshots.length ? data?.screenshots[0] : EMPTY_IMG}
              alt={`${data?.title} Screenshot`}
            />
          )}
        </div>
        <div className="game-popup__rating">
          <div>Overall Rating:</div>
          {ratingConfig ? (
            <>
              <span
                className={ratingConfig.cssClass}
                title={`${Math.round(data?.totalRating || 0)}%`}
              >
                {ratingConfig.title}
              </span>{" "}
              (based on {data?.ratingCount} reviews)
            </>
          ) : (
            "Not enough votes"
          )}
        </div>
        {data?.keywords && (
          <>
            <div className="game-popup__tags-label">Tags</div>
            <div className="game-popup__tag-container">
              {data.keywords.map((tag) => (
                <div className="game-popup__tag" key={tag}>
                  {tag}
                </div>
              ))}
            </div>
          </>
        )}
      </>
    </>
  );
}

/**
 * Component to display preloader.
 *
 * @return {JSX.Element} JSX element of ViewTemplate.
 */
function LoadingTemplate() {
    return (
        <div className="game-popup__loading-container">
            <img src={LOADING_IMG} alt="Loader"/>
        </div>
    )
}

/**
 * Component to display loading errors.
 *
 * @return {JSX.Element} JSX element of ViewTemplate.
 */
function ErrorTemplate() {
    return (
      <>
        <img className="game-popup__error-img" src={SAD_IMG} alt="Error" />
        <div className="game-popup__error-message">Something went wrong...</div>
        <div className="game-popup__error-message">Check your internet connection and reopen popup</div>
      </>
    );
}

/**
 * Game info window resolver component.
 *
 * @param {IGameInfo} props GameInfo config.
 * @return {JSX.Element} JSX element of GameInfo component.
 */
export default function GameInfo({
  data,
  horizontal,
  vertical,
  style
}: IGameInfo) {
    return (
        <animated.div
            className={`game-popup game-popup__${horizontal} game-popup__${vertical}`}
            style={{
                ...style,
                [horizontal]: "100%",
                [vertical]: "20px",
                transformOrigin: `${horizontal} ${vertical}`,
            }}
        >
            {data === undefined && <LoadingTemplate/>}
            {data === null && <ErrorTemplate/>}
            {(data !== null && data !== undefined) && <ViewTemplate data={data}/> }
        </animated.div>
    )
}