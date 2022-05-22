import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MicroFrontendModule } from './micro-frontend/micro-frontend.module';
import { BookingsDevPlatformModule } from './dev-platform/bookings-dev-platform.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const bootstrapModule = !environment.production
  ? BookingsDevPlatformModule
  : MicroFrontendModule;

platformBrowserDynamic()
  .bootstrapModule(bootstrapModule)
  .catch((err) => console.error(err));
