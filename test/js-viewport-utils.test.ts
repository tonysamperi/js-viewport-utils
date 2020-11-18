import {JSDOM} from "jsdom";
import {inViewport, JsViewportSides} from "../src/js-viewport-utils";

const dom = new JSDOM();
(global as any).document = dom.window.document;
(global as any).window = dom.window;

const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Test</title>
  </head>
  <body>
    <main id="viewport" style="overflow: visible; border: 2px dashed #BBB; padding: 16px; position: relative">
    <h2 style="margin: 0; color: #BBB">Viewport</h2>
        <div id="blue_square" style="width: 100px; height: 100px; background: blue;"></div>
        <div id="red_square" style="width: 100px; height: 100px; background: red; position: absolute; bottom: -150px"></div>
        <div id="green_square"
             style="width: 100px; height: 100px; background: green; position: absolute; left: calc(100% - 100px); bottom: -50px"></div>
    </main>
  </body>
</html>`;
document.body.innerHTML = html;

describe("js-viewport-utils test", () => {

    afterEach(() => {
        // console.info("CLEANING UP...");
        (global as any).window = void 0;
        // (global as any).document = void 0;
    });

    it("should return true (inViewport)", () => {
        const $viewport = document.getElementById("viewport") as HTMLElement;
        expect(inViewport(document.getElementById("blue_square") as HTMLElement, {container: $viewport})).toBeTruthy();
    });

    it("should return true (inViewport bottom)", () => {
        const $viewport = document.getElementById("viewport") as HTMLElement;
        const opts = {
            container: $viewport,
            sides: [JsViewportSides.BOTTOM]
        };

        expect(inViewport(document.getElementById("blue_square") as HTMLElement, opts)).toBeTruthy();
    });

    it("should return false (inViewport)", () => {
        const $viewport = document.getElementById("viewport") as HTMLElement;

        expect(inViewport(document.getElementById("red_square") as HTMLElement, {container: $viewport})).toBeTruthy();
    });

    it("should return false (inViewport)", () => {
        const $viewport = document.getElementById("viewport") as HTMLElement;

        expect(inViewport(document.getElementById("green_square") as HTMLElement, {container: $viewport})).toBeTruthy();
    });

});
