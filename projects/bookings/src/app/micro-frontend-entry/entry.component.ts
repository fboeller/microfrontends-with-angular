import {
  ApplicationRef,
  Component,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { RouterEvent } from 'ngx-elements-router';
import { EMPTY, Observable, Subject, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
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
    private zone: NgZone,
    private applicationRef: ApplicationRef,
    private router: Router,
    private translateService: TranslateService
  ) {
    const routingSubscription = this.registerOutgoingRouting();
    const zoneSubscription = this.registerZone();
    this.subscription = routingSubscription.add(zoneSubscription);
    this.translateService.setDefaultLang('en'); // TODO: check if this is needed
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.microtaskEmpty$ && this.microtaskEmpty$) {
      this.microtaskEmpty$$.next(this.microtaskEmpty$);
    }
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

  /**
   * TODO: find concrete example to demonstrate why this is needed for the video.
   * The shell application and the microfrontend share the same window.Zone object.
   * By manually calling ApplicationRef.tick() on MicroTaskEmpty events in the shell application,
   * we make sure that no change detection cycle is skipped inside a microfrontend.
   */
  private registerZone(): Subscription {
    return this.microtaskEmpty$$
      .pipe(switchMap((microtaskEmpty$) => microtaskEmpty$ ?? EMPTY))
      .subscribe(() => {
        this.zone.run(() => {
          this.applicationRef.tick();
        });
      });
  }
}
