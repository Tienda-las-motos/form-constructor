import { iFieldReference } from "../components/inputs-adder/input models/input.model"

export class FormModel {
  public nombre: string
  public collection: string
  public inputs: iFieldReference[]
  public atributos?: any
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
