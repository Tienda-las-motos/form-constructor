import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from 'shared/material.module';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { FileComponent } from './file/file.component';
import { InfoBoxComponent } from './info-box/info-box.component';
import { LevelComponent } from './level/level.component';
import { MultipleComponent } from './multiple/multiple.component';
import { NumberInputComponent } from './number-input/number-input.component';
import { RadiusComponent } from './radius/radius.component';
import { SelectComponent } from './select/select.component';
import { SwitchComponent } from './switch/switch.component';
import { TextInputComponent } from './text-input/text-input.component';
import { TextareaComponent } from './textarea/textarea.component';
import { TimepickerComponent } from './timepicker/timepicker.component';

@NgModule({
  declarations: [
    TextInputComponent,
    NumberInputComponent,
    TextareaComponent,
    SelectComponent,
    RadiusComponent,
    SwitchComponent,
    LevelComponent,
    DatepickerComponent,
    TimepickerComponent,
    FileComponent,
    CheckboxComponent,
    MultipleComponent,
    InfoBoxComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
  exports: [
    TextInputComponent,
    NumberInputComponent,
    TextareaComponent,
    SelectComponent,
    RadiusComponent,
    SwitchComponent,
    LevelComponent,
    DatepickerComponent,
    TimepickerComponent,
    FileComponent,
    CheckboxComponent,
    MultipleComponent,
    InfoBoxComponent,
  ],
})
export class InputRenderModule {}
