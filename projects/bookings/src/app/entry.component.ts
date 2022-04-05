import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
} from '@angular/core';
import {
  EntryZoneService,
  EntryRoutingService,
  RouterEvent,
} from 'ngx-elements-router';
import { Observable, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'mf-angular-entry',
  template: `<router-outlet></router-outlet>`,
})
export class EntryComponent implements OnChanges, OnDestroy {
  private route$ = new Subject<string | undefined>();
  @Input() route?: string;
  @Output() routeChange = new EventEmitter<RouterEvent>();

  @Input() microtaskEmpty$?: Observable<void>;
  microtaskEmpty$$ = new Subject<Observable<void>>();

  private readonly subscription: Subscription;

  constructor(
    private entryRoutingService: EntryRoutingService,
    private entryZoneService: EntryZoneService
  ) {
    const routingSubscription = this.entryRoutingService.registerRouting(
      this.routeChange,
      this.route$
    );
    const zoneSubscription = this.entryZoneService.registerZone(
      this.microtaskEmpty$$
    );
    this.subscription = routingSubscription.add(zoneSubscription);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnChanges(): void {
    this.route$.next(this.route);
    this.microtaskEmpty$$.next(this.microtaskEmpty$);
  }
}