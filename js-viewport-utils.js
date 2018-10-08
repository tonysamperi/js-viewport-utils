/**
 * Viewport Utils
 *
 * @description A set of viewport utils
 * @author      Tony Samperi, tonysamperi.github.io
 * @version     1.0.0
 * @date        2018-10-08
 */
(function (root, name, factory) {
    // AMD
    if (typeof define === "function" && define.amd) {
        define([], factory);
    }
    // Node and CommonJS-like environments
    else if (typeof module !== "undefined" && typeof exports === "object") {
        module.exports = factory();
    }
    // Browser global
    else {
        root[name] = factory();
    }
}(this, "viewportUtils", function () {

    var canUseWindowDimensions = typeof window !== "undefined" && window.innerHeight !== undefined; // IE 8 and lower fail this

    var viewportUtils = {
        /**
         * Determines whether an element is within the viewport
         * @param  {Object}  elem       DOM Element (required)
         * @param  {Object}  options    Optional settings
         * @return {Boolean}            Whether the element was completely within the viewport
         */
        inViewport: function (elem, options) {

            var config = {};
            var containerScrollTop;
            var containerScrollLeft;
            var i;
            var isWindow;
            var scrollBarWidths = [0, 0];
            var settings;
            var sidesRegex = /^top$|^right$|^bottom$|^left$|^all$/;

            // Handle jQuery
            if (typeof jQuery !== "undefined" && elem instanceof jQuery) {
                elem = elem.get(0);
            }

            if (typeof elem !== 'object' || elem.nodeType !== 1) {
                throw new Error('First argument must be an element');
            }

            settings = options || {};

            // Build configuration from defaults and user-provided settings and metadata
            config.container = settings.container || typeof document !== 'undefined' ? document.body : window;
            config.sides = settings.sides || 'all';
            config.top = settings.top || 0;
            config.right = settings.right || 0;
            config.bottom = settings.bottom || 0;
            config.left = settings.left || 0;

            // Extract the DOM node from a jQuery collection
            if (typeof jQuery !== 'undefined' && config.container instanceof jQuery) {
                config.container = config.container.get(0);
            }

            // Use the window as the container if the user specified the body or a non-element
            if (config.container === document.body || config.container.nodeType !== 1) {
                config.container = window;
            }

            // Get the element's bounding rectangle with respect to the viewport
            elemBoundingRect = elem.getBoundingClientRect();

            isWindow = (config.container === window);

            isSideIn = {
                top: function () {
                    if (isWindow) {
                        return (elemBoundingRect.top >= config.top);
                    }
                    else {
                        return (elemBoundingRect.top >= containerScrollTop - (containerScrollTop - containerBoundingRect.top) + config.top);
                    }
                },
                right: function () {
                    if (isWindow) {
                        return (elemBoundingRect.right <= (containerBoundingRect.right + containerScrollLeft) - config.right);
                    }
                    else {
                        return (elemBoundingRect.right <= containerBoundingRect.right - scrollBarWidths[0] - config.right);
                    }
                },
                bottom: function () {
                    var containerHeight = 0;

                    if (isWindow) {
                        if (canUseWindowDimensions) {
                            containerHeight = config.container.innerHeight;
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
                left: function () {
                    if (isWindow) {
                        return (elemBoundingRect.left >= config.left);
                    }
                    else {
                        return (elemBoundingRect.left >= containerScrollLeft - (containerScrollLeft - containerBoundingRect.left) + config.left);
                    }
                },

                // Element is within all four boundaries
                all: function () {
                    return (isSideIn.top() && isSideIn.bottom() && isSideIn.left() && isSideIn.right());
                }
            };


            // Get viewport dimensions and offsets
            if (isWindow) {
                containerBoundingRect = document.documentElement.getBoundingClientRect();
                containerScrollTop = document.body.scrollTop;
                containerScrollLeft = window.scrollX || document.body.scrollLeft;
            }
            else {
                containerBoundingRect = config.container.getBoundingClientRect();
                containerScrollTop = config.container.scrollTop;
                containerScrollLeft = config.container.scrollLeft;
            }

            if (containerScrollLeft) {
                scrollBarWidths[0] = 18;
            }

            if (containerScrollTop) {
                scrollBarWidths[1] = 16;
            }


            // Loop through all of the sides
            sides = config.sides.split(" ");
            i = sides.length;

            while (i--) {
                side = sides[i].toLowerCase();
                // Test the element against each side of the viewport that was requested
                if (sidesRegex.test(side)) {
                    if (isSideIn[side]()) {
                        result = true;
                    }
                    else {
                        result = false;
                        break;
                    }
                }
            }

            return result;
        }
    };

    viewportUtils.inViewport.prototype.top = function (element) {
        return viewportUtils.inViewport(element, {sides: 'top'});
    };

    viewportUtils.inViewport.prototype.right = function (element) {
        return viewportUtils.inViewport(element, {sides: 'right'});
    };

    viewportUtils.inViewport.prototype.bottom = function (element) {
        return viewportUtils.inViewport(element, {sides: 'bottom'});
    };

    viewportUtils.inViewport.prototype.left = function (element) {
        return viewportUtils.inViewport(element, {sides: 'left'});
    };

    return viewportUtils;
}));
