import {App} from "./App";

export function main(gl: WebGLRenderingContext) {
    const app = new App(gl)

    const posXInput = document.getElementById('pos-x')
    const posYInput = document.getElementById('pos-y')
    const posZInput = document.getElementById('pos-z')
    const scaleXInput = document.getElementById('scale-x')
    const scaleYInput = document.getElementById('scale-y')
    const scaleZInput = document.getElementById('scale-z')
    const angleXInput = document.getElementById('angle-x')
    const angleYInput = document.getElementById('angle-y')
    const angleZInput = document.getElementById('angle-z')

    posXInput.addEventListener('input', (e: DOMEvent<HTMLInputElement>) => {
        let value = Number(e.target.value)
        if (isNaN(value)) value = 0

        app.setTranslation({ x: value })
        app.draw()
    })

    posYInput.addEventListener('input', (e: DOMEvent<HTMLInputElement>) => {
        let value = Number(e.target.value)
        if (isNaN(value)) value = 0

        app.setTranslation({ y: value })
        app.draw()
    })

    posZInput.addEventListener('input', (e: DOMEvent<HTMLInputElement>) => {
        let value = Number(e.target.value)
        if (isNaN(value)) value = 0

        app.setTranslation({ z: value })
        app.draw()
    })

    scaleXInput.addEventListener('input', (e: DOMEvent<HTMLInputElement>) => {
        let value = Number(e.target.value)
        if (isNaN(value)) value = 0

        app.setScale({ x: value })
        app.draw()
    })

    scaleYInput.addEventListener('input', (e: DOMEvent<HTMLInputElement>) => {
        let value = Number(e.target.value)
        if (isNaN(value)) value = 0

        app.setScale({ y: value })
        app.draw()
    })

    scaleZInput.addEventListener('input', (e: DOMEvent<HTMLInputElement>) => {
        let value = Number(e.target.value)
        if (isNaN(value)) value = 0

        app.setScale({ z: value })
        app.draw()
    })

    angleXInput.addEventListener('input', (e: DOMEvent<HTMLInputElement>) => {
        let value = Number(e.target.value)
        if (isNaN(value)) value = 0

        app.setAngle({ x: value * (Math.PI / 180) })
        app.draw()
    })

    angleYInput.addEventListener('input', (e: DOMEvent<HTMLInputElement>) => {
        let value = Number(e.target.value)
        if (isNaN(value)) value = 0

        app.setAngle({ y: value * (Math.PI / 180) })
        app.draw()
    })

    angleZInput.addEventListener('input', (e: DOMEvent<HTMLInputElement>) => {
        let value = Number(e.target.value)
        if (isNaN(value)) value = 0

        app.setAngle({ z: value * (Math.PI / 180) })
        app.draw()
    })
}