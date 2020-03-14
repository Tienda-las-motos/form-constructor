import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NumberInputModel, Colores } from './number-input.model';

@Component({
  selector: 'Gdev-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.scss']
})
export class NumberInputComponent implements OnInit {

  @Input() input: NumberInputModel

  @Input() value
  @Output() getValue: EventEmitter<number> = new EventEmitter()
  constructor() {
    this.input = new NumberInputModel('','',false)
   }

  ngOnInit() {
  }

  setValue() {
    if (typeof this.value === 'object') {
      return this.value ? this.value[this.input.ID] : false
    } else {
      return this.value ? this.value : false
    }
  }
  

}
