import React, {useState } from "react";
import { animated, config, useSpring } from "react-spring";
import {IDropdownBase} from "./Interfaces";

/**
 * Base component for custom dropdown implementation.
 *
 * @param {IDropdownBase} props DropdownBase config: title and dropdown items.
 * @return {JSX.Element} JSX element of DropdownBase.
 */
export default function DropdownBase({
  title,
  children,
}: IDropdownBase) {
  const [isToggled, setIsToggled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const styles = useSpring({
    transform: `scaleY(${isToggled ? 1 : 0})`,
    opacity: isToggled ? 1 : 0,
    animConfig: config.gentle,
    onRest: (anim) => {
      if (!anim.cancelled && !isToggled) setIsVisible(false);
    },
  });

  /**
   * Check if dropdown container was clicked (not it's item).
   *
   * @param {React.MouseEvent} e Click mouse event.
   * @return {void}.
   */
  function dropdownClickHandler(e: React.MouseEvent) {
    if (!(e.target as HTMLDivElement).closest(".dropdown__dropdown-container")) {
      setIsToggled(!isToggled);
      setIsVisible(true);
    }
  }

  return (
    <button
      className="filter__dropdown dropdown button button_align-left"
      onClick={dropdownClickHandler}
      onMouseLeave={() => {
        setIsToggled(false);
      }}
    >
      <div>{title}</div>
      <div className={`arrow ${isToggled ? "up" : "down"}`} />
      {isVisible && (
        <animated.div className="dropdown__dropdown-container" style={styles}>
          {children}
        </animated.div>
      )}
    </button>
  );
}