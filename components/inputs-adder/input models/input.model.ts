export class InputModel {
  visibile: boolean;
  requerido: boolean;
  constructor(
    public etiqueta: string,
    public ID: string,
    public tipo: string,
    public placeholder?: string,
    public info?: string,
    public opciones?: iInputOption[],
    public index?: number,
    requerido?: boolean,
    visibile?: boolean
  ) {
    this.requerido = requerido || false;
    this.visibile = visibile || true;
  }
}

export interface iInputOption {
  value: any;
  index: number;
}

export interface iFieldReference {
  ID: string;
  etiqueta: string;
  index: number;
  visibile: boolean;
}
