import { Component } from '@angular/core';

@Component({
  selector: 'app-host',
  template: `
    <mf-bookings-entry
      aerRouting
      microFrontendZone
      microFrontendLanguage
    ></mf-bookings-entry>
  `,
})
export class MicroFrontendHostComponent {}
