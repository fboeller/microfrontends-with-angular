import { Component, HostBinding, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
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
export class AppComponent implements OnDestroy {
  subscription: Subscription;

  @HostBinding('class') classes = 'dark';

  constructor(private themeService: ThemeService) {
    this.subscription = this.themeService.theme$.subscribe((theme) => {
      this.classes = theme;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
