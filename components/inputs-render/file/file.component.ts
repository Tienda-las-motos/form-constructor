import { Component, OnInit, Input } from '@angular/core';
import { FileInputModel } from './file-input.model';

@Component({
  selector: 'Gdev-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss'],
})
export class FileComponent implements OnInit {
  @Input() input: FileInputModel;
  @Input() value: any;
  constructor() {
    this.input = new FileInputModel('', '', false, '');
  }

  ngOnInit() {}
}
