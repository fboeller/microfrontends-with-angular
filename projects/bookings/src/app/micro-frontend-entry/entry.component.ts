import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { EntryZoneService, RouterEvent } from 'ngx-elements-router';
import { Observable, Subject, Subscription } from 'rxjs';
import { Language } from '../translation-loader.provider';

@Component({
  template: `<router-outlet></router-outlet>`,
})
export class EntryComponent implements OnChanges, OnDestroy {
  @Input() route?: string;
  @Output() routeChange = new EventEmitter<RouterEvent>();

  @Input() microtaskEmpty$?: Observable<void>;
  microtaskEmpty$$ = new Subject<Observable<void>>();

  @Input() language?: Language;

  private readonly subscription: Subscription;

  constructor(
    private entryZoneService: EntryZoneService,
    private router: Router,
    private translateService: TranslateService
  ) {
    const routingSubscription = this.registerOutgoingRouting();
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
    this.microtaskEmpty$$.next(this.microtaskEmpty$);
    if (changes.route && this.route) {
      this.router.navigateByUrl(this.route, { state: { fromPlatform: true } });
    }
    if (changes.language && this.language) {
      this.translateService.use(this.language);
    }
  }

  private registerOutgoingRouting(): Subscription {
    return this.router.events.subscribe((event) => {
      if (
        event instanceof RoutesRecognized &&
        (!this.isRouteChangeFromPlatform() || this.isRedirect(event))
      ) {
        this.routeChange.next({
          url: event.urlAfterRedirects,
          replaceUrl: this.isRedirect(event),
        });
      }
    });
  }

  private isRouteChangeFromPlatform(): boolean {
    return this.router.getCurrentNavigation()?.extras?.state?.fromPlatform;
  }

  private isRedirect(event: RoutesRecognized): boolean {
    return event.url !== event.urlAfterRedirects;
  }
}
