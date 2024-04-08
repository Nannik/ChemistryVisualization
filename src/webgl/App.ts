import vertShGl from "../glsl/vertSh.glsl";
import fragShGl from "../glsl/fragSh.glsl";
import {createShader} from "./createShader";
import {createProgram} from "./createProgram";
import {initBuffers} from "./initBuffers";
import {m4} from "./utils/m4";

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
    gl: WebGLRenderingContext
    ext: WEBGL_debug_shaders
    translation: Vector3
    scale: Vector3
    angle: Vector3

    fragSh: WebGLShader
    vertSh: WebGLShader
    program: WebGLProgram

    buffers: AppBuffersType
    locations: AppLocationsType

    constructor(gl: WebGLRenderingContext) {
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
        this.fragSh = createShader(gl, gl.FRAGMENT_SHADER, fragShGl);

        this.program = createProgram(gl, this.vertSh, this.fragSh)

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

    setAttr(size: number, attrLoc: GLuint, buffer: WebGLBuffer) {
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

    setTranslation(v3: Optional<Vector3>) {
        this.translation = {
            x: v3.x ?? this.translation.x,
            y: v3.y ?? this.translation.y,
            z: v3.z ?? this.translation.z
        }
    }

    setScale(v3: Optional<Vector3>) {
        this.scale = {
            x: v3.x ?? this.scale.x,
            y: v3.y ?? this.scale.y,
            z: v3.z ?? this.scale.z
        }
    }

    setAngle(v3: Optional<Vector3>) {
        this.angle = {
            x: v3.x ?? this.angle.x,
            y: v3.y ?? this.angle.y,
            z: v3.z ?? this.angle.z
        }
    }
}