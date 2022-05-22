import { LocationStrategy } from '@angular/common';
import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { RouterModule } from '@angular/router';
import { BookingModule } from '../app/booking/booking.module';
import { EntryComponent } from './entry.component';
import { NoComponent } from './no.component';
import { NoopLocationStrategy } from './noop-location-strategy';

@NgModule({
  declarations: [EntryComponent, NoComponent],
  imports: [
    RouterModule.forRoot([{ path: '**', component: NoComponent }]),
    BookingModule,
  ],
  providers: [{ provide: LocationStrategy, useClass: NoopLocationStrategy }],
})
export class MicroFrontendModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap(): void {
    const customElement = createCustomElement(EntryComponent, {
      injector: this.injector,
    });
    window.customElements.define('mf-bookings-entry', customElement);
    console.log(`Defined the custom element 'mf-bookings-entry'`);
  }
}
