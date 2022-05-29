import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from './environments/environment';
import { MicroFrontendModule } from './micro-frontend/micro-frontend.module';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(MicroFrontendModule)
  .catch((err) => console.error(err));
