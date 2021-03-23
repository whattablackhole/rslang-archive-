import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SavannahPageComponent } from './components/savannah-page/savannah-page.component';
import { SavannahRoutingModule } from './savannah-routing.module';

@NgModule({
  declarations: [SavannahPageComponent],
  imports: [CommonModule, SavannahRoutingModule],
})
export class SavannahModule {}
