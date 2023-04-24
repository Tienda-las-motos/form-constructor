import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RadiusModel } from './radius-input.model';

@Component({
  selector: 'Gdev-radius',
  templateUrl: './radius.component.html',
  styleUrls: ['./radius.component.scss'],
})
export class RadiusComponent implements OnInit {
  @Input() input: RadiusModel;
  @Input() value: any;
  @Output() getValue: EventEmitter<any> = new EventEmitter();
  constructor() {
    this.input = new RadiusModel('', '', false, []);
  }

  ngOnInit() {}

  setValue() {
    if (typeof this.value === 'object') {
      return this.value ? this.value[this.input.ID] : false;
    } else {
      return this.value ? this.value : false;
    }
  }
}
