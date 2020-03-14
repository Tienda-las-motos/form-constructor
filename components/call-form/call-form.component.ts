import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormConstructorService } from '../../form-constructor.service';
import { InputModel } from '../inputs-adder/input models/input.model';
import { InputRenderServices } from '../inputs-render/input-render.service';

@Component({
  selector: 'Gdev-call-form',
  templateUrl: './call-form.component.html',
  styleUrls: ['./call-form.component.css']
})
export class CallFormComponent implements OnInit {

  public waitFor = (ms: number) => new Promise(r => setTimeout(r, ms))
  public Inputs: InputModel[]
  @Input() value: any
  @Input() formName: string
  @Input() collection: string
  @Output() formValues: EventEmitter<{}> = new EventEmitter()

  constructor(
    private _formConst: FormConstructorService,
    private _render: InputRenderServices
  ) {
    this.Inputs = []
    if (!this.collection) this.collection = 'formularios'
   }

  ngOnInit() {
    this.callForm()
    this._render.getValue.subscribe(res => {
      console.log(res)
      this.formValues.emit(res)
    })
  }

  callForm() {
    if (this.formName) {
      this._formConst.callForm(this.collection, this.formName)
        .then(res => { this.Inputs = res.inputs })
    }
  }

}
