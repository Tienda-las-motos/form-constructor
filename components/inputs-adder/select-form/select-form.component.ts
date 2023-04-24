import { Component, OnInit } from '@angular/core';
import { InputAdderService } from '../input-adder.service';

@Component({
  selector: 'Gdev-select-form',
  templateUrl: './select-form.component.html',
  styleUrls: ['./select-form.component.scss'],
})
export class SelectFormComponent implements OnInit {
  nuevaOpcion: string = '';
  constructor(public _adder: InputAdderService) {}

  ngOnInit() {}

  waitFor = (ms: number) => new Promise((r) => setTimeout(r, ms));
}
