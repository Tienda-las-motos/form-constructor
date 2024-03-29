import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DatepickerModel, DateTime } from './datepicker.model';
declare var $: any;
declare var jQuery:any;

@Component({
  selector: 'Gdev-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {

  @Input() input: DatepickerModel
  @Input() value:any
  @Output() getValue: EventEmitter<any> = new EventEmitter()

  constructor() {
    this.input = new DatepickerModel('', '')
   }

  async ngOnInit() {
  }

  setValue() {
    const value = this.value
      ? typeof this.value === 'object'
        ? this.value[ this.input.ID ] || new Date()
        : this.value || new Date()
      : new Date()
    
    const date = 'seconds' in value
      ? new Date( value.seconds * 1000 )
      : value instanceof Date ? value : new Date( value )
    
    return date
  }

  getDate(event: MatDatepickerInputEvent<Date>) {
    this.getValue.emit({
            key: this.input.ID,
            value: event.value
          })
  }


}
