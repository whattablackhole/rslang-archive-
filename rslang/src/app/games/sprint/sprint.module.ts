import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SprintPage } from './components/sprint-page/sprint-page.component';
import { SprintRoutingModule } from './sprint-routing.module';

@NgModule({
  declarations: [SprintPage],
  imports: [CommonModule, SprintRoutingModule],
})
export class SprintModule {}
