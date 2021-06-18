import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MatSelectChange } from '@angular/material/select';
import { SelectModel } from './select-input.model';

@Component({
  selector: 'Gdev-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  @Input() input: SelectModel
  @Input() value: any
  @Output() getValue: EventEmitter<any> = new EventEmitter()
  constructor() {
    this.input = new SelectModel('','',false, [])
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

  emitValue(input: any, event: MatSelectChange) {
    this.getValue.emit({
      key:input.ID,
      value:event.value
  })
  }


}
