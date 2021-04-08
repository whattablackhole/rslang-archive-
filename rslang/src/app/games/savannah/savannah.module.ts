import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedModule } from 'src/app/shared/shared.module';
import { Savannah } from './components/savannah/savannah.component';
import { SavannahRoutingModule } from './savannah-routing.module';

@NgModule({
  declarations: [Savannah],
  imports: [
    CommonModule,
    SharedModule,
    SavannahRoutingModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule],
})
export class SavannahModule {}
