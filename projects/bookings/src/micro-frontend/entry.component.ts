import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  template: `<mf-booking></mf-booking>`,
})
export class EntryComponent implements OnChanges {
  @Input() route?: string;

  constructor(private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.route && this.route) {
      this.router.navigateByUrl(this.route, { state: { fromPlatform: true } });
    }
  }
}
