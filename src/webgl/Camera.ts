import { m4 } from './utils/m4';
import Vector3 from './utils/vector3';

export default class Camera {
    private _viewProjectionMatrix: number[];

    // Field of view in radians
    private _fieldOfView: number;

    private _aspectRatio: number;

    private _zNear: number;

    private _zFar: number;

    private _position: Vector3;

    private _lookAt: Vector3;

    constructor(
        position: Vector3,
        lookAt: Vector3,
        fieldOfView: number,
        aspectRatio: number,
        zNear: number,
        zFar: number,
    ) {
        this._fieldOfView = fieldOfView;
        this._aspectRatio = aspectRatio;
        this._zNear = zNear;
        this._zFar = zFar;
        this._position = position;
        this._lookAt = lookAt;

        this.updateViewProjectionMatrix();
    }

    private updateViewProjectionMatrix() {
        const cameraMatrix = m4.lookAt(
            this._position,
            this._lookAt,
            new Vector3(0, 1, 0),
        );
        const viewMatrix = m4.inverse(cameraMatrix);

        this._viewProjectionMatrix = m4.multiply(
            m4.perspective(this._fieldOfView, this._aspectRatio, this._zNear, this._zFar),
            viewMatrix,
        );
    }

    get viewProjectionMatrix(): number[] {
        return this._viewProjectionMatrix;
    }

    set fieldOfView(value: number) {
        this._fieldOfView = value;
        this.updateViewProjectionMatrix();
    }

    set aspectRatio(value: number) {
        this._aspectRatio = value;
        this.updateViewProjectionMatrix();
    }

    set zNear(value: number) {
        this._zNear = value;
        this.updateViewProjectionMatrix();
    }

    set zFar(value: number) {
        this._zFar = value;
        this.updateViewProjectionMatrix();
    }

    set position(value: Vector3) {
        this._position = value;
        this.updateViewProjectionMatrix();
    }

    set lookAt(value: Vector3) {
        this._lookAt = value;
        this.updateViewProjectionMatrix();
    }
}
