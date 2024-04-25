export abstract class FileParser {
    protected readonly fileContent: string;

    protected keywords: Record<string, (parts: string[]) => void>;

    constructor(fileContent: string) {
        this.fileContent = fileContent;
        this.reset();
    }

    protected abstract reset(): void;

    public parse() {
        this.reset();

        const lines = this.fileContent.split('\n');
        for (let i = 0; i < lines.length; i++) {
            this.execLine(lines[i].trim());
        }
    }

    protected execLine(line: string) {
        if (line === '' || line.startsWith('#')) return;

        const m = /(\w*) *(.*)/.exec(line);
        if (!m) return;

        const [ , keyword ] = m;
        const parts = line.split(/\s+/).slice(1);

        const handler = this.keywords[keyword];
        if (!handler) {
            console.warn('unhandled keyword:', keyword);
            return;
        }

        handler(parts);
    }
}
