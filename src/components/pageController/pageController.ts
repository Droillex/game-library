import { Filter } from "../filter/filter";
import { IFiltersData } from "../filter/interfaces";
import Api from "../../api/api";
import {createThumb, createThumbSection, getQueryString, processError} from "../helpers";
import {ThumbSection} from "../thumb/thumbSection";

interface ISearchConfig {
  searchString: string;
  conditions: string[];
  sort: string;
}

const DEFAULT_SORT_VALUE = "total_rating_count";
const LOAD_SCROLL_DELTA = 180;
const INITIAL_ITEM_COUNT = 27;
const EXTRA_ITEM_COUNT = 18;
const SEARCH_DELAY = 500;


export class PageController {
  private pageContainer: HTMLElement = document.body;
  private scrollContainer: HTMLElement = document.body;
  private readonly dataContainer: HTMLElement;
  private readonly searchControl: HTMLInputElement;
  private readonly loaderNode: Element;
  private readonly filter: Filter;
  private readonly initFunc: (signal?: AbortSignal) => Promise<Element[]>;
  private resultsSection: ThumbSection | undefined;
  private abortController: AbortController = new AbortController();
  private searchTimeout: ReturnType<typeof setTimeout> | undefined;
  private status: "timeout" | "fetching" | "finished" = "timeout";
  private previousSearchConfig: ISearchConfig = {searchString: "", conditions: [], sort: DEFAULT_SORT_VALUE};
  private scrollSubscription: ((e: Event) => void) | undefined;
  private navigationOffset: number = 0;

  /**
   * Creates new PageController instance by utilizing instance of Filter and init function.
   *
   * @param {Filter} filter Filter instance.
   * @param {() => Promise<Element[]>} initFunc Function used for initialization and default filtering.
   * @return {PageController} Instance of class PageController.
   */
  constructor(filter: Filter, initFunc: () => Promise<Element[]>) {
    this.filter = filter;
    this.initFunc = initFunc;
    this.dataContainer = document.querySelector(".data-container") as HTMLElement;
    this.searchControl = document.querySelector(".header__search-input") as HTMLInputElement;
    this.searchControl.addEventListener("input", this.onSearchValuesChanged.bind(this));
    this.searchControl.disabled = true;
    const loader = document.createElement("img");
    loader.src = `${process.env.PUBLIC_URL}/icons/infinityLoader.svg`;
    this.loaderNode = loader;
    this.initFunc().then((data) => {
      this.clearDataContainer();
      this.pageContainer = document.querySelector(".page .simplebar-content") as HTMLElement;
      this.scrollContainer = document.querySelector(".simplebar-content-wrapper") as HTMLElement;
      this.pageContainer.prepend(this.filter.getNode());
      this.pageContainer.addEventListener("filterChanged", this.onFilterChanged.bind(this));
      this.dataContainer.append(...data);
      this.searchControl.disabled = false;
    }).catch(processError);
  }

  /**
   * Function to trigger whenever search input changes.
   *
   * @return {void}
   */
  private onSearchValuesChanged() {
    const searchString = this.searchControl.value;
    this.search(searchString, this.filter.getFilters());
  }

  /**
   * Function to trigger whenever filter values changes.
   *
   * @param {Event} e Custom "filterChanged" event.
   * @return {void}
   */
  private onFilterChanged(e: Event) {
    const searchString = this.searchControl.value;
    const filterValues = (e as CustomEvent).detail;
    this.search(searchString, filterValues);
  }

  /**
   * Determine if controller needs to load additional matching data.
   *
   * @param {Event} e Scroll event.
   * @return {void}
   */
  private onScroll(e: Event) {
    if(this.status === "finished") {
      const target = e.target as HTMLElement;
      const scrollDelta = target.scrollHeight - (target.scrollTop + target.clientHeight);
      if (scrollDelta <= LOAD_SCROLL_DELTA) {
        this.status = "fetching";
        const filter = {
          conditions: this.previousSearchConfig.conditions,
          sort: this.previousSearchConfig.sort,
        };
        const queryString = getQueryString(this.previousSearchConfig.searchString, filter, EXTRA_ITEM_COUNT, this.navigationOffset);
        Api.getThumbData(queryString, this.abortController.signal).then(
          (data) => {
            this.navigationOffset += data.length;
            this.resultsSection?.addThumbs(data.map(thumbData => createThumb(thumbData)));
            this.status = "finished";
            if (data.length < EXTRA_ITEM_COUNT) {
              this.scrollContainer.removeEventListener("scroll", (this.scrollSubscription as (e: Event) => void));
              this.scrollSubscription = undefined;
              this.loaderNode.remove();
            }
          }
        ).catch(e => processError);
      }
    }
  }

  /**
   * Initiates search based on search string and filter parameters.
   *
   * @param {string} searchString String from search input.
   * @param {IFiltersData} filter Summary from all filters.
   * @return {void}
   */
  private search(searchString: string, filter: IFiltersData) {
    const newSearchConfig = {searchString, conditions: filter.conditions, sort: filter.sort};
    if(JSON.stringify(newSearchConfig) === JSON.stringify(this.previousSearchConfig)) return;
    this.previousSearchConfig = newSearchConfig;
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    if(this.scrollSubscription) {
      this.scrollContainer.removeEventListener("scroll", this.scrollSubscription);
      this.scrollSubscription = undefined;
    }
    if (this.status === "fetching") {
      this.abortController.abort();
      this.abortController = new AbortController();
    }
    let dataGetterFunc: () => Promise<any>;
    if (searchString === "" && filter.conditions.length === 0 && filter.sort === DEFAULT_SORT_VALUE) {
      dataGetterFunc = () => (this.initFunc(this.abortController.signal).then((data) => {
        this.clearDataContainer();
        this.dataContainer.append(...data);
      }));
    } else {
      const queryString = getQueryString(searchString, filter, INITIAL_ITEM_COUNT, 0);
      dataGetterFunc = () => (Api.getThumbData(queryString, this.abortController.signal).then(
          (data) => {
            this.resultsSection = createThumbSection("Results", data);
            this.clearDataContainer();
            this.dataContainer.append(this.resultsSection.getNode());
            this.navigationOffset = data.length;
            if (data.length === INITIAL_ITEM_COUNT) {
              this.dataContainer.append(this.loaderNode);
              this.scrollSubscription = this.onScroll.bind(this);
              this.scrollContainer.addEventListener("scroll", this.scrollSubscription);
            }
          }
      ));
    }
      this.status = "timeout";
      this.searchTimeout = setTimeout(() => {
        this.status = "fetching";
        this.clearDataContainer();
        this.dataContainer.append(this.loaderNode);
        dataGetterFunc().catch(e => processError).finally(() => this.status = "finished");
      }, SEARCH_DELAY);
  }

  /**
   * Clears container with dynamically loaded data.
   *
   * @return {void}
   */
  private clearDataContainer() {
    this.dataContainer.innerHTML = "";
  }
}
