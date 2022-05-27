import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { MicroFrontendRegistryService } from './micro-frontend-registry.service';

@Injectable({ providedIn: 'root' })
export class LoadMicroFrontendGuard implements CanActivate {
  constructor(
    private microFrontendRegistryService: MicroFrontendRegistryService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    const bundleUrl = route.data.bundleUrl as unknown;
    if (!(typeof bundleUrl === 'string')) {
      console.error(`
        The LoadMicroFrontendGuard is missing information on which bundle to load.
        Did you forget to provide a bundleUrl: string as data to the route?
      `);
      return Promise.resolve(false);
    }
    return this.microFrontendRegistryService.loadBundle(bundleUrl);
  }
}
