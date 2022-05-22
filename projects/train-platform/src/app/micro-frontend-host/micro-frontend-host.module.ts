import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MicroFrontendHostComponent } from './micro-frontend-host.component';
import { MicrofrontendLanguageDirective as MicroFrontendLanguageDirective } from './micro-frontend-language.directive';
import { MicroFrontendRoutingDirective } from './micro-frontend-routing.directive';
import { MicrofrontendZoneDirective as MicroFrontendZoneDirective } from './micro-frontend-zone.directive';

const routes: Routes = [
  {
    path: '**',
    component: MicroFrontendHostComponent,
  },
];

@NgModule({
  declarations: [
    MicroFrontendHostComponent,
    MicroFrontendLanguageDirective,
    MicroFrontendRoutingDirective,
    MicroFrontendZoneDirective,
  ],
  imports: [RouterModule.forChild(routes)],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MicroFrontendHostModule {}
