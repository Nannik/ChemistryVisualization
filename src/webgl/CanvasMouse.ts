import Vector2 from './utils/vector2';

export default class CanvasMouse {
    private readonly canvas: HTMLCanvasElement;

    private _position: Vector2;

    private _isClicked: boolean;

    private isOnArea: boolean;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this._position = new Vector2(0, 0);

        this._isClicked = false;
    }

    toLocalCoordinates(): Vector2 {
        return new Vector2(
            (this.position.x * this.canvas.width) / this.canvas.clientWidth,
            this.canvas.height - (this.position.y * this.canvas.height) / this.canvas.clientHeight - 1,
        );
    }

    // eslint-disable-next-line class-methods-use-this
    handleMouseMove(e: MouseEvent) {
        const rect = this.canvas.getBoundingClientRect();

        this._position = new Vector2(
            e.clientX - rect.left,
            e.clientY - rect.top,
        );
    }

    handleMouseDown(e: MouseEvent) {
        if (!this.isOnArea) return;
        this._isClicked = true;
    }

    handleMouseUp(e: MouseEvent) {
        if (!this.isOnArea) return;
        this._isClicked = false;
    }

    handleMouseLeave(e: MouseEvent) {
        this.isOnArea = false;
        this._isClicked = false;
    }

    handleMouseEnter(e: MouseEvent) {
        this.isOnArea = true;
    }

    get position(): Vector2 {
        return this._position;
    }

    get isClicked(): boolean {
        return this._isClicked;
    }
}
