import {createShader} from "./createShader";
import vertShGl from "../glsl/vertSh.glsl";
import fragShGl from "../glsl/fragSh.glsl";
import {createProgram} from "./createProgram";
import {initBuffers} from "./initBuffers";
import {m3} from "./utils/m3";

export class App {
    constructor(gl) {
        this.gl = gl;

        this.ext = gl.getExtension("WEBGL_debug_shaders")

        this.translation = {
            x: 0,
            y: 0
        }

        this.scale = {
            x: 1,
            y: 1
        }

        this.angle = 0

        this.vertSh = createShader(gl, gl.VERTEX_SHADER, vertShGl);
        let fragSh = createShader(gl, gl.FRAGMENT_SHADER, fragShGl);

        this.program = createProgram(gl, this.vertSh, fragSh)

        this.buffers = initBuffers(gl)

        this.locations = {
            color: gl.getAttribLocation(this.program, "a_color"),
            position: gl.getAttribLocation(this.program, "a_position"),
            resolution: gl.getUniformLocation(this.program, "u_resolution"),
            matrix: gl.getUniformLocation(this.program, "u_matrix")
        }

        this.draw()
    }

    draw() {
        this.gl.useProgram(this.program);

        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);

        this.gl.clearColor(0, 1, 0, 0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        this.gl.uniform2f(this.locations.resolution, this.gl.canvas.width, this.gl.canvas.height);

        this.setAttr(2, this.locations.position, this.buffers.position)
        this.setAttr(4, this.locations.color, this.buffers.color)

        this.setMatrix()

        let primitiveType = this.gl.TRIANGLE_FAN;
        let offset = 0;
        let count = 4;

        this.gl.drawArrays(primitiveType, offset, count);
        this.ext.getTranslatedShaderSource(this.vertSh)
    }

    setAttr(size, attrLoc, buffer) {
        let type = this.gl.FLOAT;
        let normalize = false;
        let stride = 0;
        let offset = 0;

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
        this.gl.vertexAttribPointer(attrLoc, size, type, normalize, stride, offset);
        this.gl.enableVertexAttribArray(attrLoc);
    }

    setMatrix() {
        let translationMatrix = m3.translation(this.translation.x, this.translation.y);
        let rotationMatrix = m3.rotation(this.angle);
        let scaleMatrix = m3.scaling(this.scale.x, this.scale.y);

        let matrix = m3.multiply(translationMatrix, rotationMatrix);
        matrix = m3.multiply(matrix, scaleMatrix);

        this.gl.uniformMatrix3fv(this.locations.matrix, false, matrix);
    }

    setTranslation({x, y}) {
        this.translation = {
            x: x ?? this.translation.x,
            y: y ?? this.translation.y
        }
    }

    setScale({x, y}) {
        this.scale = {
            x: x ?? this.scale.x,
            y: y ?? this.scale.y
        }
    }

    setAngle(rad) {
        this.angle = rad
    }
}