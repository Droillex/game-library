import {IPopupPosition} from "./Interfaces";

/**
 * Calculated popup window anchor point.
 *
 * @param {HTMLDivElement} containerDiv Container div element to display game popup in.
 * @param {number} popupWidth Popup width constant.
 * @param {number} popupHeight Popup height constant.
 * @return {IPopupPosition} Anchor point config.
 */
export function calculatePopupPosition(containerDiv: HTMLDivElement, popupWidth?: number, popupHeight?: number): IPopupPosition {
    const opener = containerDiv.children[containerDiv.children.length - 1];
    const { width: openerWidth, left, top } = opener?.getBoundingClientRect() || { width: 0, left: 0, top: 0 };
    const { width, height } = containerDiv.children.length > 1 ? containerDiv.children[0].getBoundingClientRect()
        : { width: 0, height: 0 };
    const horizontal = left + openerWidth + (popupWidth || width) > window.outerWidth ? "right" : "left";
    const vertical = top + (popupHeight || height) > window.outerHeight ? "bottom" : "top";
    return {horizontal, vertical};
}