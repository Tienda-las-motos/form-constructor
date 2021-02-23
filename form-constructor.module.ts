import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormConstructorRoutingModule } from "./form-constructor-routing.module";
import { FormConstructorComponent } from "./form-constructor.component";
import { NewFormComponent } from './components/new-form/new-form.component';

import { DragDropModule } from "@angular/cdk/drag-drop";
import { MaterialModule } from 'src/app/material.module';

import { InputAdderComponent } from './components/inputs-adder/input-adder.component';
import { NumberFormComponent } from "./components/inputs-adder/number-form/number-form.component";
import { SelectFormComponent } from './components/inputs-adder/select-form/select-form.component';
import { RadiusFormComponent } from './components/inputs-adder/radius-form/radius-form.component';
import { SwitchFormComponent } from './components/inputs-adder/switch-form/switch-form.component';
import { MultipleFormComponent } from './components/inputs-adder/multiple-form/multiple-form.component';
import { RangeFormComponent } from './components/inputs-adder/range-form/range-form.component';
import { LevelFormComponent } from './components/inputs-adder/level-form/level-form.component';
import { DateFormComponent } from './components/inputs-adder/date-form/date-form.component';
import { TimeFormComponent } from './components/inputs-adder/time-form/time-form.component';
import { FileFormComponent } from './components/inputs-adder/file-form/file-form.component';

import { InputRenderModule } from "./components/inputs-render/input-render.module";
import { InputsRenderComponent } from './components/inputs-render/inputs-render.component';
import { CallFormComponent } from './components/call-form/call-form.component';



@NgModule({
  declarations: [
    FormConstructorComponent,
    NewFormComponent,
    InputAdderComponent,
    CallFormComponent,
    NumberFormComponent,
    SelectFormComponent,
    RadiusFormComponent,
    SwitchFormComponent,
    MultipleFormComponent,
    RangeFormComponent,
    LevelFormComponent,
    DateFormComponent,
    TimeFormComponent,
    FileFormComponent,
    InputsRenderComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormConstructorRoutingModule,
    InputRenderModule,
    MaterialModule,
    DragDropModule,
  ],
  exports: [
    NewFormComponent,
    InputsRenderComponent,
    CallFormComponent
  ]
})
export class FormConstructorModule { }
