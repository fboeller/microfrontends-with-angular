import { Component, HostBinding } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'mf-dev-platform',
  templateUrl: './dev-platform.component.html',
  styleUrls: ['./dev-platform.component.css'],
})
export class DevPlatformComponent {
  language: 'en' | 'de' = 'en';
  @HostBinding('class') theme: 'light' | 'dark' = 'light';

  constructor(private translateService: TranslateService) {}

  updateTheme(theme: 'light' | 'dark'): void {
    this.theme = theme;
  }

  updateLanguage(lang: 'en' | 'de'): void {
    this.language = lang;
    this.translateService.use(lang);
  }
}
