/**
 * Viewport Utils
 *
 * @description A set of viewport utils
 * @author      Tony Samperi, tonysamperi.github.io
 * @version     2.0.0
 * @date        2019-10-03
 */

import {
    JsViewportSettings,
    JsViewportSides,
    JsViewportConfig,
    JsViewportSidesRef,
    jsViewportDefaults
} from "./js-viewport-utils.model";

export * from "./js-viewport-utils.model";

const jsViewportUtils = (function () {

    // IE 8 and lower fail this
    const canUseWindowDimensions: boolean = typeof window !== "undefined" && window.innerHeight !== undefined;

    const viewportUtils = {
        /**
         * Determines whether an element is within the viewport
         * @param  {HTMLElement|JQuery<HTMLElement>}  elem       DOM Element (required)
         * @param  {JsViewportSettings}  options    Optional settings
         * @return {Boolean}            Whether the element was completely within the viewport
         */
        inViewport: function (elem: HTMLElement | JQuery<HTMLElement>, options?: JsViewportSettings) {

            if (!elem || typeof elem !== "object" || (elem as HTMLElement).nodeType !== 1) {
                throw new Error("First argument must be an element!");
            }

            let containerBoundingRect: ClientRect | DOMRect;
            let containerScrollTop: number;
            let containerScrollLeft: number;
            let elemBoundingRect: ClientRect | DOMRect;
            let isWindow: boolean;
            const scrollBarWidths = [0, 0];
            const sidesRegex = /^TOP$|^RIGHT$|^BOTTOM$|^LEFT$|^ALL$/;
            // TMP VARS
            let i: number;
            let result: boolean = !1;

            // Handle jQuery
            if (typeof jQuery !== "undefined") {
                if ((elem as JQuery).jquery) {
                    elem = (elem as JQuery).get(0);
                }
                // Extract the DOM node from a jQuery collection
                if (!!options && !!options.container && (options.container as JQuery).jquery) {
                    options.container = (options.container as JQuery).get(0) as HTMLElement;
                }
            }

            // Build configuration from defaults and user-provided settings and metadata
            const config: JsViewportConfig = {
                ...jsViewportDefaults,
                ...options
            } as JsViewportConfig;

            // Use the window as the container if the user specified the body or a non-element
            if (config.container === document.body || (config.container as HTMLElement).nodeType !== 1) {
                config.container = window;
            }

            // Get the element's bounding rectangle with respect to the viewport
            elemBoundingRect = (elem as HTMLElement).getBoundingClientRect();

            isWindow = (config.container === window);

            const isSideIn: JsViewportSidesRef<() => boolean> = {
                [JsViewportSides.TOP]: function () {
                    if (isWindow) {
                        return (elemBoundingRect.top >= config.top);
                    }
                    else {
                        return (elemBoundingRect.top >= containerScrollTop - (containerScrollTop - containerBoundingRect.top) + config.top);
                    }
                },
                [JsViewportSides.RIGHT]: function () {
                    if (isWindow) {
                        return (elemBoundingRect.right <= (containerBoundingRect.right + containerScrollLeft) - config.right);
                    }
                    else {
                        return (elemBoundingRect.right <= containerBoundingRect.right - scrollBarWidths[0] - config.right);
                    }
                },
                [JsViewportSides.BOTTOM]: function () {
                    let containerHeight = 0;

                    if (isWindow) {
                        if (canUseWindowDimensions) {
                            containerHeight = (config.container as Window).innerHeight;
                        }
                        else if (document && document.documentElement) {
                            containerHeight = document.documentElement.clientHeight;
                        }
                    }
                    else {
                        containerHeight = containerBoundingRect.bottom;
                    }

                    return (elemBoundingRect.bottom <= containerHeight - scrollBarWidths[1] - config.bottom);
                },
                [JsViewportSides.LEFT]: function () {
                    if (isWindow) {
                        return (elemBoundingRect.left >= config.left);
                    }
                    else {
                        return (elemBoundingRect.left >= containerScrollLeft - (containerScrollLeft - containerBoundingRect.left) + config.left);
                    }
                },

                // Element is within all four boundaries
                [JsViewportSides.ALL]: function () {
                    return (isSideIn.TOP() && isSideIn.BOTTOM() && isSideIn.LEFT() && isSideIn.RIGHT());
                }
            };


            // Get viewport dimensions and offsets
            if (isWindow) {
                containerBoundingRect = document.documentElement.getBoundingClientRect();
                containerScrollTop = document.body.scrollTop;
                containerScrollLeft = window.scrollX || document.body.scrollLeft;
            }
            else {
                containerBoundingRect = (config.container as HTMLElement).getBoundingClientRect();
                containerScrollTop = (config.container as HTMLElement).scrollTop;
                containerScrollLeft = (config.container as HTMLElement).scrollLeft;
            }

            if (containerScrollLeft) {
                scrollBarWidths[0] = 18;
            }

            if (containerScrollTop) {
                scrollBarWidths[1] = 16;
            }


            // Loop through all of the sides
            const sides = config.sides as JsViewportSides[];
            i = sides.length;

            while (i--) {
                // Test the element against each side of the viewport that was requested
                if (sidesRegex.test(sides[i])) {
                    if (isSideIn[sides[i]]()) {
                        result = !0;
                    }
                    else {
                        result = !1;
                        break;
                    }
                }
            }

            return result;
        },
        inViewportTop: function (element: HTMLElement | JQuery<HTMLElement>) {
            return viewportUtils.inViewport(element, {sides: [JsViewportSides.TOP]});
        },
        inViewportRight: function (element: HTMLElement | JQuery<HTMLElement>) {
            return viewportUtils.inViewport(element, {sides: [JsViewportSides.RIGHT]});
        },
        inViewportBottom: function (element: HTMLElement | JQuery<HTMLElement>) {
            return viewportUtils.inViewport(element, {sides: [JsViewportSides.BOTTOM]});
        },
        inViewportLeft: function (element: HTMLElement | JQuery<HTMLElement>) {
            return viewportUtils.inViewport(element, {sides: [JsViewportSides.LEFT]});
        }
    };

    return viewportUtils;
})();

export const inViewport = jsViewportUtils.inViewport;
export const inViewportTop = jsViewportUtils.inViewportTop;
export const inViewportRight = jsViewportUtils.inViewportRight;
export const inViewportBottom = jsViewportUtils.inViewportBottom;
export const inViewportLeft = jsViewportUtils.inViewportLeft;
