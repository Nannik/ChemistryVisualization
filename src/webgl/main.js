import {App} from "./App";

export function main(gl) {
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

    posZInput.addEventListener('input', (e) => {
        const value = e.target.value
        app.setTranslation({ z: value })
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

    scaleZInput.addEventListener('input', (e) => {
        const value = e.target.value
        app.setScale({ z: value })
        app.draw()
    })

    angleXInput.addEventListener('input', (e) => {
        const value = e.target.value
        app.setAngle({ x: value * (Math.PI / 180) })
        app.draw()
    })

    angleYInput.addEventListener('input', (e) => {
        const value = e.target.value
        app.setAngle({ y: value * (Math.PI / 180) })
        app.draw()
    })

    angleZInput.addEventListener('input', (e) => {
        const value = e.target.value
        app.setAngle({ y: value * (Math.PI / 180) })
        app.draw()
    })
}