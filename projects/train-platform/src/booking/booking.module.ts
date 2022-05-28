import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HotToastModule } from '@ngneat/hot-toast';
import { TranslateModule } from '@ngx-translate/core';
import { BookingFormComponent } from './booking-form/booking-form.component';

@NgModule({
  declarations: [BookingFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: 'journey/:journeyId',
        component: BookingFormComponent,
        data: { title: 'Book journey' },
      },
    ]),
    HotToastModule.forRoot(),
    TranslateModule.forChild(),
  ],
})
export class BookingModule {}
