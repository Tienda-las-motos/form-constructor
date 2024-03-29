import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DateTime, TimepickerModel } from './timepicker.model';
declare var $:any;

@Component({
  selector: 'Gdev-timepicker',
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.scss']
})
export class TimepickerComponent implements OnInit {

  @Input() input: TimepickerModel
  datetime!: DateTime
  @Input() value: any
  @Output() getValue: EventEmitter<any> = new EventEmitter()

  constructor() {
    this.input = new TimepickerModel('', '')
   }

  ngOnInit() {
    this.initTimePicker()
  }

  getTime() {

    var today = new Date()
    var time = $('#iniciaTime').val(),
      hour = time.split(':')[0],
      min = time.split(':')[1];
    today.setHours(+hour,+min,0,0)

    this.datetime.hour = +hour
    this.datetime.min = +min
    this.getValue.emit({
      key: this.input.ID,
      value: today
    })

  }

  initTimePicker() {
    $('.timepicker').timepicker({
      sdefault: '9:00PM', // Set default time: 'now', '1:30AM', '16:30'
      fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
      twelveHour: false, // Use AM/PM or 24-hour format
      donetext: 'OK', // text for done-button
      cleartext: 'Limpiar', // text for clear-button
      canceltext: 'Cancelar', // Text for cancel-button,
      container: '.contenido', // ex. 'body' will append picker to body
      autoclose: false, // automatic close timepicker
      aftershow: function () {
        }, //Function for after opening timepicker

    });


    $('.timepicker').on('mousedown',function(event: any){
      event.preventDefault();
    })
  }

  setValue() {
    if (typeof this.value === 'object') {
      return this.value ? this.value[this.input.ID] : false
    } else {
      return this.value ? this.value : false
    }
  }

}
