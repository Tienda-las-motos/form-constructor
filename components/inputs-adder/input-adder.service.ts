import { Injectable, QueryList, ViewChildren } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { InputModel } from './input models/input.model';
import { InputTypes } from './input models/inputTypes.model';

@Injectable({
  providedIn: 'root'
})
export class InputAdderService {

  $Input: any
  @ViewChildren('opcionInput') opcionInputs!: QueryList<HTMLInputElement>
  constructor() {
    this.$Input = {}
   }
  waitFor = (ms: number) => new Promise(r => setTimeout(r, ms))

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

    let lastOpcion: HTMLInputElement = this.opcionInputs.last
    lastOpcion.focus()
    lastOpcion.select()
  }

    addOpcionValue(index: any, event: any) {
    this.$opcionesArray[index].value = event.targe.value
  }

  delOpcion(i: any) {
    this.$opcionesArray.splice(i, 1)
  }

  addInput(input: InputModel) {

    Object.keys(input).forEach(key => input[key as keyof InputModel] === undefined
      ? delete input[key as keyof InputModel] : {});

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


  getAttr(attr: any, event: any) {
    this.$Input[attr] = event.target.value
  }




}

export interface OPCION { value: string, index: number }
