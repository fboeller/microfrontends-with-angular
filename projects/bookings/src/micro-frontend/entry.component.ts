import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  template: `<mf-booking></mf-booking>`,
})
export class EntryComponent implements OnChanges {
  @Input() route?: string;

  @Input() language?: 'en' | 'de';

  constructor(
    private router: Router,
    private translateService: TranslateService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.route && this.route) {
      this.router.navigateByUrl(this.route, { state: { fromPlatform: true } });
    }
    if (changes.language && this.language) {
      this.translateService.use(this.language);
    }
  }
}
