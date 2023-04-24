import { Component, OnInit } from '@angular/core';
import { InputAdderService } from '../input-adder.service';

@Component({
  selector: 'Gdev-level-form',
  templateUrl: './level-form.component.html',
  styleUrls: ['./level-form.component.scss'],
})
export class LevelFormComponent implements OnInit {
  constructor(public _adder: InputAdderService) {}

  ngOnInit() {}
}
