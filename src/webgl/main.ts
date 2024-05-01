import { App } from './App';
import CanvasMouse from './CanvasMouse';

export function main(gl: WebGLRenderingContext) {
    const mouse = new CanvasMouse(gl.canvas as HTMLCanvasElement);
    const app = new App(gl, mouse);

    const canvasElement = document.getElementById('glcanvas') as HTMLCanvasElement;
    canvasElement.addEventListener('mousemove', (e) => mouse.handleMouseMove(e));
    canvasElement.addEventListener('mousedown', (e) => mouse.handleMouseDown(e));
    canvasElement.addEventListener('mouseup', (e) => mouse.handleMouseUp(e));
    canvasElement.addEventListener('mouseenter', (e) => mouse.handleMouseEnter(e));
    canvasElement.addEventListener('mouseleave', (e) => mouse.handleMouseLeave(e));

    const angleInput = document.getElementById('angle') as HTMLInputElement;
    app.setAngle(Number(angleInput.value));
    angleInput.addEventListener('input', (e: DOMEvent<HTMLInputElement>) => {
        let value = Number(e.target.value);
        if (Number.isNaN(value)) value = 0;

        app.setAngle(value);
    });
}
