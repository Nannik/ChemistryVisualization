import vertShGl from '@glsl/vertSh.glsl';
import fragShGl from '@glsl/fragSh.glsl';
import { Program } from './Program';

export class CanvasProgram extends Program<
    'u_matrix',
    'a_color' | 'a_position'
> {
    // eslint-disable-next-line no-useless-constructor
    public constructor(gl: WebGLRenderingContext) {
        super(gl);
    }

    protected getShaders() {
        return {
            vert: this.createShader(this.gl.VERTEX_SHADER, vertShGl),
            frag: this.createShader(this.gl.FRAGMENT_SHADER, fragShGl),
        };
    }

    protected createLocations(): void {
        this.attributesLocations = {
            a_color: this.gl.getAttribLocation(this.program, 'a_color'),
            a_position: this.gl.getAttribLocation(this.program, 'a_position'),
        };

        this.uniformsLocations = {
            u_matrix: this.gl.getUniformLocation(this.program, 'u_matrix'),
        };
    }

    protected setUniformSetters(): void {
        this.uniformSetters = {
            u_matrix: (value: number[]) => {
                this.gl.uniformMatrix4fv(this.uniformsLocations.u_matrix, false, value);
            },
        };
    }

    protected setAttributeSetters(): void {
        this.attributeSetters = {
            a_position: (value) => this.setAttr(
                3,
                this.gl.FLOAT,
                false,
                this.attributesLocations.a_position,
                this.initBuffer(value),
            ),
            a_color: (value) => this.setAttr(
                4,
                this.gl.FLOAT,
                false,
                this.attributesLocations.a_color,
                this.initBuffer(value),
            ),
        };
    }
}
