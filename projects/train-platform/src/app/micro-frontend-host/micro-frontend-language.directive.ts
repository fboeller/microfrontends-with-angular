import { Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[microFrontendLanguage]', // eslint-disable-line directive-selector
})
export class MicrofrontendLanguageDirective implements OnInit, OnDestroy {
  private destroyed$ = new Subject<void>();

  constructor(
    private element: ElementRef,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.translateService.onLangChange
      .pipe(
        map((event) => event.lang),
        startWith(
          this.translateService.currentLang ?? this.translateService.defaultLang
        ),
        takeUntil(this.destroyed$)
      )
      .subscribe((language) => {
        this.element.nativeElement.language = language;
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }
}
