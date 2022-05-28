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
import { Subscription } from 'rxjs';
import { Language } from '../app/translation-loader.provider';

/**
 * An event sent from the micro frontend to the platform to indicate that the route within the micro frontend has changed.
 */
export interface RouterEvent {
  /**
   * The new absolute url without the base href, e.g. `/micro-frontend/child`.
   */
  url: string;
  /**
   * If the new url is replacing the current url or if this url is a new entry in the browser history.
   * A replace is used for redirects.
   */
  replaceUrl: boolean;
}

@Component({
  template: `<mf-booking></mf-booking>`,
})
export class EntryComponent implements OnChanges, OnDestroy {
  @Input() route?: string;
  @Output() routeChange = new EventEmitter<RouterEvent>();

  @Input() language?: Language;

  private readonly subscription: Subscription;

  constructor(
    private router: Router,
    private translateService: TranslateService
  ) {
    const routingSubscription = this.registerOutgoingRouting();
    this.subscription = routingSubscription;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
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
