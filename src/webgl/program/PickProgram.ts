import vertShGl from '@glsl/pickVertSh.glsl';
import fragShGl from '@glsl/pickFragSh.glsl';
import { Program } from './Program';

export class PickProgram extends Program<
    'u_matrix' | 'u_id',
    'a_position'
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
            a_position: this.gl.getAttribLocation(this.program, 'a_position'),
        };

        this.uniformsLocations = {
            u_matrix: this.gl.getUniformLocation(this.program, 'u_matrix'),
            u_id: this.gl.getUniformLocation(this.program, 'u_id'),
        };
    }

    protected setUniformSetters(): void {
        this.uniformSetters = {
            u_matrix: (value: number[]) => {
                this.gl.uniformMatrix4fv(this.uniformsLocations.u_matrix, false, value);
            },
            u_id: (value: number[]) => {
                this.gl.uniform4fv(this.uniformsLocations.u_id, value);
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
        };
    }
}
