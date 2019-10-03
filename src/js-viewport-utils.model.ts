// RAW
export interface JsViewportSettings {
    container?: Window | HTMLElement | JQuery;
    sides: JsViewportSides[];
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
}

// FILTERED
export interface JsViewportConfig {
    container: HTMLElement | Window;
    sides: JsViewportSides[];
    top: number;
    right: number;
    bottom: number;
    left: number;
}

export enum JsViewportSides {
    ALL = "ALL",
    TOP = "TOP",
    RIGHT = "RIGHT",
    BOTTOM = "BOTTOM",
    LEFT = "LEFT"
}

export type JsViewportSidesRef<T = any> = { [key in keyof typeof JsViewportSides]: T };

export const jsViewportDefaults: JsViewportConfig = {
    container: typeof document !== "undefined" ? document.body : window,
    sides: [JsViewportSides.ALL],
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
};
