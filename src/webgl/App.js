import {createShader} from "./createShader";
import vertShGl from "../glsl/vertSh.glsl";
import fragShGl from "../glsl/fragSh.glsl";
import {createProgram} from "./createProgram";
import {initBuffers} from "./initBuffers";
import {m4} from "./utils/m4";

export class App {
    constructor(gl) {
        this.gl = gl;

        this.ext = gl.getExtension("WEBGL_debug_shaders")

        this.translation = {
            x: 0,
            y: 0,
            z: 0
        }

        this.scale = {
            x: 1,
            y: 1,
            z: 1
        }

        this.angle = {
            x: 0,
            y: 0,
            z: 0
        }

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

        this.gl.clearColor(0, 0, 0, 0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        this.gl.uniform2f(this.locations.resolution, this.gl.canvas.width, this.gl.canvas.height);

        this.setAttr(3, this.locations.position, this.buffers.position)
        this.setAttr(4, this.locations.color, this.buffers.color)

        this.setMatrix()

        let primitiveType = this.gl.TRIANGLES;
        let offset = 0;
        let count = 12;

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
        let matrix = m4.identity()
        matrix = m4.translate(matrix, this.translation.x, this.translation.y, this.translation.z);
        matrix = m4.xRotate(matrix, this.angle.x)
        matrix = m4.yRotate(matrix, this.angle.y)
        matrix = m4.zRotate(matrix, this.angle.z)
        matrix = m4.scale(matrix, this.scale.x, this.scale.y, this.scale.z)

        this.gl.uniformMatrix4fv(this.locations.matrix, false, matrix);
    }

    setTranslation({x, y, z}) {
        this.translation = {
            x: x ?? this.translation.x,
            y: y ?? this.translation.y,
            z: z ?? this.translation.z
        }
    }

    setScale({x, y, z}) {
        this.scale = {
            x: x ?? this.scale.x,
            y: y ?? this.scale.y,
            z: z ?? this.scale.z
        }
    }

    setAngle({x, y, z}) {
        this.angle = {
            x: x ?? this.angle.x,
            y: y ?? this.angle.y,
            z: z ?? this.angle.z
        }
    }
}