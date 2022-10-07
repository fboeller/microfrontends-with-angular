import { Component, OnInit } from '@angular/core';
import { Booking, BookingService } from '../booking.service';

@Component({
  selector: 'mf-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css'],
})
export class BookingListComponent implements OnInit {
  public bookings: Booking[] = [];

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.bookings = this.bookingService.getBookings();
  }
}
