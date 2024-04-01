import {App} from "./App";

export function main(gl) {
    const app = new App(gl)

    const posXInput = document.getElementById('pos-x')
    const posYInput = document.getElementById('pos-y')
    const scaleXInput = document.getElementById('scale-x')
    const scaleYInput = document.getElementById('scale-y')
    const angleInput = document.getElementById('angle')

    posXInput.addEventListener('input', (e) => {
        const value = e.target.value
        app.setTranslation({ x: value })
        app.draw()
    })

    posYInput.addEventListener('input', (e) => {
        const value = e.target.value
        app.setTranslation({ y: value })
        app.draw()
    })

    scaleXInput.addEventListener('input', (e) => {
        const value = e.target.value
        app.setScale({ x: value })
        app.draw()
    })

    scaleYInput.addEventListener('input', (e) => {
        const value = e.target.value
        app.setScale({ y: value })
        app.draw()
    })

    angleInput.addEventListener('input', (e) => {
        const value = e.target.value
        app.setAngle(value * (Math.PI / 180))
        app.draw()
    })
}