import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HotToastModule } from '@ngneat/hot-toast';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationLoaderProvider } from '../translation-loader.provider';
import { BookingComponent } from './booking.component';

@NgModule({
  declarations: [BookingComponent],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: 'bookings/journey/:journeyId',
        component: BookingComponent,
      },
    ]),
    HotToastModule.forRoot(),
    TranslateModule.forRoot({
      loader: TranslationLoaderProvider,
      defaultLanguage: 'en',
    }),
  ],
  exports: [BookingComponent],
})
export class BookingModule {}
