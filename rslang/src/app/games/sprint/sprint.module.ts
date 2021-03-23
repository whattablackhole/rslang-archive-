import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SprintPageComponent } from './components/sprint-page/sprint-page.component';
import { SprintRoutingModule } from './sprint-routing.module';

@NgModule({
  declarations: [SprintPageComponent],
  imports: [CommonModule, SprintRoutingModule],
})
export class SprintModule {}
