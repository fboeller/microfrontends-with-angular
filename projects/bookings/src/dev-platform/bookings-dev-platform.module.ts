import { CommonModule } from '@angular/common';
import { DoBootstrap, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { BookingModule } from '../app/booking/booking.module';
import { DevPlatformNavbarComponent } from './dev-platform-navbar/dev-platform-navbar.component';
import { DevPlatformPageComponent } from './dev-platform-page/dev-platform-page.component';

@NgModule({
  declarations: [DevPlatformPageComponent, DevPlatformNavbarComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: '',
        pathMatch: 'full',
        component: DevPlatformPageComponent,
      },
    ]),
    TranslateModule.forChild(),
    BookingModule,
  ],
  bootstrap: [DevPlatformNavbarComponent],
})
export class BookingsDevPlatformModule implements DoBootstrap {
  ngDoBootstrap(): void {}
}
