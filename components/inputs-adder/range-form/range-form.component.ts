import { Component, OnInit } from '@angular/core';
import { InputAdderService } from '../input-adder.service';

@Component({
  selector: 'Gdev-range-form',
  templateUrl: './range-form.component.html',
  styleUrls: ['./range-form.component.scss']
})
export class RangeFormComponent implements OnInit {

  constructor(public _adder: InputAdderService) { }

  ngOnInit() {
  }

}
