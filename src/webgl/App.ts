import vertShGl from '../glsl/vertSh.glsl';
import fragShGl from '../glsl/fragSh.glsl';
import { createShader } from './createShader';
import { createProgram } from './createProgram';
import { initBuffers } from './initBuffers';
import { m4 } from './utils/m4';
import Vector3 from './utils/vector3';

type AppBuffersType = {
    position: WebGLBuffer
    color: WebGLBuffer
}

type AppLocationsType = {
    color: GLint
    position: GLint
    resolution: WebGLUniformLocation
    matrix: WebGLUniformLocation
}

export class App {
    gl: WebGLRenderingContext;

    // eslint-disable-next-line camelcase
    ext: WEBGL_debug_shaders;

    angle: number;

    fragSh: WebGLShader;

    vertSh: WebGLShader;

    program: WebGLProgram;

    buffers: AppBuffersType;

    locations: AppLocationsType;

    constructor(gl: WebGLRenderingContext) {
        this.gl = gl;

        this.gl.enable(this.gl.CULL_FACE);
        this.gl.enable(this.gl.DEPTH_TEST);

        this.angle = 0;

        this.vertSh = createShader(gl, gl.VERTEX_SHADER, vertShGl);
        this.fragSh = createShader(gl, gl.FRAGMENT_SHADER, fragShGl);

        this.program = createProgram(gl, this.vertSh, this.fragSh);

        this.buffers = initBuffers(gl);

        this.locations = {
            color: gl.getAttribLocation(this.program, 'a_color'),
            position: gl.getAttribLocation(this.program, 'a_position'),
            resolution: gl.getUniformLocation(this.program, 'u_resolution'),
            matrix: gl.getUniformLocation(this.program, 'u_matrix'),
        };

        this.draw();
    }

    draw() {
        this.ext = this.gl.getExtension('WEBGL_debug_shaders');

        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);

        // this.gl.clearColor(0, 0, 0, 0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        this.gl.useProgram(this.program);

        this.setAttr(3, this.gl.FLOAT, false, this.locations.position, this.buffers.position);
        this.setAttr(3, this.gl.UNSIGNED_BYTE, true, this.locations.color, this.buffers.color);

        const radius = 200;
        const viewProjectionMatrix = this.getViewProjectionMatrix(radius);
        this.drawElements(5, radius, viewProjectionMatrix);
    }

    drawElements(countElements: number, radius: number, viewProjectionMatrix: number[]) {
        for (let i = 0; i < countElements; i++) {
            const angle = (i * Math.PI * 2) / countElements;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            const matrix = m4.translate(viewProjectionMatrix, x, 0, y);
            this.gl.uniformMatrix4fv(this.locations.matrix, false, matrix);

            const primitiveType = this.gl.TRIANGLES;
            const offset = 0;
            const count = 16 * 6;

            this.gl.drawArrays(primitiveType, offset, count);
        }
    }

    setAttr(size: number, type: GLenum, normalize: boolean, attrLoc: GLuint, buffer: WebGLBuffer) {
        const stride = 0;
        const offset = 0;

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
        this.gl.vertexAttribPointer(attrLoc, size, type, normalize, stride, offset);
        this.gl.enableVertexAttribArray(attrLoc);
    }

    getViewProjectionMatrix(radius: number) {
        let cameraPositionMatrix = m4.yRotation(this.angle);
        cameraPositionMatrix = m4.translate(cameraPositionMatrix, 0, 0, radius * 1.5);

        const cameraMatrix = m4.lookAt(
            new Vector3(cameraPositionMatrix[12], cameraPositionMatrix[13], cameraPositionMatrix[14]),
            new Vector3(radius, 0, 0),
            new Vector3(0, 1, 0),
        );
        const viewMatrix = m4.inverse(cameraMatrix);

        const fieldOfViewRad = 150 * (Math.PI / 180);
        const aspect = this.gl.canvas.width / this.gl.canvas.height;
        const zNear = 1;
        const zFar = 2000;
        return m4.multiply(m4.perspective(fieldOfViewRad, aspect, zNear, zFar), viewMatrix);
    }

    setAngle(angle: number) {
        this.angle = (angle * Math.PI) / 360;
    }
}
