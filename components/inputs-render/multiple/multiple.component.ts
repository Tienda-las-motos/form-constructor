import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MatSelectChange } from '@angular/material/select';
import { MultipleModel } from './multiple-input.model';

@Component({
  selector: 'Gdev-multiple',
  templateUrl: './multiple.component.html',
  styleUrls: ['./multiple.component.scss'],
})
export class MultipleComponent implements OnInit {
  @Input() input: MultipleModel;
  opciones: string[] = [];
  @Input() value: any;
  @Output() getValue: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.input = new MultipleModel('', '', false, []);
  }

  ngOnInit() {}

  toggleOpcion(selected: MatSelectChange) {
    this.opciones = selected.value;

    this.getValue.emit({
      key: this.input.ID,
      value: this.opciones,
    });
  }

  setValue() {
    if (typeof this.value === 'object') {
      return this.value ? this.value[this.input.ID] : false;
    } else {
      return this.value ? this.value : false;
    }
  }
}
