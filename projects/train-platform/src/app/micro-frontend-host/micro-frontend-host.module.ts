import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElementsRouterModule } from 'ngx-elements-router';
import { MicroFrontendHostComponent } from './micro-frontend-host.component';
import { MicrofrontendLanguageDirective } from './micro-frontend-language.directive';

const routes: Routes = [
  {
    path: '**',
    component: MicroFrontendHostComponent,
  },
];

@NgModule({
  declarations: [MicroFrontendHostComponent, MicrofrontendLanguageDirective],
  imports: [RouterModule.forChild(routes), ElementsRouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MicroFrontendHostModule {}
