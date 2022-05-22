import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { BookingModule } from './booking/booking.module';
import { EntryComponent } from './micro-frontend-entry/entry.component';
import { NoComponent } from './micro-frontend-entry/no.component';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([{ path: '**', component: NoComponent }]),
    TranslateModule.forChild(),
    BookingModule,
  ],
})
export class EmbeddedModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap(): void {
    const customElement = createCustomElement(EntryComponent, {
      injector: this.injector,
    });
    window.customElements.define('mf-bookings-entry', customElement);
    console.log(`Defined the custom element 'mf-bookings-entry'`);
  }
}
