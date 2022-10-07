import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DevPlatformModule } from './dev-platform/dev-platform.module';
import { environment } from './environments/environment';
import { MicroFrontendModule } from './micro-frontend/micro-frontend.module';

if (environment.production) {
  enableProdMode();
}

const bootstrapModule = environment.embedded
  ? MicroFrontendModule
  : DevPlatformModule;

platformBrowserDynamic()
  .bootstrapModule(bootstrapModule)
  .catch((err) => console.error(err));
