import React, {
  createRef,
  useEffect,
  useRef,
  useState,
} from "react";
import GameInfo from "./GameInfo";
import {HorizontalPosition, IPopupData, IPopupPosition, IPopupWrapper, VerticalPosition} from "./Interfaces";
import Api from "../../../api/api";
import {useSpring} from "react-spring";
import {loadImage, processError} from "../../../components/helpers";
import {EMPTY_HEIGHT, EMPTY_WIDTH, HOVER_DELAY} from "./consts";
import {calculatePopupPosition} from "./helpers";

/**
 * Element wrapper to add GamePopup component to element.
 *
 * @param {IPopupWrapper} props PopupWrapper config: game id and component to wrap.
 * @return {JSX.Element} JSX element of PopupWrapper.
 */
export default function PopupWrapper({ id, children }: IPopupWrapper) {
  const [popupData, setPopupData] = useState<IPopupData | undefined | null>(
    undefined
  );
  const [popupPosition, setPopupPosition] = useState<IPopupPosition>({
    horizontal: "left",
    vertical: "top",
  });
  const [popupVisible, setPopupVisible] = useState(false);
  const abortController = useRef<AbortController>(new AbortController());
  const containerRef = createRef<HTMLDivElement>();
  const popupStyle = useSpring({
    transform: popupVisible ? "scale(1)" : "scale(0)",
    onStart: () => setIsAnimating(true),
    onRest: () => setIsAnimating(false)
  });
  const [isAnimating, setIsAnimating] = useState(false);
  const popupFadeTimeout = useRef<ReturnType<typeof setTimeout>>();

  /**
   * Check if new position values differs from current.
   *
   * @param {HorizontalPosition} horizontal Horizontal anchor point.
   * @param {VerticalPosition} vertical Vertical anchor point.
   * @return {void}
   */
  function setPosition(horizontal: HorizontalPosition, vertical: VerticalPosition) {
    if (popupPosition.horizontal !== horizontal || popupPosition.vertical !== vertical) {
      setPopupPosition({ horizontal, vertical });
    }
  }

  /**
   * Abort promise on unmount (if not already fulfilled).
   *
   * @return {void}
   */
  useEffect(() => {
    return () => {
      if (popupData === undefined) abortController.current.abort();
    };
  }, []);

  /**
   * Recalculate anchor point when game data was loaded.
   *
   * @return {void}
   */
  useEffect(() => {
    const { horizontal, vertical } = calculatePopupPosition(containerRef.current as HTMLDivElement, EMPTY_WIDTH);
    setPosition(horizontal, vertical);
  }, [popupData])

  /**
   * Initiate popup initialization.
   *
   * @param {React.MouseEvent} e Mouse enter event.
   * @return {void}
   */
  function mouseEnterHandler(e: React.MouseEvent) {
    /**
     * Scale in popup while retrieving game data.
     *
     * @param {HTMLDivElement} target Popup parent container element.
     * @return {void}
     */
    function initPopup (target: HTMLDivElement) {
      setPopupVisible(true);
      if (popupData === undefined || popupData === null) {
        setPopupData(undefined);
        abortController.current = new AbortController();
        Api.getPopupById(id, abortController.current.signal).then((popupData) => {
          if (popupData.screenshots.length) {
            Promise.all(popupData.screenshots.map((pic) => loadImage(pic))).then(() => setPopupData(popupData))
              .catch((e) => {
                popupData.screenshots = [];
              });
          } else {
            setPopupData(popupData);
          }
        }).catch(e => {
          setPopupData(null);
          processError(e);
        });
      }
      const { horizontal, vertical } = calculatePopupPosition(
          target as HTMLDivElement,
          EMPTY_WIDTH,
          EMPTY_HEIGHT
      );
      setPosition(horizontal, vertical);
      popupFadeTimeout.current = undefined;
    }
    const initFunc = initPopup.bind(null, e.currentTarget as HTMLDivElement);
    popupFadeTimeout.current = setTimeout(initFunc, HOVER_DELAY);
  }

  /**
   * Abort data load (if needed) and scale out popup.
   *
   * @param {React.MouseEvent} e Mouse enter event.
   * @return {void}
   */
  function mouseLeaveHandler() {
    if(popupFadeTimeout.current) {
      clearTimeout(popupFadeTimeout.current);
      popupFadeTimeout.current = undefined;
    }
    if(popupData === undefined) {
      abortController.current.abort();
    }
    setPopupVisible(false);
  }

  return (
    <div
      style={{ position: "relative" }}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      ref={containerRef}
    >
      {(popupVisible || isAnimating) && (
        <GameInfo
          style={popupStyle}
          data={popupData}
          horizontal={popupPosition.horizontal}
          vertical={popupPosition.vertical}
        />
      )}
      {children}
    </div>
  );
}