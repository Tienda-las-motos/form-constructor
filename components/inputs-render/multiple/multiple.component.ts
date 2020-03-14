import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MultipleModel } from './multiple-input.model';

@Component({
  selector: 'Gdev-multiple',
  templateUrl: './multiple.component.html',
  styleUrls: ['./multiple.component.scss']
})
export class MultipleComponent implements OnInit {

  @Input() input: MultipleModel
  opciones: string[] = []
  @Input() value
  @Output() getValue: EventEmitter<any> = new EventEmitter()

  constructor() {
    this.input = new MultipleModel('','',false, [])
   }

  ngOnInit() {
  }

  toggleOpcion(opcion, selected) {
    if (selected) {
      this.opciones.push(opcion)
    } else {

      var itemIndex = this.opciones.findIndex(opc => opc == opcion)

      this.opciones.splice(itemIndex, 1)

    }

    this.getValue.emit({
            key:this.input.ID, 
            value:this.opciones
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
