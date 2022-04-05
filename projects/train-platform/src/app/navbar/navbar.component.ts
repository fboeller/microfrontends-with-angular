import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  language: 'en' | 'de' = 'en';

  constructor(private translateService: TranslateService) {}

  updateLanguage(lang: 'en' | 'de'): void {
    this.language = lang;
    this.translateService.use(lang);
  }
}
