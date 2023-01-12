import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { MicroFrontendRegistryService } from './micro-frontend-registry.service';

@Injectable({ providedIn: 'root' })
export class LoadMicroFrontendGuard implements CanActivate {
  constructor(
    private microFrontendRegistryService: MicroFrontendRegistryService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    const bundleUrl: Promise<string> = route.data.bundleUrl;
    if (!(typeof bundleUrl.then === 'function')) {
      console.error(`
        You need to provide the Promise which loads the frontend-meta.json
        and maps to the entryPointBundleName to the LoadMicroFrontendGuard.
        Did you forget to provide the bundleUrl as route data?
      `);
      return Promise.resolve(false);
    }
    return this.microFrontendRegistryService.loadBundle(bundleUrl);
  }
}
