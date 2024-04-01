export function initBuffers(gl) {
    return {
        position: initPosBuffer(gl),
        color: initColorBuffer(gl)
    }
}

function initPosBuffer(gl) {
    let positions = [
        0, 0, 1,
        0, 20, 1,
        40, 20, 1,
        40, 0, 1
    ];

    let posBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    return posBuffer
}

function initColorBuffer(gl) {
    let colors = new Array(4 * 4).fill(1).map((_, i) => {
        return (i + 1) % 4 === 0 ? 1 : Math.random()
    });

    let colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    return colorBuffer;
}