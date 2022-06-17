import {useEffect, useRef, useState} from "react";
import {LOAD_SCROLL_DELTA} from "../../consts";
import {IItemLoader, IItemLoaderState} from "./Interfaces";
import {LOADING_DELAY} from "./consts";
import {processError} from "../../../components/helpers";

/**
 * Universal item loader components for sections.
 *
 * @param {IItemLoader<T>} props ItemLoader config to display.
 * @return {JSX.Element} JSX element of ItemLoader.
 */
export default function ItemLoader<T>({Section, props, initialItemCount, extraItemCount, itemLoader}: IItemLoader<T>) {
    const [loaderState, setLoaderState] = useState<IItemLoaderState<T>>({items: [], hasMore: true});
    const loadingRef = useRef<Promise<T[]> | undefined>();
    const abortRef = useRef<AbortController>(new AbortController());
    const loadingTimeout = useRef<ReturnType<typeof setTimeout>>();

    /**
     * Scroll event handler to load additional items.
     *
     * @param {Event} e Scroll event.
     * @return {void}
     */
    function handleScroll(e: Event) {
        const target = e.target as HTMLElement;
        const scrollDelta = target.scrollHeight - (target.scrollTop + target.clientHeight);
        if (!loadingRef.current && scrollDelta <= LOAD_SCROLL_DELTA) {
            loadingRef.current = itemLoader(
              extraItemCount as number,
              (loaderState.items as T[]).length,
              abortRef.current.signal
            );
            loadingRef.current.then((data) => {
                setLoaderState({
                  items: [...(loaderState.items as T[]), ...data],
                  hasMore: data?.length === extraItemCount,
                });
                loadingRef.current = undefined;
            });
        }
    }

    /**
     * Subscribe/unsubscribe to scroll event on items change.
     *
     * @return {void}
     */
    useEffect(() => {
        const target = document.querySelector(".simplebar-content-wrapper") as HTMLElement;

        if (extraItemCount && loaderState.hasMore) {
            target.addEventListener("scroll", handleScroll);
        }
        return () => {
            if (extraItemCount && loaderState.hasMore) {
                target.removeEventListener("scroll", handleScroll);
            }
        };
    }, [loaderState.items]);

    /**
     * Initiate init on parent rendered.
     *
     * @return {void}
     */
    useEffect(() => {
        /**
         * Item load / previous promise abort mechanism.
         *
         * @return {void}
         */
        function initLoading() {
            if (loadingRef.current) {
                abortRef.current.abort();
                abortRef.current = new AbortController();
                loadingRef.current = undefined;
            }
            setLoaderState({ items: [], hasMore: true });
            if (initialItemCount > 0) {
                loadingRef.current = itemLoader(initialItemCount, 0, abortRef.current.signal);
                loadingRef.current?.then((data) => {
                    loadingRef.current = undefined;
                    setLoaderState({ items: data, hasMore: !!extraItemCount && data.length === initialItemCount });
                }).catch(e => {
                    processError(e);
                    switch (e.name) {
                        case "AbortError":
                            break;
                        default:
                            setLoaderState({ items: null, hasMore: false });
                            break;
                    }
                });
            }
            loadingTimeout.current = undefined;
        }

        if(loadingTimeout.current) {
          clearTimeout(loadingTimeout.current);
          loadingTimeout.current = undefined;
        }

        loadingTimeout.current = setTimeout(initLoading, LOADING_DELAY);
    }, [props]);
    
    return <Section {...props} items={loaderState.items} withMore={loaderState.hasMore} />;
}