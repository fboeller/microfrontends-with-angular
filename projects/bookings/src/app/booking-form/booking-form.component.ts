import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BookingService } from '../booking.service';

@Component({
  selector: 'mf-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css'],
})
export class BookingFormComponent implements OnInit {
  reserveSeat = false;
  firstClass = false;
  journeyId$!: Observable<string>;

  constructor(
    private bookingService: BookingService,
    private route: ActivatedRoute,
    private toast: HotToastService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.journeyId$ = this.route.params.pipe(
      map((params) => params.journeyId),
      filter((journeyId) => journeyId)
    );
  }

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
