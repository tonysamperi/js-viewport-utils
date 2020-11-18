(function () {
    const $test1 = document.getElementById("test1");
    const $test2 = document.getElementById("test2");
    const $test3 = document.getElementById("test3");
    const $test4 = document.getElementById("test4");
    const $viewport = document.getElementById("viewport");
//
    $test1.innerHTML = jsViewportUtils.inViewport(document.getElementById("blue_square"), {container: $viewport}) ? "YES" : "NO";
    $test2.innerHTML = jsViewportUtils.inViewportBottom(document.getElementById("blue_square"), {container: $viewport}) ? "YES" : "NO";
    $test3.innerHTML = jsViewportUtils.inViewport(document.getElementById("red_square"), {container: $viewport}) ? "YES" : "NO";
    $test4.innerHTML = jsViewportUtils.inViewport(document.getElementById("green_square"), {container: $viewport}) ? "YES" : "NO";
})();
