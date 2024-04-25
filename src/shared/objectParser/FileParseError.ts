export default class FileParseError extends Error {
    constructor(fileExtension: string, methodName: string, message: string) {
        super(`${fileExtension} file parse error in method '${methodName}'. ${message}`);
    }
}
