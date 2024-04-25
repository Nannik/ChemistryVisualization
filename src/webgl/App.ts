import vertShGl from '../glsl/vertSh.glsl';
import fragShGl from '../glsl/fragSh.glsl';
import cubeObj from '../assets/cube/cube.obj';
import cubeMtl from '../assets/cube/cube.mtl';

import { m4 } from './utils/m4';
import Vector3 from './utils/vector3';
import Scene from './Scene';
import WebGLObject from '../objects/WebGLObject';
import Camera from './Camera';
import ObjParser from '../shared/objectParser/ObjParser';
import MtlParser from '../shared/objectParser/MtlParser';

type WebGLShaderType = WebGLRenderingContext['VERTEX_SHADER'] | WebGLRenderingContext['FRAGMENT_SHADER']

export type AppLocations = {
    color: GLint
    position: GLint
    resolution: WebGLUniformLocation
    matrix: WebGLUniformLocation
}

export class App {
    private readonly gl: WebGLRenderingContext;

    private readonly program: WebGLProgram;

    private readonly scene: Scene;

    private camera: Camera;

    private readonly radius: number;

    private objects: WebGLObject[] = [];

    constructor(gl: WebGLRenderingContext) {
        this.gl = gl;

        this.gl.enable(this.gl.CULL_FACE);
        this.gl.enable(this.gl.DEPTH_TEST);

        this.radius = 200;

        const vertSh = this.createShader(gl.VERTEX_SHADER, vertShGl);
        const fragSh = this.createShader(gl.FRAGMENT_SHADER, fragShGl);

        this.program = this.createProgram(vertSh, fragSh);

        const locations: AppLocations = {
            color: gl.getAttribLocation(this.program, 'a_color'),
            position: gl.getAttribLocation(this.program, 'a_position'),
            resolution: gl.getUniformLocation(this.program, 'u_resolution'),
            matrix: gl.getUniformLocation(this.program, 'u_matrix'),
        };

        this.scene = new Scene(gl, locations);
        this.initObjects();
        this.initCamera();

        this.draw();
    }

    private createShader(type: WebGLShaderType, source: string): WebGLShader {
        const shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);

        const success = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
        if (success) {
            return shader;
        }

        console.error(this.gl.getShaderInfoLog(shader));
        this.gl.deleteShader(shader);
    }

    private createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram {
        const program = this.gl.createProgram();

        this.gl.attachShader(program, vertexShader);
        this.gl.attachShader(program, fragmentShader);
        this.gl.linkProgram(program);

        const success = this.gl.getProgramParameter(program, this.gl.LINK_STATUS);
        if (success) {
            return program;
        }

        console.error(this.gl.getProgramInfoLog(program));
        this.gl.deleteProgram(program);
    }

    private initObjects() {
        const count = 5;

        const mtlParser = new MtlParser(cubeMtl);
        mtlParser.parse();

        const objParser = new ObjParser(cubeObj, mtlParser.materials);
        objParser.parse();

        console.log(objParser.getVertexes().map((vector) => [ vector.x, vector.y, vector.z ]).flat());
        console.log(objParser.getColors());

        for (let i = 0; i < count; i++) {
            const angle = (i * Math.PI * 2) / count;
            const x = Math.cos(angle) * this.radius;
            const y = Math.sin(angle) * this.radius;

            const obj = new WebGLObject(
                this.scene,
                objParser.getVertexes().map((vector) => [ vector.x, vector.y, vector.z ]).flat(),
                objParser.getColors(),
            );
            obj.position = new Vector3(x, y, obj.position.z);
            obj.scale = new Vector3(10, 10, 10);

            this.objects.push(obj);
        }
    }

    private initCamera() {
        this.camera = new Camera(
            this.getCameraPosition(0),
            new Vector3(0, 0, 0),
            (150 * Math.PI) / 180, // 150 degree
            this.gl.canvas.width / this.gl.canvas.height,
            1,
            2000,
        );
    }

    getCameraPosition(angle: number) {
        let cameraPositionMatrix = m4.yRotation(angle);
        cameraPositionMatrix = m4.translate(cameraPositionMatrix, 0, 0, this.radius * 1.2);

        return new Vector3(cameraPositionMatrix[12], cameraPositionMatrix[13], cameraPositionMatrix[14]);
    }

    draw() {
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);

        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        this.gl.useProgram(this.program);

        this.objects.forEach((obj) => obj.draw(this.camera.viewProjectionMatrix));
    }

    setAngle(angle: number) {
        this.camera.position = this.getCameraPosition((angle * Math.PI) / 360);
    }
}
