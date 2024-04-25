import Vector3 from '../webgl/utils/vector3';
import Scene from '../webgl/Scene';
import { m4 } from '../webgl/utils/m4';

export default class WebGLObject {
    private scene: Scene;

    private readonly positionBuffer: WebGLBuffer;

    private readonly colorBuffer: WebGLBuffer;

    private readonly vertexCount: number;

    private _position: Vector3;

    private _scale: Vector3;

    constructor(scene: Scene, positions: number[], colors: number[]) {
        this.scene = scene;
        this._position = new Vector3(0, 0, 0);
        this._scale = new Vector3(1, 1, 1);

        this.positionBuffer = this.scene.initBuffer(new Float32Array(positions));
        this.colorBuffer = this.scene.initBuffer(new Float32Array(colors));

        const count = positions.length / 3;
        if (count % 1 !== 0) {
            throw new Error(
                `The number of positions must be divisible by 3 without a remainder. 
                Current length ${positions.length}`,
            );
        }

        this.vertexCount = count;
    }

    draw(viewProjectionMatrix: number[]) {
        let matrix = m4.translate(viewProjectionMatrix, this.position.x, 0, this.position.y);
        matrix = m4.scale(matrix, this.scale.x, this.scale.y, this.scale.z);

        this.scene.drawArrays(
            this.positionBuffer,
            this.colorBuffer,
            matrix,
            0,
            this.vertexCount,
        );
    }

    get position(): Vector3 {
        return this._position;
    }

    set position(value: Vector3) {
        this._position = value;
    }

    get scale(): Vector3 {
        return this._scale;
    }

    set scale(value: Vector3) {
        this._scale = value;
    }
}
