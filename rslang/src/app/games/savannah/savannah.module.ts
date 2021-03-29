import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SavannahPage } from './components/savannah-page/savannah-page.component';
import { SavannahRoutingModule } from './savannah-routing.module';

@NgModule({
  declarations: [SavannahPage],
  imports: [CommonModule, SavannahRoutingModule],
})
export class SavannahModule {}
