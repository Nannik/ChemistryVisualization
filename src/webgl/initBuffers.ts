export function initBuffers(gl: WebGLRenderingContext) {
    return {
        position: initPosBuffer(gl),
        color: initColorBuffer(gl),
    };
}

function initPosBuffer(gl: WebGLRenderingContext): WebGLBuffer {
    const positions = [
        0, 0, 0,
        0, 50, 0,
        50, 50, 0,
        50, 50, 0,
        0, 0, 0,
        50, 50, 0,
        0, 0, 10,
        0, 50, 10,
        50, 50, 10,
        50, 50, 10,
        0, 0, 10,
        50, 50, 10,
    ];

    const posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    return posBuffer;
}

function initColorBuffer(gl: WebGLRenderingContext): WebGLBuffer {
    const colors = new Array(12 * 4).fill(1).map((_, i) => ((i + 1) % 4 === 0 ? 1 : Math.random()));

    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    return colorBuffer;
}
