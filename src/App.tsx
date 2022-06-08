import React, {useState} from "react";
import "./App.scss";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import Header from "./react/Components/Header/Header";
import Sidebar from "./react/Components/Sidebar/Sidebar";
import Filter from "./react/Components/Filter/Filter";
import {
  CONDITIONS_CONFIG,
  INITIAL_ITEM_COUNT,
  EXTRA_ITEM_COUNT,
  SORT_CONFIG,
  BANNER_IDS, BANNER_NAMES, INITIAL_FILTER_VALUE, DEFAULT_LAYOUT
} from "./react/consts";
import SearchInput from "./react/Components/Filter/SearchInput";
import {IFilterValue} from "./react/Components/Filter/Interfaces";
import {getQueryString} from "./react/helpers";
import Api from "./api/api";
import {IThumb} from "./react/Components/Thumb/Interfaces";
import {IBanner} from "./react/Components/Banner/Interfaces";
import BannerSection from "./react/Components/Banner/BannerSection";
import ThumbSection from "./react/Components/Thumb/ThumbSection";
import ItemLoader from "./react/Components/ItemLoader/ItemLoader";
import {ILayout} from "./react/Interfaces";

/**
 * Main page layout.
 *
 * @return {void}
 */
function App() {
  const [searchString, setSearchString] = useState("");
  const [sortField, setSortField] = useState<string[]>([INITIAL_FILTER_VALUE]);
  const [selectedValues, setSelectedValues] = useState<IFilterValue[]>(
    CONDITIONS_CONFIG.map((dropdown) => ({
      id: dropdown.id,
      title: dropdown.title,
      selectedIds: [],
    }))
  );
  const [sections, setSections] = useState<ILayout>(DEFAULT_LAYOUT);

  /**
   * Search string change handler.
   *
   * @param {string} value new search string value.
   * @return {void}
   */
  function onSearchChanged(value: string) {
    setSearchString(value);
    onConditionsChanged(value, selectedValues, sortField);
  }

  /**
   * Sort field change handler.
   *
   * @param {string[]} sort New sort field value.
   * @return {void}
   */
  function onSortFieldChanged(sort: string[]) {
    if (JSON.stringify(sort) !== JSON.stringify(sortField)) {
      setSortField(sort);
      onConditionsChanged(searchString, selectedValues, sort);
    }
  }

  /**
   * Selected filter values change handler.
   *
   * @param {IFilterValue[]} selectedVals New selected filter values.
   * @return {void}
   */
  function onSelectedValuesChanged(selectedVals: IFilterValue[]) {
    if(JSON.stringify(selectedVals) !== JSON.stringify(selectedValues)) {
      setSelectedValues(selectedVals);
      onConditionsChanged(searchString, selectedVals, sortField);
    }
  }

  /**
   * Banner loader helper function for ItemLoader.
   *
   * @param {number} limit Items count to load.
   * @param {number} offset Item offset.
   * @param {AbortSignal} abortSignal Signal to abort fetch.
   * @return {void}
   */
  async function bannerLoader(limit: number, offset: number, abortSignal: AbortSignal): Promise<IBanner[]> {
    const bannerData = await Api.getBannerById(BANNER_IDS, abortSignal);
    return bannerData.map((banner) => ({id: banner.id, title: BANNER_NAMES[banner.id], img: banner.screenshots[
          Math.floor(Math.random() * banner.screenshots.length)], rating: banner.rating, tags: banner.genres}))
  }

  /**
  * Thumb loader helper function for ItemLoader.
  *
  * @param {string} queryString Query string with specified filtration.
  * @return {void}
  */
  function thumbLoader(queryString?: string) {
    return async function(limit: number, offset: number, abortSignal: AbortSignal): Promise<IThumb[]> {
      const query = queryString ? queryString : getQueryString(searchString, selectedValues, sortField[0], limit, offset);
      return Api.getThumbData(query, abortSignal);
    }
  }

  /**
   * Any of search condition changed handler.
   *
   * @param {string} searchValue Search string.
   * @param {IFilterValue[]} filterValues Selected filter values.
   * @param {string[]} sortField Field to sort by.
   * @return {void}
   */
  function onConditionsChanged(searchValue: string, filterValues: IFilterValue[], sortField: string[]) {
    if (searchValue === "" && !filterValues.some((filter) => filter.selectedIds.length) &&
      sortField[0] === INITIAL_FILTER_VALUE) {
      setSections(DEFAULT_LAYOUT);
    } else {
      setSections({ banners: [], thumbs: [{ title: "Results" }] });
    }
  }

  return (
    <div className="app">
      <Header>
        <SearchInput value={searchString} onChange={onSearchChanged} />
      </Header>
      <Sidebar />
      <SimpleBar className="page">
        <Filter
          conditionsConfig={CONDITIONS_CONFIG}
          sortConfig={SORT_CONFIG}
          sortField={sortField}
          setSortField={onSortFieldChanged}
          selectedValues={selectedValues}
          setSelectedValues={onSelectedValuesChanged}
        />
        {sections.banners.map((bannerSection) => (
            //@ts-ignore
            <ItemLoader
              key={bannerSection.title}
              Section={BannerSection}
              props={{ title: bannerSection.title }}
              initialItemCount={INITIAL_ITEM_COUNT}
              itemLoader={bannerLoader}
            />
          ))}
        {sections.thumbs.map((thumbSection) => (
            //@ts-ignore
            <ItemLoader
              key={thumbSection.title}
              Section={ThumbSection}
              props={{ title: thumbSection.title }}
              initialItemCount={INITIAL_ITEM_COUNT}
              extraItemCount={
                sections.banners.length ? undefined : EXTRA_ITEM_COUNT
              }
              itemLoader={thumbLoader(thumbSection.queryString)}
            />
          ))}
      </SimpleBar>
    </div>
  );
}

export default App;
