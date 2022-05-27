import { Directive, ElementRef, NgZone, OnInit } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[microFrontendZone]',
})
export class MicrofrontendZoneDirective implements OnInit {
  constructor(private element: ElementRef, private zone: NgZone) {}

  ngOnInit(): void {
    this.element.nativeElement.microtaskEmpty$ = this.zone.onMicrotaskEmpty;
  }
}
