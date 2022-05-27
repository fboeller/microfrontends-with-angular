import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Journey } from '../journey.type';
import { JourneysService } from '../journeys.service';

@Component({
  selector: 'app-journey-selection',
  templateUrl: './journey-selection.component.html',
  styleUrls: ['./journey-selection.component.css'],
})
export class JourneySelectionComponent {
  journeys$: Observable<Journey[]>;

  constructor(journeysService: JourneysService) {
    this.journeys$ = journeysService.loadJourneys();
  }
}
