import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  book(
    _journeyId: string,
    _options: { reserveSeat: boolean; firstClass: boolean }
  ): Observable<void> {
    return of(null as unknown as void);
  }
}
