import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SwitchModel } from './switch-input.model';

@Component({
  selector: 'Gdev-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent implements OnInit {

  @Input() input: SwitchModel
  @Input() value:any
  @Output() getValue: EventEmitter<any> = new EventEmitter()
  constructor() {
    this.input = new SwitchModel('','',false, '','')
   }

  ngOnInit() {
  }

  onSwitch(event: any) {
    this.getValue.emit({key:event.source.id, value: event.checked})
  }

  setValue() {
    if (typeof this.value === 'object' && this.input.ID) {
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
