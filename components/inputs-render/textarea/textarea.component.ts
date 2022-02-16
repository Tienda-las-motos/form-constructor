import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TextareaInputModel, Colores } from './textarea.model';

@Component({
  selector: 'Gdev-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent implements OnInit {

  @Input() input: TextareaInputModel
  constructor() {
    this.input = new TextareaInputModel('','', false)
   }

  ngOnInit() {
    // $('#textarea1').trigger('autoresize');
  }

  @Input() value:any
  @Output() getValue: EventEmitter<any> = new EventEmitter()

  setValue() {
    if (typeof this.value === 'object') {
      return this.value ? (this.value[this.input.ID] || '') : false
    } else {
      return this.value ? this.value : false
    }
  }

  emitValue(input: any, event: any) {
    this.getValue.emit({
      key:input.ID,
      value:event.target.value
  })
  }
}
