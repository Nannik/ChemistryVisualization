import { App } from './App';

export function main(gl: WebGLRenderingContext) {
    const app = new App(gl);

    const angleInput = document.getElementById('angle') as HTMLInputElement;

    app.setAngle(Number(angleInput.value));
    angleInput.addEventListener('input', (e: DOMEvent<HTMLInputElement>) => {
        let value = Number(e.target.value);
        if (Number.isNaN(value)) value = 0;

        app.setAngle(value);
        app.draw();
    });
}
