import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  EntryRoutingService,
  EntryZoneService,
  RouterEvent,
} from 'ngx-elements-router';
import { Observable, Subject, Subscription } from 'rxjs';
import { Language } from '../translation-loader.provider';

@Component({
  template: `<router-outlet></router-outlet>`,
})
export class EntryComponent implements OnChanges, OnDestroy {
  private route$ = new Subject<string | undefined>();
  @Input() route?: string;
  @Output() routeChange = new EventEmitter<RouterEvent>();

  @Input() microtaskEmpty$?: Observable<void>;
  microtaskEmpty$$ = new Subject<Observable<void>>();

  @Input() language?: Language;

  private readonly subscription: Subscription;

  constructor(
    private entryRoutingService: EntryRoutingService,
    private entryZoneService: EntryZoneService,
    private translateService: TranslateService
  ) {
    const routingSubscription = this.entryRoutingService.registerRouting(
      this.routeChange,
      this.route$
    );
    const zoneSubscription = this.entryZoneService.registerZone(
      this.microtaskEmpty$$
    );
    this.subscription = routingSubscription.add(zoneSubscription);
    this.translateService.setDefaultLang('en'); // TODO: check if this is needed
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // TODO: consider only emitting when specific input changed.
    this.route$.next(this.route);
    this.microtaskEmpty$$.next(this.microtaskEmpty$);
    if (changes.language && this.language) {
      this.translateService.use(this.language);
    }
  }
}
