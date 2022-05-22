import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HotToastModule } from '@ngneat/hot-toast';
import { TranslateModule } from '@ngx-translate/core';
import { BookingsDevPlatformModule } from '../dev-platform/bookings-dev-platform.module';
import { environment, environmentModules } from '../environments/environment';
import { BookingComponent } from './booking/booking.component';
import { EntryComponent } from './micro-frontend-entry/entry.component';
import { MicroFrontendEntryModule } from './micro-frontend-entry/micro-frontend-entry.module';
import { TranslationLoaderProvider } from './translation-loader.provider';

@NgModule({
  declarations: [BookingComponent],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: 'bookings/journey/:journeyId',
        component: BookingComponent,
      },
    ]),
    environmentModules,
    MicroFrontendEntryModule,
    HotToastModule.forRoot(),
    TranslateModule.forRoot({
      loader: TranslationLoaderProvider,
      defaultLanguage: 'en',
    }),
  ],
  exports: [BookingComponent],
})
export class BookingModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap(): void {
    const customElement = createCustomElement(EntryComponent, {
      injector: this.injector,
    });
    window.customElements.define('mf-bookings-entry', customElement);
    console.log(`Defined the custom element 'mf-bookings-entry'`);
    if (!environment.production) {
      BookingsDevPlatformModule.createDevPlatformNavbarElement(this.injector);
    }
  }
}
