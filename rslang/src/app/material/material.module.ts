import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
@NgModule({
  declarations: [],
  imports: [CommonModule, MatButtonModule, MatIconModule, MatCardModule],
  exports: [CommonModule, MatButtonModule, MatIconModule, MatCardModule],
})
export class MaterialModule {}
