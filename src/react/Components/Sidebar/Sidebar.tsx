import { ReactComponent as Logo } from "../../../icons/logo.svg";
import { ReactComponent as Menu } from "../../../icons/menu.svg";
import { ReactComponent as User } from "../../../icons/user.svg";
import { ReactComponent as Gear } from "../../../icons/gear.svg";
import React from "react";

/**
 * Component to display Sidebar.
 *
 * @return {JSX.Element} JSX element of Sidebar.
 */
export default function Sidebar() {
  return (
    <aside className="sidebar">
      <a className="sidebar__logo">
        <Logo className="sidebar__svg" />
      </a>
      <a className="sidebar__icon sidebar__icon_disabled">
        <Menu className="sidebar__svg" />
      </a>
      <a className="sidebar__icon sidebar__icon_disabled">
        <User className="sidebar__svg" />
      </a>
      <a className="sidebar__icon sidebar__icon_disabled">
        <Gear className="sidebar__svg" />
      </a>
    </aside>
  );
}
