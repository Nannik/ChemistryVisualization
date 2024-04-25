export default class Vector3 {
    private readonly _x: number;

    private readonly _y: number;

    private readonly _z: number;

    constructor(x: number, y: number, z: number) {
        if (Number.isNaN(x) || Number.isNaN(y) || Number.isNaN(z)) throw new Error('NaN coordinate is not valid');

        this._x = x;
        this._y = y;
        this._z = z;
    }

    cross(vec: Vector3): Vector3 {
        return new Vector3(
            this.y * vec.z - this.z * vec.y,
            this.z * vec.x - this.x * vec.z,
            this.x * vec.y - this.y * vec.x,
        );
    }

    subtract(vec: Vector3): Vector3 {
        return new Vector3(
            this.x - vec.x,
            this.y - vec.y,
            this.z - vec.z,
        );
    }

    toArray(): number[] {
        return [ this.x, this.y, this.z ];
    }

    normalize(): Vector3 {
        const length = this.getLength();

        if (length > 0.00001) {
            return new Vector3(
                this.x / length,
                this.y / length,
                this.z / length,
            );
        }

        return new Vector3(0, 0, 0);
    }

    getLength(): number {
        return Math.sqrt(
            this.x * this.x + this.y * this.y + this.z * this.z,
        );
    }

    get x(): number {
        return this._x;
    }

    get y(): number {
        return this._y;
    }

    get z(): number {
        return this._z;
    }
}
