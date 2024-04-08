export function initBuffers(gl: WebGLRenderingContext) {
    return {
        position: initPosBuffer(gl),
        color: initColorBuffer(gl),
    };
}

function initPosBuffer(gl: WebGLRenderingContext): WebGLBuffer {
    // let positions = [
    //     // left column front
    //     0,   0,  0,
    //     30,   0,  0,
    //     0, 150,  0,
    //     0, 150,  0,
    //     30,   0,  0,
    //     30, 150,  0,
    //
    //     // top rung front
    //     30,   0,  0,
    //     100,   0,  0,
    //     30,  30,  0,
    //     30,  30,  0,
    //     100,   0,  0,
    //     100,  30,  0,
    //
    //     // middle rung front
    //     30,  60,  0,
    //     67,  60,  0,
    //     30,  90,  0,
    //     30,  90,  0,
    //     67,  60,  0,
    //     67,  90,  0,
    //
    //     // left column back
    //     0,   0,  30,
    //     30,   0,  30,
    //     0, 150,  30,
    //     0, 150,  30,
    //     30,   0,  30,
    //     30, 150,  30,
    //
    //     // top rung back
    //     30,   0,  30,
    //     100,   0,  30,
    //     30,  30,  30,
    //     30,  30,  30,
    //     100,   0,  30,
    //     100,  30,  30,
    //
    //     // middle rung back
    //     30,  60,  30,
    //     67,  60,  30,
    //     30,  90,  30,
    //     30,  90,  30,
    //     67,  60,  30,
    //     67,  90,  30,
    //
    //     // top
    //     0,   0,   0,
    //     100,   0,   0,
    //     100,   0,  30,
    //     0,   0,   0,
    //     100,   0,  30,
    //     0,   0,  30,
    //
    //     // top rung right
    //     100,   0,   0,
    //     100,  30,   0,
    //     100,  30,  30,
    //     100,   0,   0,
    //     100,  30,  30,
    //     100,   0,  30,
    //
    //     // under top rung
    //     30,   30,   0,
    //     30,   30,  30,
    //     100,  30,  30,
    //     30,   30,   0,
    //     100,  30,  30,
    //     100,  30,   0,
    //
    //     // between top rung and middle
    //     30,   30,   0,
    //     30,   30,  30,
    //     30,   60,  30,
    //     30,   30,   0,
    //     30,   60,  30,
    //     30,   60,   0,
    //
    //     // top of middle rung
    //     30,   60,   0,
    //     30,   60,  30,
    //     67,   60,  30,
    //     30,   60,   0,
    //     67,   60,  30,
    //     67,   60,   0,
    //
    //     // right of middle rung
    //     67,   60,   0,
    //     67,   60,  30,
    //     67,   90,  30,
    //     67,   60,   0,
    //     67,   90,  30,
    //     67,   90,   0,
    //
    //     // bottom of middle rung.
    //     30,   90,   0,
    //     30,   90,  30,
    //     67,   90,  30,
    //     30,   90,   0,
    //     67,   90,  30,
    //     67,   90,   0,
    //
    //     // right of bottom
    //     30,   90,   0,
    //     30,   90,  30,
    //     30,  150,  30,
    //     30,   90,   0,
    //     30,  150,  30,
    //     30,  150,   0,
    //
    //     // bottom
    //     0,   150,   0,
    //     0,   150,  30,
    //     30,  150,  30,
    //     0,   150,   0,
    //     30,  150,  30,
    //     30,  150,   0,
    //
    //     // left side
    //     0,   0,   0,
    //     0,   0,  30,
    //     0, 150,  30,
    //     0,   0,   0,
    //     0, 150,  30,
    //     0, 150,   0
    // ];

    const positions = [
        0, 0, 1,
        0, 50, 1,
        50, 50, 1,
        50, 50, 1,
        0, 0, 1,
        50, 50, 1,
        0, 0, -1,
        0, 50, -1,
        50, 50, -1,
        50, 50, -1,
        0, 0, -1,
        50, 50, -1,
    ];

    const posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    return posBuffer;
}

function initColorBuffer(gl: WebGLRenderingContext): WebGLBuffer {
    const colors = new Array(4 * 4).fill(1).map((_, i) => ((i + 1) % 4 === 0 ? 1 : Math.random()));

    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    return colorBuffer;
}
