import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { TranslateService } from '@ngx-translate/core';
import { BookingService } from '../booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent {
  reserveSeat = false;
  firstClass = false;

  constructor(
    private bookingService: BookingService,
    private route: ActivatedRoute,
    private toast: HotToastService,
    private translateService: TranslateService
  ) {}

  book(): void {
    this.bookingService
      .book(this.route.snapshot.params.journeyId, {
        reserveSeat: this.reserveSeat,
        firstClass: this.firstClass,
      })
      .subscribe(
        () => {
          this.toast.success(
            this.translateService.instant('booking.confirmation')
          );
        },
        () => {
          this.toast.error(this.translateService.instant('booking.error'));
        }
      );
  }
}
