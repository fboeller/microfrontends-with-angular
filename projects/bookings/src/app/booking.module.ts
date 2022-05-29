import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HotToastModule } from '@ngneat/hot-toast';
import { TranslateModule } from '@ngx-translate/core';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { BookingComponent } from './booking.component';

@NgModule({
  declarations: [BookingComponent, BookingFormComponent],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: 'journey/:journeyId',
        component: BookingFormComponent,
        data: { title: 'Book journey' },
      },
    ]),
    HotToastModule.forRoot(),
    TranslateModule.forRoot(),
  ],
  bootstrap: [BookingComponent],
})
export class BookingModule {}
