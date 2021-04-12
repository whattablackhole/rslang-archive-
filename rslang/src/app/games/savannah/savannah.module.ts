import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Savannah } from './components/savannah/savannah.component';
import { SavannahRoutingModule } from './savannah-routing.module';

@NgModule({
  declarations: [Savannah],
  imports: [CommonModule, SavannahRoutingModule],
})
export class SavannahModule {}
