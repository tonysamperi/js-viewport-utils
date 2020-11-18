# JS Viewport Utils 2.0.2

Includes:

- A standalone, plain JavaScript object, `viewportUtils`
- AMD and Node/CommonJS support
- Optional jQuery plugin with handy selectors and shorthand methods

## Installation

### AMD, Node.js, CommonJS

#### [NPM](https://www.npmjs.com/package/js-viewport-utils)

`npm install js-viewport-utils`

And then:

`var viewportUtils = require('js-viewport-utils');`

#### Bower:

`bower install js-viewport-utils`

### Traditional include

```js
<script src="path-to/js-viewport-utils.js"></script>
```

jQuery plugin:

```js
<script src="path-to/js-viewport-utils.js"></script>
<script src="jquery.js"></script>
```

### In Angular projects / Typescript / ES6
```ts
import {inViewport, inViewportBottom} from "js-viewport-utils";
```

## Usage

### Basic, with optional settings

```js
var foo = document.getElementById("foo");
viewportUtils.inViewport(foo, {sides: "left"});
```

Sides can be passed as unique string with spaces

```js
var options = {sides: "top right left bottom"}
```

###Use another element as viewport

```js
var bar = document.getElementById("bar");
viewportUtils.inViewport(elem, {container: bar});
```

###Custom thresholds

```js
viewportUtils.inViewport(elem, {top: 12, right: 12});
```

For more options, see [Settings](#settings) section below.

### Shorthand notation

```js
viewportUtils.inViewportLeft(elem);
viewportUtils.inViewportTop(elem);
```

These will check for the matching side, with default settings

## Browser Support

- IE 8+
- All the others except Opera Mini
    + Tested in the latest stable Chrome, Firefox, Safari, and IE
    + No "new" JavaScript or quirky techniques are employed so it should work in all other modern browsers not specifically mentioned above

## License

MIT © [Tony Samperi](mailto:github@tonysamperi.it)

This library is free, open source, and GPL friendly. You can use it for
commercial projects, open source projects, or really almost whatever you want.

Attribution is required by MIT, SIL OLF, and CC BY licenses. Downloaded files already
contain embedded comments with sufficient
attribution, so you shouldn't need to do anything additional when using these
files normally.

## Author

Tony Samperi, [tonysamperi.github.io](https://tonysamperi.github.io/)
