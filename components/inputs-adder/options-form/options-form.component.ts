import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { InputAdderService } from '../input-adder.service';

@Component({
  selector: 'Gdev-options-form',
  templateUrl: './options-form.component.html',
  styleUrls: ['./options-form.component.scss']
})
export class OptionsFormComponent implements OnInit {

  nuevaOpcion: string = ''
  @ViewChildren( 'opcionInput' ) opcionInputs!: QueryList<ElementRef>
  addInput: boolean = true
  constructor(
    public _adder: InputAdderService
  ) { }

  ngOnInit() {
  }

  waitFor = ( ms: number ) => new Promise( r => setTimeout( r, ms ) )
  async addOpcionField() {
    this.addInput = false
    this._adder.$opcionesArray.push({
      value: `Opción ${this._adder.$opcionesArray.length + 1}`,
      index: this._adder.$opcionesArray.length
    })
    await this.waitFor(50)

    let lastOpcion: HTMLInputElement = this.opcionInputs.last.nativeElement
    lastOpcion.focus()
    lastOpcion.select()
  }

  onBlur( index: number, event: any ) {
    this._adder.$opcionesArray[ index ].value = event.target.value
    this.addInput = true
  }

}

