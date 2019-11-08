import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ChartModule, DatetimePickerModule, GridModule, QueryService } from 'eediom-sdk';

import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    FormsModule,
    GridModule,
    ChartModule,
    DatetimePickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  providers: [QueryService],
})
export class DashboardModule {}
