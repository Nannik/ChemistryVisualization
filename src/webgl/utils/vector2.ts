export default class Vector2 {
    private readonly _x: number;

    private readonly _y: number;

    constructor(x: number, y: number) {
        if (Number.isNaN(x) || Number.isNaN(y)) throw new Error('NaN coordinate is not valid');

        this._x = x;
        this._y = y;
    }

    get x(): number {
        return this._x;
    }

    get y(): number {
        return this._y;
    }
}
