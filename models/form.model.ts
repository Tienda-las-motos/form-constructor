export class FormModel {
  public nombre: string
  public collection: string
  public inputs: any
  public atributes?: any
  public id?: string

  constructor () {
    this.nombre = ''
    this.collection = ''
    this.inputs = []
  }

}

export interface iFormResult {
  form: FormModel;
  inputs: any[];
}
