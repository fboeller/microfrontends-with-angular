import { Component, HostBinding } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Language } from '../../app/translation-loader.provider';

@Component({
  selector: 'mf-dev-platform',
  templateUrl: './dev-platform.component.html',
  styleUrls: ['./dev-platform.component.css'],
})
export class DevPlatformComponent {
  language: Language = 'en';
  @HostBinding('class') theme: 'light' | 'dark' = 'light';

  constructor(private translateService: TranslateService) {}

  updateTheme(theme: 'light' | 'dark'): void {
    this.theme = theme;
  }

  updateLanguage(lang: Language): void {
    this.language = lang;
    this.translateService.use(lang);
  }
}
