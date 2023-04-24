import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NumberInputModel, Colores } from './number-input.model';

@Component({
  selector: 'Gdev-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.scss'],
})
export class NumberInputComponent implements OnInit {
  @Input() input: NumberInputModel;

  @Input() value: any;
  @Output() getValue: EventEmitter<any> = new EventEmitter();
  constructor() {
    this.input = new NumberInputModel('', '', false);
  }

  ngOnInit() {}

  setValue() {
    if (typeof this.value === 'object') {
      return this.value ? this.value[this.input.ID] || 0 : false;
    } else {
      return this.value ? this.value : false;
    }
  }

  emitValue(input: any, event: any) {
    this.getValue.emit({
      key: input.ID,
      value: event.target.value,
    });
  }
}
