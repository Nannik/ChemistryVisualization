import Vector3 from '../utils/vector3';
import { m4 } from '../utils/m4';

export default class WebGLObject {
    private readonly _vertexCount: number;

    private readonly _vertexes: AllowSharedBufferSource;

    private readonly _colors: AllowSharedBufferSource;

    private _position: Vector3;

    private _scale: Vector3;

    private readonly _id: number;

    constructor(id: number, vertexes: number[], colors: number[]) {
        this._position = new Vector3(0, 0, 0);
        this._scale = new Vector3(1, 1, 1);
        this._vertexes = new Float32Array(vertexes);
        this._colors = new Float32Array(colors);

        this._id = id;

        const count = vertexes.length / 3;
        if (count % 1 !== 0) {
            throw new Error(
                `The number of positions must be divisible by 3 without a remainder. 
                Current length ${vertexes.length}`,
            );
        }

        this._vertexCount = count;
    }

    calculateMatrix(viewProjectionMatrix: number[]): number[] {
        const matrix = m4.translate(viewProjectionMatrix, this.position.x, this.position.y, this.position.z);
        return m4.scale(matrix, this.scale.x, this.scale.y, this.scale.z);
    }

    get id() {
        return this._id;
    }

    get vertexCount(): number {
        return this._vertexCount;
    }

    get colors(): AllowSharedBufferSource {
        return this._colors;
    }

    get vertexes(): AllowSharedBufferSource {
        return this._vertexes;
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
