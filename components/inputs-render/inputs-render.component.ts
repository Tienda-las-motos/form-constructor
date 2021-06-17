import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { InputRenderServices } from './input-render.service';

@Component({
  selector: 'Gdev-inputs-render',
  templateUrl: './inputs-render.component.html',
  styleUrls: ['./inputs-render.component.scss']
})
export class InputsRenderComponent implements OnInit {

  @Input() input: any
  @Input() value: any

  constructor(private _render: InputRenderServices) { }

  ngOnInit() {
  }

  catchValue(res:any) {
    // console.log(res)
    this._render.storeValue(res.key, res.value)
  }

}
