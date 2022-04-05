import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Journey } from './journey.type';

@Injectable({
  providedIn: 'root',
})
export class JourneysService {
  loadJourneys(): Observable<Journey[]> {
    return of([
      { id: '1', from: 'Vienna', to: 'Prague' },
      { id: '2', from: 'Munich', to: 'Paris' },
    ]);
  }
}
