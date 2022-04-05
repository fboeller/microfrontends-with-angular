import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  language: 'en' | 'de' = 'en';
  theme: 'light' | 'dark' = 'light';

  constructor(
    private translateService: TranslateService,
    private themeService: ThemeService
  ) {}

  updateTheme(theme: 'light' | 'dark'): void {
    this.theme = theme;
    this.themeService.updateTheme(theme);
  }

  updateLanguage(lang: 'en' | 'de'): void {
    this.language = lang;
    this.translateService.use(lang);
  }
}
