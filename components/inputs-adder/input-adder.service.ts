import { Injectable } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { InputModel } from './input models/input.model';
import { InputTypes } from './input models/inputTypes.model';

@Injectable({
  providedIn: 'root'
})
export class InputAdderService {

  $Input
  constructor() {
    this.$Input = {}
   }
  waitFor = (ms) => new Promise(r => setTimeout(r, ms))

  catchNewInput = new Subject<InputModel>()
  $opcionesArray: OPCION[] = []

  loadInputTypes(): Observable<any> {
    return of(InputTypes)
  }

  async addOpcionField() {
    this.$opcionesArray.push({
      value: `Opción ${this.$opcionesArray.length + 1}`,
      index: this.$opcionesArray.length
    })
    await this.waitFor(50)
    var opciones = $('.opcion-input').toArray()
    let lastOpcion: HTMLInputElement = opciones[opciones.length - 1] as HTMLInputElement
    lastOpcion.focus()
    lastOpcion.select()
  }

    addOpcionValue(index, value) {
    this.$opcionesArray[index].value = value
  }

  delOpcion(i) {
    this.$opcionesArray.splice(i, 1)
  }

  addInput(input: InputModel) {

    Object.keys(input).forEach(key => input[key] === undefined ? delete input[key] : {});
    
    if (
      input.tipo == 'select' ||
      input.tipo == 'radius' ||
      input.tipo == 'multiple'
    ) {
      this.$Input = {...input, opciones: this.$opcionesArray}
    } else {
      this.$Input = { ...input, ...this.$Input }
    }

    this.catchNewInput.next(this.$Input)
    this.$Input = {}
    this.$opcionesArray = []
    return 
  }
  
  
  getAttr(attr, value) {
    this.$Input[attr] = value
  }




}

export interface OPCION { value: string, index: number }