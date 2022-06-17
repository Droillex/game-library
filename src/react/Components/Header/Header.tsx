import React, {ReactElement} from "react";

interface IHeader {
  children?: ReactElement;
}

/**
 * Page layout Header component.
 *
 * @param {IHeader} props Header config: elements to place on the right from nav.
 * @return {JSX.Element} JSX element of Header.
 */
export default function Header({children}: IHeader) {
  return (
    <header className="header" id="header">
      <nav className="header__nav">
        <a className="header__nav-link header__nav-link_disabled link">
          Popular
        </a>
        <a className="header__nav-link header__nav-link_disabled link">
          Top Rated
        </a>
        <a className="header__nav-link header__nav-link_disabled link">
          Exclusives
        </a>
        <a className="header__nav-link header__nav-link_disabled link">
          Recent
        </a>
      </nav>
      {children}
    </header>
  );
}