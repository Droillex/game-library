import React from 'react';
import "./App.scss";
import {ReactComponent as Logo} from './icons/logo.svg';
import {ReactComponent as Gear} from './icons/gear.svg';
import {ReactComponent as Menu} from './icons/menu.svg';
import {ReactComponent as Steam} from './icons/steam.svg';
import {ReactComponent as Search} from './icons/search.svg';
import {ReactComponent as Windows} from './icons/windows.svg';
import {ReactComponent as User} from './icons/user.svg';
import {ReactComponent as Clock} from './icons/clock.svg';
import {ReactComponent as Dpad} from './icons/dpad.svg';
import {ReactComponent as Accept} from './icons/accept.svg';
import SimpleBar from "simplebar-react";
import 'simplebar/dist/simplebar.min.css';

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
                <button className="button button_primary button_m header__login">Login</button>
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
                <div className="page__filter filter">
                    <button className="filter__dropdown dropdown button button_align-left">
                        Genre
                        <div className="dropdown__dropdown-container">
                            <label className="dropdown__option">Action<input type="checkbox" name="action-checkbox"
                                                                             value="action"/></label>
                            <label className="dropdown__option">Adventure<input type="checkbox"
                                                                                name="adventure-checkbox"
                                                                                value="adventure"/></label>
                            <label className="dropdown__option">Shooter<input type="checkbox"
                                                                              name="shooter-checkbox"
                                                                              value="shooter"/></label>
                            <label className="dropdown__option">Fighting<input type="checkbox"
                                                                               name="fighting-checkbox"
                                                                               value="fighting"/></label>
                            <label className="dropdown__option">Puzzle<input type="checkbox" name="puzzle-checkbox"
                                                                             value="puzzle"/></label>
                        </div>
                    </button>
                    <button className="filter__dropdown dropdown button button_align-left">
                        Tags
                    </button>
                    <button className="filter__dropdown dropdown button button_align-left">
                        System
                    </button>
                    <button className="filter__dropdown dropdown button button_align-left">
                        Language
                    </button>
                    <button className="filter__reset button button_cross"/>
                    <div className="filter__item">Genre: Action
                        <button className="filter__item-reset button button_cross"/>
                    </div>
                    <div className="filter__item">System: Windows
                        <button className="filter__item-reset button button_cross"/>
                    </div>
                </div>
                <div className="game-popup">
                    <div className="game-popup__title">Game Title</div>
                    <div className="game-popup__date">12 Jan 2019</div>
                    <div className="game-popup__image"/>
                    <div className="game-popup__rating">
                        Overall Rating:<br/>
                        <span className="rating_positive">Very Positive</span> (based on 15,356 reviews)
                    </div>
                    <div className="game-popup__tags-label">Tags</div>
                    <div className="game-popup__tag-container">
                        <div className="game-popup__tag">Adventure</div>
                        <div className="game-popup__tag">Action</div>
                        <div className="game-popup__tag">Souls-like</div>
                        <div className="game-popup__tag">AAA</div>
                        <div className="game-popup__tag">Difficult</div>
                        <div className="game-popup__tag">Magic</div>
                        <div className="game-popup__tag">Fantasy</div>
                        <div className="game-popup__tag">Multiplayer</div>
                    </div>
                    <div className="game-popup__status-container">
                        <button className="game-popup__status game-popup__status_default button button_transparent">
                            <Clock title="Want" className="game-popup__status-icon"/>
                            <div className="game-popup__status-label">Want</div>
                        </button>
                        <button className="game-popup__status game-popup__status_active button button_transparent">
                            <Dpad title="Playing" className="game-popup__status-icon"/>
                            <div className="game-popup__status-label">Playing</div>
                        </button>
                        <button className="game-popup__status game-popup__status_default button button_transparent">
                            <Accept title="Played" className="game-popup__status-icon"/>
                            <div className="game-popup__status-label">Played</div>
                        </button>
                    </div>
                    <button className="game-popup__button button button_primary">Follow</button>
                </div>
                <section className="banner-section page__banner-section">
                    <div className="banner-section__title-container">
                        <h3 className="banner-section__title">Hot & New</h3>
                        <div className="banner-section__more-button">See More</div>
                    </div>
                    <div className="banner-section__row">
                        <article className="banner">
                            <div className="banner__rating">94</div>
                            <div className="banner__tag-container">
                                <div className="banner__tag">free to play</div>
                                <div className="banner__tag">moba</div>
                            </div>
                            <div className="banner__title">Gigantic Open Beta Starts Now</div>
                        </article>
                        <article className="banner">
                            <div className="banner__rating">87</div>
                            <div className="banner__tag-container">
                                <div className="banner__tag">action</div>
                                <div className="banner__tag">hardcore</div>
                                <div className="banner__tag">adventure</div>
                            </div>
                            <div className="banner__title">Elden Ring Is Now Available</div>
                        </article>
                        <article className="banner">
                            <div className="banner__rating">89</div>
                            <div className="banner__tag-container">
                                <div className="banner__tag">fighting</div>
                                <div className="banner__tag">anime</div>
                            </div>
                            <div className="banner__title">King Of Fighters XV is now available</div>
                        </article>
                    </div>
                </section>
                <section className="thumb-section page__thumb-section">
                    <div className="banner-section__title-container">
                        <h3 className="banner-section__title">Trending</h3>
                        <div className="banner-section__more-button">See More</div>
                    </div>
                    <div className="thumb-section__row">
                        <div className="thumb-container">
                            <article className="thumb">
                                <div className="thumb__cover"/>
                                <div className="thumb__info">
                                    <div className="thumb__title">Guilty Gear Strive</div>
                                    <div className="thumb__genre">Fighting, Anime</div>
                                    <div className="thumb__platforms">
                                        <Windows className="thumb__platform-icon"/>
                                        <Steam className="thumb__platform-icon"/>
                                    </div>
                                </div>
                            </article>
                        </div>
                        <div className="thumb-container">
                            <article className="thumb">
                                <div className="thumb__cover"/>
                                <div className="thumb__info">
                                    <div className="thumb__title">Guilty Gear Strive</div>
                                    <div className="thumb__genre">Fighting, Anime</div>
                                    <div className="thumb__platforms">
                                        <Windows className="thumb__platform-icon"/>
                                        <Steam className="thumb__platform-icon"/>
                                    </div>
                                </div>
                            </article>
                        </div>
                        <div className="thumb-container">
                            <article className="thumb">
                                <div className="thumb__cover"/>
                                <div className="thumb__info">
                                    <div className="thumb__title">Guilty Gear Strive</div>
                                    <div className="thumb__genre">Fighting, Anime</div>
                                    <div className="thumb__platforms">
                                        <Windows className="thumb__platform-icon"/>
                                        <Steam className="thumb__platform-icon"/>
                                    </div>
                                </div>
                            </article>
                        </div>
                        <div className="thumb-container">
                            <article className="thumb">
                                <div className="thumb__cover"/>
                                <div className="thumb__info">
                                    <div className="thumb__title">Guilty Gear Strive</div>
                                    <div className="thumb__genre">Fighting, Anime</div>
                                    <div className="thumb__platforms">
                                        <Windows className="thumb__platform-icon"/>
                                        <Steam className="thumb__platform-icon"/>
                                    </div>
                                </div>
                            </article>
                        </div>
                        <div className="thumb-container">
                            <article className="thumb">
                                <div className="thumb__cover"/>
                                <div className="thumb__info">
                                    <div className="thumb__title">Guilty Gear Strive</div>
                                    <div className="thumb__genre">Fighting, Anime</div>
                                    <div className="thumb__platforms">
                                        <Windows className="thumb__platform-icon"/>
                                        <Steam className="thumb__platform-icon"/>
                                    </div>
                                </div>
                            </article>
                        </div>
                        <div className="thumb-container">
                            <article className="thumb">
                                <div className="thumb__cover"/>
                                <div className="thumb__info">
                                    <div className="thumb__title">Guilty Gear Strive</div>
                                    <div className="thumb__genre">Fighting, Anime</div>
                                    <div className="thumb__platforms">
                                        <Windows className="thumb__platform-icon"/>
                                        <Steam className="thumb__platform-icon"/>
                                    </div>
                                </div>
                            </article>
                        </div>
                        <div className="thumb-container">
                            <article className="thumb">
                                <div className="thumb__cover"/>
                                <div className="thumb__info">
                                    <div className="thumb__title">Guilty Gear Strive</div>
                                    <div className="thumb__genre">Fighting, Anime</div>
                                    <div className="thumb__platforms">
                                        <Windows className="thumb__platform-icon"/>
                                        <Steam className="thumb__platform-icon"/>
                                    </div>
                                </div>
                            </article>
                        </div>
                        <div className="thumb-container">
                            <article className="thumb">
                                <div className="thumb__cover"/>
                                <div className="thumb__info">
                                    <div className="thumb__title">Guilty Gear Strive</div>
                                    <div className="thumb__genre">Fighting, Anime</div>
                                    <div className="thumb__platforms">
                                        <Windows className="thumb__platform-icon"/>
                                        <Steam className="thumb__platform-icon"/>
                                    </div>
                                </div>
                            </article>
                        </div>
                        <div className="thumb-container">
                            <article className="thumb">
                                <div className="thumb__cover"/>
                                <div className="thumb__info">
                                    <div className="thumb__title">Guilty Gear Strive</div>
                                    <div className="thumb__genre">Fighting, Anime</div>
                                    <div className="thumb__platforms">
                                        <Windows className="thumb__platform-icon"/>
                                        <Steam className="thumb__platform-icon"/>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>
                </section>
                <section className="thumb-section page__thumb-section">
                    <div className="banner-section__title-container">
                        <h3 className="banner-section__title">Best Selling</h3>
                        <div className="banner-section__more-button">See More</div>
                    </div>
                    <div className="thumb-section__row">
                        <article className="thumb">
                            <div className="thumb__cover"/>
                            <div className="thumb__info">
                                <div className="thumb__title">Guilty Gear Strive</div>
                                <div className="thumb__genre">Fighting, Anime</div>
                                <div className="thumb__platforms">
                                    <Windows className="thumb__platform-icon"/>
                                    <Steam className="thumb__platform-icon"/>
                                </div>
                            </div>
                        </article>
                        <article className="thumb">
                            <div className="thumb__cover"/>
                            <div className="thumb__info">
                                <div className="thumb__title">Guilty Gear Strive</div>
                                <div className="thumb__genre">Fighting, Anime</div>
                                <div className="thumb__platforms">
                                    <Windows className="thumb__platform-icon"/>
                                    <Steam className="thumb__platform-icon"/>
                                </div>
                            </div>
                        </article>
                        <article className="thumb">
                            <div className="thumb__cover"/>
                            <div className="thumb__info">
                                <div className="thumb__title">Guilty Gear Strive</div>
                                <div className="thumb__genre">Fighting, Anime</div>
                                <div className="thumb__platforms">
                                    <Windows className="thumb__platform-icon"/>
                                    <Steam className="thumb__platform-icon"/>
                                </div>
                            </div>
                        </article>
                        <article className="thumb">
                            <div className="thumb__cover"/>
                            <div className="thumb__info">
                                <div className="thumb__title">Guilty Gear Strive</div>
                                <div className="thumb__genre">Fighting, Anime</div>
                                <div className="thumb__platforms">
                                    <Windows className="thumb__platform-icon"/>
                                    <Steam className="thumb__platform-icon"/>
                                </div>
                            </div>
                        </article>
                        <article className="thumb">
                            <div className="thumb__cover"/>
                            <div className="thumb__info">
                                <div className="thumb__title">Guilty Gear Strive</div>
                                <div className="thumb__genre">Fighting, Anime</div>
                                <div className="thumb__platforms">
                                    <Windows className="thumb__platform-icon"/>
                                    <Steam className="thumb__platform-icon"/>
                                </div>
                            </div>
                        </article>
                        <article className="thumb">
                            <div className="thumb__cover"/>
                            <div className="thumb__info">
                                <div className="thumb__title">Guilty Gear Strive</div>
                                <div className="thumb__genre">Fighting, Anime</div>
                                <div className="thumb__platforms">
                                    <Windows className="thumb__platform-icon"/>
                                    <Steam className="thumb__platform-icon"/>
                                </div>
                            </div>
                        </article>
                        <article className="thumb">
                            <div className="thumb__cover"/>
                            <div className="thumb__info">
                                <div className="thumb__title">Guilty Gear Strive</div>
                                <div className="thumb__genre">Fighting, Anime</div>
                                <div className="thumb__platforms">
                                    <Windows className="thumb__platform-icon"/>
                                    <Steam className="thumb__platform-icon"/>
                                </div>
                            </div>
                        </article>
                        <article className="thumb">
                            <div className="thumb__cover"/>
                            <div className="thumb__info">
                                <div className="thumb__title">Guilty Gear Strive</div>
                                <div className="thumb__genre">Fighting, Anime</div>
                                <div className="thumb__platforms">
                                    <Windows className="thumb__platform-icon"/>
                                    <Steam className="thumb__platform-icon"/>
                                </div>
                            </div>
                        </article>
                        <article className="thumb">
                            <div className="thumb__cover"/>
                            <div className="thumb__info">
                                <div className="thumb__title">Guilty Gear Strive</div>
                                <div className="thumb__genre">Fighting, Anime</div>
                                <div className="thumb__platforms">
                                    <Windows className="thumb__platform-icon"/>
                                    <Steam className="thumb__platform-icon"/>
                                </div>
                            </div>
                        </article>
                    </div>
                </section>
            </SimpleBar>
        </div>
    );
}

export default App;
