import { Component, OnInit, Output, ViewEncapsulation, Input } from '@angular/core';
import { InputModel } from './input models/input.model';
import { InputAdderService } from './input-adder.service';
import { InputTypes } from "./input models/inputTypes.model";
import { FormConstructorService } from '../../form-constructor.service';

@Component({
  selector: 'Gdev-input-adder',
  templateUrl: './input-adder.component.html',
  styleUrls: ['./input-adder.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InputAdderComponent implements OnInit {

  inputTypes: any
  @Input() selectedInputTypes: any[] = []
  inputModel: InputModel
  inputType: string = ''
  inputExtras: INPUTEXTRA[] = []

  INPUT: any

  constructor(
    public _inputAdder: InputAdderService,
    public _formConstructor: FormConstructorService
  ) {
    this.inputModel = new InputModel('', '', '', false)
   }

  ngOnInit() {
    this._inputAdder.loadInputTypes()
      .subscribe(types => {
        this.inputTypes = types
      })

    // $('#info').trigger('autoresize');
    this.loadInputTypes()
  }

  loadInputTypes() {
    if (!this.selectedInputTypes) {
      // this.inputTypes = this._inputAdder.loadInputTypes
      this.inputTypes = InputTypes
    } else {
      this.inputTypes = []
      let types = InputTypes
      this.selectedInputTypes.forEach(inputType => {
        let theType = types.find(type => type.type == inputType)
        this.inputTypes.push(theType)
      })
    }
  }

  checkOptions():boolean {
    if (
      this.inputModel.tipo == 'select' ||
      this.inputModel.tipo == 'radius' ||
      this.inputModel.tipo == 'multiple'
    ) {
      return this._inputAdder.$opcionesArray.length == 0 ? true : false
    } else {
      return false
    }
  }


  checkData():boolean {
    return (
      this.inputModel.tipo == 'range' ||
        this.inputModel.tipo == 'level') && (
        !this._inputAdder.$Input['minCant'] ||
        !this._inputAdder.$Input['maxCant']
      ) ?  false :  true

  }



  waitFor = (ms: number) => new Promise(r => setTimeout(r, ms))

  onRequired(e: any) {
  }

  async onCreate() {
    await this.waitFor(100)
    await this._inputAdder.addInput(this.inputModel)
    this.inputModel = new InputModel('', '', '', false)
  }




}


export interface INPUTEXTRA { key: string, value: any}
