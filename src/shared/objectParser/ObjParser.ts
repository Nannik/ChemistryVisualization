import Vector3 from '../../webgl/utils/vector3';
import Vector2 from '../../webgl/utils/vector2';
import FileParseError from './FileParseError';
import { FileParser } from './FileParser';
import { Material } from './types';

export default class ObjParser extends FileParser {
    private materials: Material[];

    private currentMaterial: Material;

    private vertexes: Vector3[];

    private normals: Vector3[];

    private textures: Vector2[];

    private data: { vertexes: Vector3[]; normals: Vector3[]; textures: Vector2[]; colors: number[] };

    constructor(fileContent: string, materials: Material[]) {
        super(fileContent);

        this.materials = materials;

        this.keywords = {
            usemtl: this.usemtl.bind(this),
            v: this.vParse.bind(this),
            vn: this.vnParse.bind(this),
            vt: this.vtParse.bind(this),
            f: this.fParse.bind(this),
        };
    }

    protected reset() {
        this.vertexes = [];
        this.normals = [];
        this.textures = [];

        this.data = {
            vertexes: [],
            normals: [],
            textures: [],
            colors: [],
        };
    }

    private usemtl(parts: string[]) {
        if (parts.length !== 1) {
            throw new FileParseError(
                '.obj',
                'usemtl',
                `value should contain 3 parts, instead have ${parts.length}. parts '${parts}'`,
            );
        }

        const material = this.materials.find((material) => material.name === parts[0]);
        if (!material) {
            throw new FileParseError(
                '.obj',
                'usemtl',
                `Material not found: '${parts[0]}'`,
            );
        }

        this.currentMaterial = material;
    }

    private vParse(parts: string[]) {
        if (parts.length !== 3) {
            throw new FileParseError(
                '.obj',
                'v',
                `value should contain 3 parts, instead have ${parts.length}. parts '${parts}'`,
            );
        }

        this.vertexes.push(new Vector3(
            Number(parts[0]),
            Number(parts[1]),
            Number(parts[2]),
        ));
    }

    private vnParse(parts: string[]) {
        if (parts.length !== 3) {
            throw new FileParseError(
                '.obj',
                'vn',
                `value should contain 3 parts, instead have ${parts.length}. parts '${parts}'`,
            );
        }

        this.normals.push(new Vector3(
            Number(parts[0]),
            Number(parts[1]),
            Number(parts[2]),
        ));
    }

    private vtParse(parts: string[]) {
        if (parts.length !== 2) {
            throw new FileParseError(
                '.obj',
                'vt',
                `value should contain 2 parts, instead have ${parts.length}. parts '${parts}'`,
            );
        }

        this.textures.push(new Vector2(
            Number(parts[0]),
            Number(parts[1]),
        ));
    }

    private fParse(parts: string[]) {
        // parts - [v1/vt1/vn1, v2/vt2/vn2, v3/vt3/vn3, ...]
        for (let i = 0; i < parts.length - 2; i++) {
            this.addVertex(parts[0]);
            this.addVertex(parts[i + 1]);
            this.addVertex(parts[i + 2]);
        }
    }

    private addVertex(part: string) {
        const [ v, vt, vn ] = part.split('/');

        // subtract 1 because indexes in .obj start with 1
        this.data.vertexes.push(this.vertexes[Number(v) - 1]);
        this.data.textures.push(this.textures[Number(vt) - 1]);
        this.data.normals.push(this.normals[Number(vn) - 1]);
        this.data.colors.push(...this.currentMaterial.diffuseColor, this.currentMaterial.opacity);
    }

    public getVertexes() {
        return this.data.vertexes;
    }

    public getTextures() {
        return this.data.textures;
    }

    public getNormals() {
        return this.data.normals;
    }

    public getColors() {
        return this.data.colors;
    }
}
