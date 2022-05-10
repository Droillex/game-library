import React from 'react';
import "./App.scss";
import {ReactComponent as Logo} from './icons/logo.svg';
import {ReactComponent as Gear} from './icons/gear.svg';
import {ReactComponent as Menu} from './icons/menu.svg';
import {ReactComponent as Search} from './icons/search.svg';
import {ReactComponent as User} from './icons/user.svg';
import {ReactComponent as Loader} from "./icons/infinityLoader.svg";
import SimpleBar from "simplebar-react";
import 'simplebar/dist/simplebar.min.css';
import './script';

function App() {
    return (
        <div className="app">
            <header className="header">
                <nav className="header__nav">
                    <a className="header__nav-link link" href="./">Popular</a>
                    <a className="header__nav-link link" href="./">Top Rated</a>
                    <a className="header__nav-link link" href="./">Exclusives</a>
                    <a className="header__nav-link link" href="./">Recent</a>
                </nav>
                <div className="header__search">
                    <Search className="header__search-icon"/>
                    <input className="header__search-input" placeholder="Search the library..."/>
                </div>
            </header>
            <aside className="sidebar">
                <a className="sidebar__logo">
                    <Logo className="sidebar__svg"/>
                </a>
                <a className="sidebar__icon sidebar__icon_default" href="./">
                    <Menu className="sidebar__svg"/>
                </a>
                <a className="sidebar__icon sidebar__icon_default" href="./">
                    <User className="sidebar__svg"/>
                </a>
                <a className="sidebar__icon sidebar__icon_default" href="./">
                    <Gear className="sidebar__svg"/>
                </a>
            </aside>
            <SimpleBar className="page">
                <div className="data-container">
                    <Loader/>
                </div>
            </SimpleBar>
        </div>
    );
}

export default App;
