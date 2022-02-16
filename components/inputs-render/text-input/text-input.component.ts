import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { TextInputModel, Colores } from './text-input.model';

@Component({
  selector: 'Gdev-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent implements OnInit {

  waitFor = (ms: number) => new Promise(r => setTimeout(r, ms))

  @Input() input: TextInputModel
  @Input() colores?: Colores

  @Input() value: any
  @Output() getValue: EventEmitter<any> = new EventEmitter()
  constructor() {
    this.input = new TextInputModel('','', false)
  }

  async ngOnInit() {
    await this.waitFor(2000)
  }

  setValue() {
    // console.log( this.value )
    // console.log( this.value[this.input.ID] )
    if (typeof this.value === 'object') {
      return this.value ? (this.value[this.input.ID] || '') : ''
    } else {
      return this.value ? this.value : ''
    }
  }

  emitValue(input: any, event: any) {
    this.getValue.emit({
      key:input.ID,
      value:event.target.value
  })
  }


}
