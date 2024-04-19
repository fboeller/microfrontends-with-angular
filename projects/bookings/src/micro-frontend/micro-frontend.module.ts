import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BookingModule } from '../app/booking.module';
import { EntryComponent } from './entry.component';
@NgModule({
  declarations: [EntryComponent],
  imports: [BookingModule],
})
export class MicroFrontendModule implements DoBootstrap {
  constructor(private injector: Injector) {}

  ngDoBootstrap(): void {
    const customElement = createCustomElement(EntryComponent, {
      injector: this.injector,
    });
    window.customElements.define('mf-bookings-entry', customElement);
    console.log('Registered custom element mf-bookings-entry');
  }
}
