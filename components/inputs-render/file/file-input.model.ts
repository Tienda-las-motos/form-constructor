export class FileInputModel {
    constructor(
        public etiqueta: string,
        public ID: string,
        public requerido: boolean,
        public placeholder?: string,
        public info?: string
    ) {
        
    }
}