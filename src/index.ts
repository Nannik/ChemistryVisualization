import { main } from "./webgl/main";

import './style.scss'

window.onload = () => {
    let canvas = document.getElementById("glcanvas") as HTMLCanvasElement;

    let gl = initWebGL(canvas);

    if (gl) {
        main(gl)
    }
}

function initWebGL(canvas: HTMLCanvasElement): WebGLRenderingContext {
    let gl = null;

    try {
        gl = canvas.getContext("webgl");
    } catch (e) {}

    if (!gl) {
        alert("Unable to initialize WebGL. Your browser may not support it.");
        gl = null;
    }

    return gl;
}
