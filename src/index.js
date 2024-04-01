import { main } from "./webgl/main";

import './style.scss'

let gl

window.onload = () => {
    let canvas = document.getElementById("glcanvas");

    gl = initWebGL(canvas);

    if (gl) {
        main(gl)
    }
}

function initWebGL(canvas) {
    gl = null;

    try {
        gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    } catch (e) {}

    if (!gl) {
        alert("Unable to initialize WebGL. Your browser may not support it.");
        gl = null;
    }

    return gl;
}
