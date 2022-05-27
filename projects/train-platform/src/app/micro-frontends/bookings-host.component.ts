import { Component } from '@angular/core';

@Component({
  selector: 'app-host',
  template: `
    <mf-bookings-entry
      microFrontendRouting
      microFrontendZone
      microFrontendLanguage
    ></mf-bookings-entry>
  `,
})
export class BookingsHostComponent {}
