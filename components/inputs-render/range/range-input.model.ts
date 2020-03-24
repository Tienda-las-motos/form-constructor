export class RangeModel {
    constructor(
        public etiqueta: string,
        public ID: string,
        public requerido: boolean,
        public minCant: number,
        public minValue: number,
        public maxCant: number,
        public maxValue:number,
        public minText?: string,
        public maxText?: string,
        public info?: string
    ) {
        
    }
}