import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Savannah } from './components/savannah/savannah.component';
import { SavannahRoutingModule } from './savannah-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [Savannah],
  imports: [CommonModule, SavannahRoutingModule, MatButtonModule, MatIconModule],
})
export class SavannahModule {}
