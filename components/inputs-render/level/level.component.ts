import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LevelModel } from './level-input.model';

@Component({
  selector: 'Gdev-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.scss'],
})
export class LevelComponent implements OnInit {
  @Input() input: LevelModel;
  @Input() value: any;
  @Output() getValue: EventEmitter<any> = new EventEmitter();
  constructor() {
    this.input = new LevelModel('', '', false, 0, 100);
  }

  ngOnInit() {}

  setValue() {
    if (typeof this.value === 'object') {
      return this.value ? this.value[this.input.ID] : false;
    } else {
      return this.value ? this.value : false;
    }
  }

  emitValue(input: any, event: any) {
    this.getValue.emit({
      key: input.ID,
      value: +event.target.value || 0,
    });
  }
}
