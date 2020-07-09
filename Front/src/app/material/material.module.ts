import { NgModule } from '@angular/core';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';

const MaterialComponents = [
  MatStepperModule,
  MatFormFieldModule,
  MatCardModule,
  MatAutocompleteModule,
  MatInputModule,
  MatSelectModule
];

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
