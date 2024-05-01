export interface IAppUniforms {
    u_matrix: number[]
    u_id: number[]
}

export interface IAppAttributes {
    a_color: AllowSharedBufferSource
    a_position: AllowSharedBufferSource
}

type WebGLShaderType = WebGLRenderingContext['VERTEX_SHADER'] | WebGLRenderingContext['FRAGMENT_SHADER']

export abstract class Program<
    Uniforms extends Partial<keyof IAppUniforms> = null,
    Attributes extends Partial<keyof IAppAttributes> = null
> {
    protected gl: WebGLRenderingContext;

    protected uniformsLocations: Record<Uniforms, WebGLUniformLocation>;

    protected attributesLocations: Record<Attributes, GLint>;

    protected uniformSetters: Record<Uniforms, (value: IAppUniforms[keyof IAppUniforms]) => void>;

    protected attributeSetters: Record<Attributes, (value: AllowSharedBufferSource) => void>;

    protected program: WebGLProgram;

    protected constructor(gl: WebGLRenderingContext) {
        this.gl = gl;
        this.setProgram(this.getShaders());
        this.createLocations();
        this.setUniformSetters();
        this.setAttributeSetters();
    }

    use() {
        this.gl.useProgram(this.program);
    }

    setUniforms(uniforms: Partial<IAppUniforms>) {
        Object.entries(uniforms).forEach(([ k, value ]) => {
            const key = k as Uniforms;
            if (this.uniformSetters[key]) this.uniformSetters[key](value);
        });
    }

    setAttributes(attributes: Partial<IAppAttributes>) {
        Object.entries(attributes).forEach(([ k, value ]) => {
            const key = k as Attributes;
            if (this.attributeSetters[key]) this.attributeSetters[key](value);
        });
    }

    protected setProgram(shaders: { vert: WebGLShader; frag: WebGLShader }): void {
        const program = this.gl.createProgram();

        this.gl.attachShader(program, shaders.vert);
        this.gl.attachShader(program, shaders.frag);
        this.gl.linkProgram(program);

        const success = this.gl.getProgramParameter(program, this.gl.LINK_STATUS);
        if (success) {
            this.program = program;
            return;
        }

        this.gl.deleteProgram(program);
        this.program = null;
        throw new Error('Error on create program');
    }

    protected setAttr(size: number, type: GLenum, normalize: boolean, attrLoc: GLuint, buffer: WebGLBuffer) {
        const stride = 0;
        const offset = 0;

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
        this.gl.vertexAttribPointer(attrLoc, size, type, normalize, stride, offset);
        this.gl.enableVertexAttribArray(attrLoc);
    }

    protected initBuffer(data: AllowSharedBufferSource | null) {
        const posBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, posBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, data, this.gl.STATIC_DRAW);

        return posBuffer;
    }

    protected createShader(type: WebGLShaderType, source: string): WebGLShader {
        const shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);

        const success = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
        if (success) {
            return shader;
        }

        console.error(this.gl.getShaderInfoLog(shader));
        this.gl.deleteShader(shader);
    }

    protected abstract getShaders(): { vert: WebGLShader; frag: WebGLShader };

    protected abstract createLocations(): void

    protected abstract setUniformSetters(): void

    protected abstract setAttributeSetters(): void
}
