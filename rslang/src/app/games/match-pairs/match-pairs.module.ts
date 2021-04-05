import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatchPairs } from './components/match-pairs.component';
import { MatchPairsRoutingModule } from './match-pairs-routing.module';

@NgModule({
  declarations: [ MatchPairs ],
  imports: [ CommonModule, MatchPairsRoutingModule],
})
export class MatchPairsModule { }
