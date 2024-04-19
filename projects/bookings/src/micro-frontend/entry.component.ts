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

export interface RouterEvent {
  url: string;
  replaceUrl: boolean;
}

@Component({
  template: '<mf-booking></mf-booking>',
})
export class EntryComponent implements OnChanges, OnDestroy {
  @Input() route?: string;
  @Output() routeChange = new EventEmitter<RouterEvent>();

  @Input() language?: 'en' | 'de';

  private subscription: Subscription;

  constructor(
    private router: Router,
    private translateService: TranslateService
  ) {
    const routingSubscription = this.registerOutgoingRouting();
    this.subscription = routingSubscription;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.route && this.route) {
      this.router.navigateByUrl(this.route, { state: { fromPlatform: true } });
    }
    if (changes.language && this.language) {
      this.translateService.use(this.language);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
