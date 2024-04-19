import {
  Directive,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

export interface RouterEvent {
  url: string;
  replaceUrl: boolean;
}

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[microFrontendRouting]',
})
export class MicroFrontendRoutingDirective implements OnInit, OnDestroy {
  private destroyed$ = new Subject<void>();

  constructor(
    private element: ElementRef,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  @HostListener('routeChange', ['$event'])
  handleRouteChange(event: { detail?: RouterEvent }) {
    this.navigateToUrl(event.detail);
  }

  navigateToUrl(event: RouterEvent | undefined): void {
    if (event?.url && event.url.startsWith('/')) {
      this.router.navigateByUrl(event.url, {
        replaceUrl: event.replaceUrl || false,
      });
    } else {
      console.warn(
        `The microFrontendRouting directive received an invalid router event.`,
        event
      );
    }
  }

  ngOnInit(): void {
    this.route.url
      .pipe(
        map(() => this.router.url),
        takeUntil(this.destroyed$)
      )
      .subscribe((url) => (this.element.nativeElement.route = url));
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }
}
