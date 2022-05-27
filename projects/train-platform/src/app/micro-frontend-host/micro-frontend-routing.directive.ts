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
  selector: '[microFrontendRouting]', // tslint:disable-next-line:directive-selector
})
export class MicroFrontendRoutingDirective implements OnInit, OnDestroy {
  private destroyed$ = new Subject<void>();

  constructor(
    private element: ElementRef,
    private router: Router,
    private route: ActivatedRoute
  ) {}

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

  @HostListener('routeChange', ['$event'])
  handleRouteChange(event: { detail?: RouterEvent }): void {
    this.navigateToUrl(event?.detail);
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
}
