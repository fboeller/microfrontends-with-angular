import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HotToastModule } from '@ngneat/hot-toast';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationLoaderProvider } from '../translation-loader.provider';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { BookingListComponent } from './booking-list/booking-list.component';

@NgModule({
  declarations: [BookingFormComponent, BookingListComponent],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: 'bookings/journey/:journeyId',
        component: BookingFormComponent,
      },
      {
        path: 'bookings',
        component: BookingListComponent,
      },
    ]),
    HotToastModule.forRoot(),
    TranslateModule.forRoot({
      loader: TranslationLoaderProvider,
      defaultLanguage: 'en',
    }),
  ],
  exports: [BookingFormComponent],
})
export class BookingModule {}
