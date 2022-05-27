import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Booking {
  id: string;
  journeyId: string;
  options: { reserveSeat: boolean; firstClass: boolean };
}

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private bookings: Booking[] = [];
  private autoIncrementId = 1;

  book(
    journeyId: string,
    options: { reserveSeat: boolean; firstClass: boolean }
  ): Observable<Booking> {
    const booking = { id: `${this.autoIncrementId}`, journeyId, options };
    this.autoIncrementId++;
    this.bookings.push(booking);
    return of(booking);
  }

  getBookings(): Booking[] {
    return this.bookings;
  }
}
