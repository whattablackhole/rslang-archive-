import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { MainPage } from './components/main-page/main-page.component';
import { FooterModule } from '../footer/footer.module';
@NgModule({
  declarations: [MainPage],
  imports: [CommonModule, MainRoutingModule, FooterModule],
})
export class MainModule {}
