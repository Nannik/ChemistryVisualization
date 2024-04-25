import { AppLocations } from './App';

export default class Scene {
    gl: WebGLRenderingContext;

    locations: AppLocations;

    constructor(gl: WebGLRenderingContext, locations: AppLocations) {
        this.gl = gl;
        this.locations = locations;
    }

    drawArrays(
        positionBuffer: WebGLBuffer,
        colorBuffer: WebGLBuffer,
        matrix: number[],
        offset: GLint,
        count: GLsizei,
    ) {
        this.setAttr(3, this.gl.FLOAT, false, this.locations.position, positionBuffer);
        this.setAttr(4, this.gl.FLOAT, false, this.locations.color, colorBuffer);
        this.gl.uniformMatrix4fv(this.locations.matrix, false, matrix);

        const mode = this.gl.TRIANGLES;
        this.gl.drawArrays(mode, offset, count);
    }

    private setAttr(size: number, type: GLenum, normalize: boolean, attrLoc: GLuint, buffer: WebGLBuffer) {
        const stride = 0;
        const offset = 0;

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
        this.gl.vertexAttribPointer(attrLoc, size, type, normalize, stride, offset);
        this.gl.enableVertexAttribArray(attrLoc);
    }

    initBuffer(data: AllowSharedBufferSource | null) {
        const posBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, posBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, data, this.gl.STATIC_DRAW);

        return posBuffer;
    }
}
