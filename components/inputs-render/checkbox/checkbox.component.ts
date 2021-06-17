import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CheckboxModel } from './checkbox.model';

@Component({
  selector: 'Gdev-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {

  @Input() input: CheckboxModel
  @Input() value: any
  @Output() getValue: EventEmitter<any> = new EventEmitter()
  constructor() {
    this.input = new CheckboxModel('','',false)
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

  emitValue(input: any, event: any) {
    this.getValue.emit({
      key:input.ID,
      value:event.target.value
  })
  }

}
