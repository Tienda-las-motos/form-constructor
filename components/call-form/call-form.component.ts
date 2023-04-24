import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { iFormResult } from 'shared/form-constructor/models/form.model';
import { FormConstructorService } from '../../form-constructor.service';
import { InputModel } from '../inputs-adder/input models/input.model';
import { InputRenderServices } from '../inputs-render/input-render.service';

@Component({
  selector: 'Gdev-call-form',
  templateUrl: './call-form.component.html',
  styleUrls: ['./call-form.component.css'],
})
export class CallFormComponent implements OnInit {
  public waitFor = (ms: number) => new Promise((r) => setTimeout(r, ms));
  public Inputs: InputModel[];
  @Input() value: any;
  @Input() formName: string = '';
  @Input() collection: string = 'formularios';

  @Output() formValues: EventEmitter<{}> = new EventEmitter();
  @Output() formLoaded: EventEmitter<iFormResult> = new EventEmitter();
  @Output() emptyForm: EventEmitter<void> = new EventEmitter();

  constructor(
    private _formConst: FormConstructorService,
    private _render: InputRenderServices
  ) {
    this.Inputs = [];
  }

  ngOnInit() {
    // console.log( this.formName, this.collection )
    this.callForm();
    this._render.getValue.subscribe((res) => {
      this.formValues.emit(res);
    });
  }

  async callForm() {
    if (this.formName) {
      const formResult = await this._formConst.callFormByName(
        this.collection,
        this.formName
      );
      // console.log( formResult )
      this.Inputs = formResult.inputs;
      this.formLoaded.emit(formResult);
      if (this.Inputs.length <= 0) {
        this.emptyForm.emit();
      }
    }
  }
}
