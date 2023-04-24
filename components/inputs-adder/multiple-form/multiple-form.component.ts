import { Component, OnInit } from '@angular/core';
import { InputAdderService } from '../input-adder.service';

@Component({
  selector: 'Gdev-multiple-form',
  templateUrl: './multiple-form.component.html',
  styleUrls: ['./multiple-form.component.scss'],
})
export class MultipleFormComponent implements OnInit {
  constructor(public _adder: InputAdderService) {}

  ngOnInit() {}
}
