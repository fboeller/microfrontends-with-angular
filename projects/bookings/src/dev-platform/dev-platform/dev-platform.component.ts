import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Language } from '../../app/translation-loader.provider';

@Component({
  selector: 'dev-platform',
  templateUrl: './dev-platform.component.html',
})
export class DevPlatformComponent {
  language: Language = 'en';

  constructor(private translateService: TranslateService) {}

  updateLanguage(lang: Language): void {
    this.language = lang;
    this.translateService.use(lang);
  }
}
