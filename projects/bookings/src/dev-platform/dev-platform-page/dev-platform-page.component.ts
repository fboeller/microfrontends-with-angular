import { Component } from '@angular/core';

@Component({
  selector: 'mf-dev-platform-page',
  templateUrl: './dev-platform-page.component.html',
})
export class DevPlatformPageComponent {
  journeys: { id: string }[] = [{ id: '1' }, { id: '2' }];
}
