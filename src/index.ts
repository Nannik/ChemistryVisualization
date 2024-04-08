import { main } from './webgl/main';

import './style.scss';

function initWebGL(canvas: HTMLCanvasElement): WebGLRenderingContext {
    let gl = null;

    try {
        gl = canvas.getContext('webgl');
    } catch (e) {
        console.error(e);
    }

    if (!gl) {
        // eslint-disable-next-line no-alert
        alert('Unable to initialize WebGL. Your browser may not support it.');
        gl = null;
    }

    return gl;
}

window.onload = () => {
    const canvas = document.getElementById('glcanvas') as HTMLCanvasElement;

    const gl = initWebGL(canvas);

    if (gl) {
        main(gl);
    }
};
