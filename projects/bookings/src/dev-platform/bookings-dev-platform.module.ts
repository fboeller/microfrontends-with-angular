import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DevPlatformPageComponent } from './dev-platform-page/dev-platform-page.component';

@NgModule({
  declarations: [DevPlatformPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: DevPlatformPageComponent,
      },
    ]),
  ],
})
export class BookingsDevPlatformModule {}
