import { IFilterValue } from "./Components/Filter/Interfaces";
import { DEFAULT_SEARCH_CONDITIONS } from "./consts";

/**
 * Query string getter based on search string and filter values.
 *
 * @param {string} searchString String from search field.
 * @param {IFilterValue[]} selectedValues Selected filter values.
 * @param {string} sortField Selected sort field.
 * @param {number} limit Item count to load.
 * @param {number} offset Loading offset (for pagination).
 * @return {string} Query string.
 */
export function getQueryString(
  searchString: string,
  selectedValues: IFilterValue[],
  sortField: string,
  limit: number,
  offset: number
) {
  const conditions = [
    ...DEFAULT_SEARCH_CONDITIONS,
    ...selectedValues
      .filter((elem) => elem.selectedIds.length)
      .map((elem) => `${elem.id} = [${elem.selectedIds.join(", ")}]`),
  ];
  if (searchString) {
    conditions.push(`name ~ *"${searchString}"*`);
  }
  const parameters: string[] = [
    `where ${conditions.join(" & ")}`,
    `limit ${limit}`,
    `offset ${offset}`,
    `sort ${sortField} desc`,
  ];
  return parameters.join("; ")+";";
}
