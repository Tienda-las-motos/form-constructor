import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SwitchModel } from './switch-input.model';
import { MatSlideToggleChange } from '@angular/material';

@Component({
  selector: 'Gdev-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent implements OnInit {

  @Input() input: SwitchModel
  @Input() value
  @Output() getValue: EventEmitter<any> = new EventEmitter()
  constructor() {
    this.input = new SwitchModel('','',false, '','')
   }

  ngOnInit() {
  }

  onSwitch(event) {
    this.getValue.emit({key:event.source.id, value: event.checked})
  }

  setValue() {
    if (typeof this.value === 'object') {
      return this.value ? this.value[this.input.ID] : false
    } else {
      return this.value ? this.value : false
    }
  }

}
