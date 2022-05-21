import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { environmentModules } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { EntryComponent } from './entry.component';
import { MicroFrontendComponent } from './micro-frontend.component';

@NgModule({
  declarations: [EntryComponent, MicroFrontendComponent],
  imports: [BrowserModule, environmentModules, AppRoutingModule],
  providers: [],
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap(): void {
    const customElement = createCustomElement(EntryComponent, {
      injector: this.injector,
    });
    window.customElements.define('mf-entry', customElement);
    console.log(`Defined the custom element 'mf-entry'`);
  }
}
