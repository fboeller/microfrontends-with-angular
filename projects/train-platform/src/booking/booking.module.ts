import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookingComponent } from './booking/booking.component';
import { RouterModule } from '@angular/router';
import { HotToastModule } from '@ngneat/hot-toast';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [BookingComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([]),
    HotToastModule.forRoot(),
    TranslateModule.forChild(),
  ],
  exports: [BookingComponent],
})
export class BookingModule {}
