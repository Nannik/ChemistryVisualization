import FileParseError from './FileParseError';
import { Material } from './types';
import { FileParser } from './FileParser';

export default class MtlParser extends FileParser {
    private _materials: Material[];

    constructor(fileContent: string) {
        super(fileContent);

        this.keywords = {
            newmtl: this.newmtlParse.bind(this),
            Kd: this.kdParse.bind(this),
            d: this.dParse.bind(this),
        };
    }

    protected reset() {
        this._materials = [];
    }

    private newmtlParse(parts: string[]) {
        if (parts.length !== 1) {
            throw new FileParseError(
                '.mtl',
                'newmtl',
                `Should have 1 part, instead have ${parts.length}. parts '${parts}'`,
            );
        }

        this._materials.push({
            name: parts[0],
            diffuseColor: [ 1, 1, 1 ],
            opacity: 1,
        });
    }

    private dParse(parts: string[]) {
        if (parts.length !== 1) {
            throw new FileParseError(
                '.mtl',
                'd',
                `Should have 1 part, instead have ${parts.length}. parts '${parts}'`,
            );
        }

        const opacity = Number(parts[0]);
        if (Number.isNaN(opacity)) throw new Error('opacity is NaN');

        this._materials.at(-1).opacity = opacity;
    }

    private kdParse(parts: string[]) {
        if (parts.length !== 3) {
            throw new FileParseError(
                '.mtl',
                'Kd',
                `Should have 3 parts, instead have ${parts.length}. parts '${parts}'`,
            );
        }

        this._materials.at(-1).diffuseColor = [
            Number(parts[0]),
            Number(parts[1]),
            Number(parts[2]),
        ];
    }

    get materials(): Material[] {
        return this._materials;
    }
}
