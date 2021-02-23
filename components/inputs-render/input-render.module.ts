import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { TextInputComponent } from './text-input/text-input.component';
import { NumberInputComponent } from './number-input/number-input.component';
import { TextareaComponent } from './textarea/textarea.component';
import { SelectComponent } from './select/select.component';
import { RadiusComponent } from './radius/radius.component';
import { SwitchComponent } from './switch/switch.component';
import { RangeComponent } from './range/range.component';
import { LevelComponent } from './level/level.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { TimepickerComponent } from './timepicker/timepicker.component';
import { FileComponent } from './file/file.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { MultipleComponent } from './multiple/multiple.component';
import { InfoBoxComponent } from './info-box/info-box.component';
import { MaterialModule } from 'src/app/material.module';



@NgModule({
  declarations: [
    TextInputComponent,
    NumberInputComponent,
    TextareaComponent,
    SelectComponent,
    RadiusComponent,
    SwitchComponent,
    RangeComponent,
    LevelComponent,
    DatepickerComponent,
    TimepickerComponent,
    FileComponent,
    CheckboxComponent,
    MultipleComponent,
    InfoBoxComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    TextInputComponent,
    NumberInputComponent,
    TextareaComponent,
    SelectComponent,
    RadiusComponent,
    SwitchComponent,
    RangeComponent,
    LevelComponent,
    DatepickerComponent,
    TimepickerComponent,
    FileComponent,
    CheckboxComponent,
    MultipleComponent,
    InfoBoxComponent,
  ]
})
export class InputRenderModule { }
