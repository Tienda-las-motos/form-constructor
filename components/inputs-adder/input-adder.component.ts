import { Component, OnInit, Output, ViewEncapsulation, Input } from '@angular/core';
import { InputModel } from './input models/input.model';
import { InputAdderService } from './input-adder.service';
import { InputTypes } from "./input models/inputTypes.model";

@Component({
  selector: 'Gdev-input-adder',
  templateUrl: './input-adder.component.html',
  styleUrls: ['./input-adder.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InputAdderComponent implements OnInit {

  inputTypes
  @Input() selectedInputTypes: any[]
  inputModel: InputModel
  inputType: string
  inputExtras: INPUTEXTRA[] = []
  mediaWidth: string
  
  INPUT: any
  
  constructor(
    public _inputAdder: InputAdderService
  ) {
    this.inputModel = new InputModel('', '', '', false)
   }

  ngOnInit() {
    this.responsiveFields()
    this._inputAdder.loadInputTypes()
      .subscribe(types => {
        this.inputTypes = types
      })
    
    $('#info').trigger('autoresize');
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
  
    
  
  waitFor = (ms) => new Promise(r => setTimeout(r, ms))
  
  onRequired(e) {
  }

  async onCreate() {
    await this.waitFor(100)
    await this._inputAdder.addInput(this.inputModel)
    this.inputModel = new InputModel('', '', '', false)
  }


  responsiveFields() {
    var containerWidth = $("#Gdev-new-form").width()

    if (containerWidth > 1200) {
      this.mediaWidth = 's4'
    } else if (containerWidth < 1200 && containerWidth > 900) {
      this.mediaWidth = 's6'
    } else if (containerWidth < 900 ) {
      this.mediaWidth = 's12'
    }
  }

}


export interface INPUTEXTRA { key: string, value: any}
