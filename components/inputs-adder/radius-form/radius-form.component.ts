import { Component, OnInit } from '@angular/core';
import { InputAdderService } from '../input-adder.service';

@Component({
  selector: 'Gdev-radius-form',
  templateUrl: './radius-form.component.html',
  styleUrls: ['./radius-form.component.scss'],
})
export class RadiusFormComponent implements OnInit {
  constructor(public _adder: InputAdderService) {}

  ngOnInit() {}
}
