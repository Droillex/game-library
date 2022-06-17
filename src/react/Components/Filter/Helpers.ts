/**
 * Immutably get new selected dropdown values.
 *
 * @param {string[]} subarray Array of currently selected values.
 * @param {string} itemId New selected item id.
 * @param {boolean} state Is item being checked or unchecked.
 * @return {string[]} Values after applying changes .
 */
export function getChangedValues(subarray: string[], itemId: string, state: boolean) {
    let newValues = [...subarray];
    if (!state) {
        newValues = newValues.filter((item) => item !== itemId);
    } else {
        newValues.push(itemId);
    }
    return newValues;
}