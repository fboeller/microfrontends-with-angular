import { CommonModule, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HotToastModule } from '@ngneat/hot-toast';
import { TranslateModule } from '@ngx-translate/core';
import { NoComponent, NoopLocationStrategy } from 'ngx-elements-router';
import { environmentModules } from '../environments/environment';
import { BookingComponent } from './booking/booking.component';
import { EntryComponent } from './entry.component';
import { TranslationLoaderProvider } from './translation-loader.provider';

@NgModule({
  declarations: [EntryComponent, BookingComponent],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: 'bookings/journey/:id',
        component: BookingComponent,
      },
      { path: '**', component: NoComponent },
    ]),
    environmentModules,
    HotToastModule.forRoot(),
    TranslateModule.forRoot({
      loader: TranslationLoaderProvider,
      defaultLanguage: 'en',
    }),
  ],
  exports: [BookingComponent],
  providers: [{ provide: LocationStrategy, useClass: NoopLocationStrategy }],
})
export class BookingModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap(): void {
    const customElement = createCustomElement(EntryComponent, {
      injector: this.injector,
    });
    window.customElements.define('mf-bookings-entry', customElement);
    console.log(`Defined the custom element 'mf-bookings-entry'`);
  }
}
