import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
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
    private toast: HotToastService
  ) {}

  book(): void {
    this.bookingService
      .book(this.route.snapshot.params.journeyId, {
        reserveSeat: this.reserveSeat,
        firstClass: this.firstClass,
      })
      .subscribe(
        () => {
          this.toast
            .success(`Booked a journey with the id ${this.route.snapshot.params.journeyId}!
          Reserved Seat? ${this.reserveSeat}
          First Class? ${this.firstClass}`);
        },
        () => {
          this.toast.error(
            `Journey with the id ${this.route.snapshot.params.journeyId} could not be booked!`
          );
        }
      );
  }
}
