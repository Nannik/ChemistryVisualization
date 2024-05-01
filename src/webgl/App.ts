import cubeObj from '@assets/cube/cube.obj';
import cubeMtl from '@assets/cube/cube.mtl';

import { m4 } from './utils/m4';
import Vector3 from './utils/vector3';
import WebGLObject from './objects/WebGLObject';
import Camera from './Camera';
import ObjParser from '../shared/objectParser/ObjParser';
import MtlParser from '../shared/objectParser/MtlParser';
import { CanvasProgram } from './program/CanvasProgram';
import { PickProgram } from './program/PickProgram';
import CanvasMouse from './CanvasMouse';
import { Program } from './program/Program';

export class App {
    private readonly gl: WebGLRenderingContext;

    private readonly canvasProgram: CanvasProgram;

    private readonly pickProgram: PickProgram;

    private readonly mouse: CanvasMouse;

    private camera: Camera;

    private readonly radius: number;

    private objects: WebGLObject[] = [];

    private readonly pickFramebuffer: WebGLFramebuffer;

    private readonly pickTexture: WebGLTexture;

    private readonly depthBuffer: WebGLRenderbuffer;

    constructor(gl: WebGLRenderingContext, mouse: CanvasMouse) {
        this.gl = gl;
        this.mouse = mouse;

        this.gl.enable(this.gl.CULL_FACE);
        this.gl.enable(this.gl.DEPTH_TEST);

        this.radius = 200;

        this.canvasProgram = new CanvasProgram(this.gl);
        this.pickProgram = new PickProgram(this.gl);

        this.initObjects();
        this.initCamera();

        this.pickTexture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.pickTexture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

        this.depthBuffer = gl.createRenderbuffer();
        gl.bindRenderbuffer(gl.RENDERBUFFER, this.depthBuffer);

        this.pickFramebuffer = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.pickFramebuffer);

        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.pickTexture, 0);
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.depthBuffer);

        requestAnimationFrame(this.drawScene.bind(this));
    }

    private initObjects() {
        const count = 5;

        const mtlParser = new MtlParser(cubeMtl);
        mtlParser.parse();

        const objParser = new ObjParser(cubeObj, mtlParser.materials);
        objParser.parse();

        for (let i = 0; i < count; i++) {
            const angle = (i * Math.PI * 2) / count;
            const x = Math.cos(angle) * this.radius;
            const z = Math.sin(angle) * this.radius;

            const obj = new WebGLObject(
                i + 1,
                objParser.getVertexes().map((vector) => [ vector.x, vector.y, vector.z ]).flat(),
                objParser.getColors(),
            );
            obj.position = new Vector3(x, obj.position.y, z);
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
        cameraPositionMatrix = m4.translate(
            cameraPositionMatrix,
            0,
            Math.sin(angle * 2) * 20,
            this.radius * 1.2,
        );

        return new Vector3(cameraPositionMatrix[12], cameraPositionMatrix[13], cameraPositionMatrix[14]);
    }

    setFramebufferAttachmentSizes(width: number, height: number) {
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.pickTexture);
        // define size and format of level 0
        const level = 0;
        const internalFormat = this.gl.RGBA;
        const border = 0;
        const format = this.gl.RGBA;
        const type = this.gl.UNSIGNED_BYTE;
        const data: any = null;
        this.gl.texImage2D(
            this.gl.TEXTURE_2D,
            level,
            internalFormat,
            width,
            height,
            border,
            format,
            type,
            data,
        );

        this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, this.depthBuffer);
        this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.DEPTH_COMPONENT16, width, height);
    }

    drawScene() {
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.setFramebufferAttachmentSizes(this.gl.canvas.width, this.gl.canvas.height);

        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.pickFramebuffer);
        this.drawObjects(this.objects, this.pickProgram);

        const { x, y } = this.mouse.toLocalCoordinates();
        const data = new Uint8Array(4);
        this.gl.readPixels(
            x,
            y,
            1,
            1,
            this.gl.RGBA,
            this.gl.UNSIGNED_BYTE,
            data,
        );
        const id = data[0] + (data[1] << 8) + (data[2] << 16) + (data[3] << 24);

        this.objects.forEach((obj) => {
            if (obj.id === id) obj.scale = new Vector3(15, 15, 15);
            else obj.scale = new Vector3(10, 10, 10);
        });

        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
        this.drawObjects(this.objects, this.canvasProgram);

        requestAnimationFrame(this.drawScene.bind(this));
    }

    drawObjects(objects: WebGLObject[], program: Program) {
        program.use();

        objects.forEach((obj) => this.drawObject(obj, program));
    }

    drawObject(object: WebGLObject, program: Program) {
        program.setUniforms({
            u_matrix: object.calculateMatrix(this.camera.viewProjectionMatrix),
            u_id: [
                ((object.id >> 0) & 0xFF) / 0xFF,
                ((object.id >> 8) & 0xFF) / 0xFF,
                ((object.id >> 16) & 0xFF) / 0xFF,
                ((object.id >> 24) & 0xFF) / 0xFF,
            ],
        });

        program.setAttributes({
            a_position: object.vertexes,
            a_color: object.colors,
        });

        const mode = this.gl.TRIANGLES;
        this.gl.drawArrays(mode, 0, object.vertexCount);
    }

    setAngle(angle: number) {
        this.camera.position = this.getCameraPosition((angle * Math.PI) / 360);
    }
}
