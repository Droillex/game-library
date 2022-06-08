import {IThumb} from "./Interfaces";

const MAX_PLATFORM_COUNT = 5;

/**
 * Component to display Thumb.
 *
 * @param {IThumb} props Thumb config to display.
 * @return {JSX.Element} JSX element of Thumb.
 */
export default function Thumb({ title, cover, genres, platforms }: IThumb) {
  return (
      <div className="thumb-container">
        <article className="thumb">
          <div className="thumb__cover">
            <img
              className="thumb__cover-image"
              src={cover}
              alt={`${title} Cover`}
            />
          </div>
          <div className="thumb__info">
            <div className="thumb__title" title={title}>
              {title}
            </div>
            <div className="thumb__genre" title={genres.join(", ")}>
              {genres.join(", ")}
            </div>
            <div className="thumb__platforms">
              {platforms.slice(0, MAX_PLATFORM_COUNT).map(({ name, url }) => (
                <img
                  className="thumb__platform-icon"
                  title={name}
                  key={url}
                  alt={name}
                  src={url}
                />
              ))}
            </div>
          </div>
        </article>
      </div>
  );
}