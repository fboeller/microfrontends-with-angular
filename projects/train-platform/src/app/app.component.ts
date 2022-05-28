import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <app-navbar></app-navbar>
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  @HostBinding('class') classes = 'dark';

  constructor(
    private router: Router,
    private titleService: Title,
    private themeService: ThemeService
  ) {
    this.subscription = this.themeService.theme$.subscribe((theme) => {
      this.classes = theme;
    });
  }

  ngOnInit() {
    this.updatePageTitleOnRouteChange();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private updatePageTitleOnRouteChange() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let route: ActivatedRoute = this.router.routerState.root;
          let routeTitle = '';
          while (route!.firstChild) {
            route = route.firstChild;
          }
          if (route.snapshot.data['title']) {
            routeTitle = route!.snapshot.data['title'];
          }
          return routeTitle;
        })
      )
      .subscribe((title) => {
        if (title) {
          this.titleService.setTitle(`${title} - Microtrains`);
        }
      });
  }
}
