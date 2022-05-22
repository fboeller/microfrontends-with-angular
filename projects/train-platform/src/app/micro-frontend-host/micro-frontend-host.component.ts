import { Component } from '@angular/core';

@Component({
  selector: 'app-host',
  template: `
    <mf-bookings-entry
      aerRouting
      aerZone
      microfrontendLanguage
    ></mf-bookings-entry>
  `,
})
export class MicroFrontendHostComponent {}
