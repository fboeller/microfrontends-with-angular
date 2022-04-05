import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JourneySelectionComponent } from './journey-selection/journey-selection.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [JourneySelectionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    TranslateModule.forChild(),
  ],
  exports: [JourneySelectionComponent],
})
export class JourneyModule {}
