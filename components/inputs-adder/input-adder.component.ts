import { Component, OnInit, Output } from '@angular/core';
import { InputModel } from './input models/input.model';
import { InputAdderService } from './input-adder.service';

@Component({
  selector: 'Gdev-input-adder',
  templateUrl: './input-adder.component.html',
  styleUrls: ['./input-adder.component.scss']
})
export class InputAdderComponent implements OnInit {

  inputTypes
  inputModel: InputModel
  inputType: string
  inputExtras: INPUTEXTRA[] = []
  
  INPUT: any
  
  constructor(
    public _inputAdder: InputAdderService
  ) {
    this.inputTypes = this._inputAdder.loadInputTypes
    this.inputModel = new InputModel('', '', '', false, '','')
   }

  ngOnInit() {
    this._inputAdder.loadInputTypes()
      .subscribe(types => {
        this.inputTypes = types
      })
    
    $('#info').trigger('autoresize');
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
    console.log(e.target)
  }

  async onCreate() {
    await this.waitFor(100)
    console.log(this.inputModel)
    await this._inputAdder.addInput(this.inputModel)
    this.inputModel = new InputModel('', '', '', false)
  }

}


export interface INPUTEXTRA { key: string, value: any}
