import React from 'react';
import "./App.scss";
import {ReactComponent as Logo} from './icons/logo.svg';
import {ReactComponent as Gear} from './icons/gear.svg';
import {ReactComponent as Home} from './icons/home.svg';
import {ReactComponent as Menu} from './icons/menu.svg';
import {ReactComponent as Steam} from './icons/steam.svg';
import {ReactComponent as Search} from './icons/search.svg';
import {ReactComponent as Windows} from './icons/windows.svg';
import {ReactComponent as User} from './icons/user.svg';

function App() {
    return (
        <div className="app">
            <header className="header">
                <nav className="header__nav">
                    <a className="header__nav-link link" href="./">Games</a>
                    <a className="header__nav-link link" href="./">Apps</a>
                    <a className="header__nav-link link" href="./">Movies</a>
                    <a className="header__nav-link link" href="./">Music</a>
                    <a className="header__nav-link link" href="./">Comics</a>
                </nav>
                <div className="header__search">
                    <Search className="header__search-icon"/>
                    <input className="header__search-input" placeholder="Search the library..."/>
                </div>
            </header>
            <aside className="sidebar">
                <div className="sidebar__logo">
                    <Logo className="sidebar__svg"/>
                </div>
                <div className="sidebar__icon sidebar__icon_default">
                    <Menu className="sidebar__svg"/>
                </div>
                <div className="sidebar__icon sidebar__icon_active">
                    <Home className="sidebar__svg"/>
                </div>
                <div className="sidebar__icon sidebar__icon_default">
                    <User className="sidebar__svg"/>
                </div>
                <div className="sidebar__icon sidebar__icon_default">
                    <Gear className="sidebar__svg"/>
                </div>
            </aside>
            <main className="page">
                <div className="page__filter filter">
                    <div className="filter__dropdown">Genre</div>
                    <div className="filter__dropdown">Tags</div>
                    <div className="filter__dropdown">System</div>
                    <div className="filter__dropdown">Language</div>
                    <button className="filter__reset button button_cross"/>
                    <div className="filter__item">Genre: Action
                        <button className="filter__item-reset button button_cross"/>
                    </div>
                    <div className="filter__item">System: Windows
                        <button className="filter__item-reset button button_cross"/>
                    </div>
                </div>
                <section className="banner-section page__banner-section">
                    <h3 className="banner-section__title">Hot & New</h3>
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
                    <h3 className="thumb-section__title">Trending</h3>
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
                                <div className="thumb__platforms"><Steam className="thumb__platform-icon"/></div>
                            </div>
                        </article>
                        <article className="thumb">
                            <div className="thumb__cover"/>
                            <div className="thumb__info">
                                <div className="thumb__title">Guilty Gear Strive</div>
                                <div className="thumb__genre">Fighting, Anime</div>
                                <div className="thumb__platforms"><Steam className="thumb__platform-icon"/></div>
                            </div>
                        </article>
                        <article className="thumb">
                            <div className="thumb__cover"/>
                            <div className="thumb__info">
                                <div className="thumb__title">Guilty Gear Strive</div>
                                <div className="thumb__genre">Fighting, Anime</div>
                                <div className="thumb__platforms"><Steam className="thumb__platform-icon"/></div>
                            </div>
                        </article>
                        <article className="thumb">
                            <div className="thumb__cover"/>
                            <div className="thumb__info">
                                <div className="thumb__title">Guilty Gear Strive</div>
                                <div className="thumb__genre">Fighting, Anime</div>
                                <div className="thumb__platforms"><Steam className="thumb__platform-icon"/></div>
                            </div>
                        </article>
                        <article className="thumb">
                            <div className="thumb__cover"/>
                            <div className="thumb__info">
                                <div className="thumb__title">Guilty Gear Strive</div>
                                <div className="thumb__genre">Fighting, Anime</div>
                                <div className="thumb__platforms"><Steam className="thumb__platform-icon"/></div>
                            </div>
                        </article>
                        <article className="thumb">
                            <div className="thumb__cover"/>
                            <div className="thumb__info">
                                <div className="thumb__title">Guilty Gear Strive</div>
                                <div className="thumb__genre">Fighting, Anime</div>
                                <div className="thumb__platforms"><Steam className="thumb__platform-icon"/></div>
                            </div>
                        </article>
                        <article className="thumb">
                            <div className="thumb__cover"/>
                            <div className="thumb__info">
                                <div className="thumb__title">Guilty Gear Strive</div>
                                <div className="thumb__genre">Fighting, Anime</div>
                                <div className="thumb__platforms"><Steam className="thumb__platform-icon"/></div>
                            </div>
                        </article>
                        <article className="thumb">
                            <div className="thumb__cover"/>
                            <div className="thumb__info">
                                <div className="thumb__title">Guilty Gear Strive</div>
                                <div className="thumb__genre">Fighting, Anime</div>
                                <div className="thumb__platforms"><Steam className="thumb__platform-icon"/></div>
                            </div>
                        </article>
                    </div>
                </section>
                <section className="thumb-section page__thumb-section">
                    <h3 className="thumb-section__title">Best selling</h3>
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
            </main>
        </div>
    );
}

export default App;
