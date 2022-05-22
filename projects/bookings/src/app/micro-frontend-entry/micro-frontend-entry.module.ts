import { LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EntryComponent } from './entry.component';
import { NoComponent } from './no.component';
import { NoopLocationStrategy } from './noop-location-strategy';

@NgModule({
  declarations: [EntryComponent, NoComponent],
  imports: [RouterModule.forChild([])],
  providers: [{ provide: LocationStrategy, useClass: NoopLocationStrategy }],
})
export class MicroFrontendEntryModule {}
