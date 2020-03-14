import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RangeModel } from './range-input.model';
import * as noUiSlider from "noUiSlider";
import * as wNumb from 'wnumb'

@Component({
  selector: 'Gdev-range',
  templateUrl: './range.component.html',
  styleUrls: ['./range.component.scss']
})
export class RangeComponent implements OnInit {

  waitFor = (ms) => new Promise(r => setTimeout(r, ms))
  @Input() input: RangeModel
  @Input() value
  @Output() getValue: EventEmitter<any> = new EventEmitter()

  constructor() {
    this.input = new RangeModel('','',false,0,100)
   }

  async ngOnInit() {
    await this.waitFor(1000)
    this.sliderInit()
    this.getValues()
  }


  sliderInit() {
    var slider = document.getElementById(`${this.input.ID}-slider`)

    noUiSlider.create(slider, {
      start: [this.input.minCant, this.input.maxCant],
      connect: true,
      range: {
          'min': +this.input.minCant,
          'max': +this.input.maxCant
      },
      pips: {
        mode: 'steps',
        stepped: true,
        density: 4
      },
      tooltips: true,
      format: wNumb({
        decimals: 0
      }),
      behaviour: "tap-drag"
    })
  }

  setValue() {
    if (typeof this.value === 'object') {
      return this.value ? this.value[this.input.ID] : false
    } else {
      return this.value ? this.value : false
    }
  }

  getValues() {
    var slider: noUiSlider.Instance = document.getElementById(`${this.input.ID}-slider`) as noUiSlider.Instance

    slider.noUiSlider.on('change', (values) => {
      this.getValue.emit({
        key: this.input.ID,
        value: values
      })
    })
  }

}
