import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RangeModel } from './range-input.model';
import * as noUiSlider from "nouislider";
import wNumb from 'wnumb'

@Component({
  selector: 'Gdev-range',
  templateUrl: './range.component.html',
  styleUrls: ['./range.component.scss']
})
export class RangeComponent implements OnInit {

  waitFor = (ms: any) => new Promise(r => setTimeout(r, ms))
  @Input() input: RangeModel
  @Input() value: any
  @Input() steps: any
  @Output() getValue: EventEmitter<any> = new EventEmitter()

  constructor() {
    this.input = new RangeModel('', '', false, 0, 0, 100, 0, true)
   }

  async ngOnInit() {
    await this.waitFor(500)
    await this.setValue()
    this.sliderInit()
    this.getValues()
  }


  sliderInit() {
    var slider = document.getElementById(`${this.input.ID}-slider`) as noUiSlider.target
    if (this.input.minValue == 0) this.input.minValue = this.input.minCant
    if (this.input.maxValue == 0) this.input.maxValue = this.input.maxCant





    let range: noUiSlider.PipsMode.Range = "range" as noUiSlider.PipsMode.Range;
    noUiSlider.create(slider, {
      start: [this.input.minValue, this.input.maxValue],
      connect: true,
      range: {
          'min': +this.input.minCant,
          'max': +this.input.maxCant
      },
      pips: {
        mode: range,
        density: 3
      },
      tooltips: true,
      step: this.input.steps,
      format: wNumb({ decimals: 0 }),
      behaviour: "tap-drag"
    })

    if (this.steps) {
      // noUiSlider.updateOptions(
      // 	{step: this.steps,}, // Object
      // );
    }

  }

  setValue() {
      if (typeof this.value === 'object') {

        return this.value[this.input.ID] ? (
          this.input.minValue = this.value[this.input.ID].min,
          this.input.maxValue = this.value[this.input.ID].max
        ) : (
            this.input.minValue = 0,
            this.input.maxValue = 0
        )


      } else {

        return this.value ? (
          this.input.minValue = this.value[this.input.ID].min,
          this.input.maxValue = this.value[this.input.ID].max
        ) : (
            this.input.minValue = 0,
            this.input.maxValue = 0
        )

      }
  }

  getValues() {
    var slider: noUiSlider.target = document.getElementById(`${this.input.ID}-slider`) as noUiSlider.target

    slider.noUiSlider?.on('change', (values: any) => {

      this.getValue.emit({
        key: 'min'+this.input.ID,
        value: +values[0]
      })
      this.getValue.emit({
        key: 'max'+this.input.ID,
        value: +values[1]
      })
    })
  }

}
