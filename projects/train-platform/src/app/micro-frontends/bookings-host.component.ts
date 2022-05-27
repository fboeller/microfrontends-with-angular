import { Component } from '@angular/core';

@Component({
  selector: 'app-host',
  template: `
    <mf-bookings-entry
      microFrontendRouting
      microFrontendLanguage
    ></mf-bookings-entry>
  `,
})
export class BookingsHostComponent {}
