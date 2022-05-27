import { Directive, ElementRef, NgZone, OnInit } from '@angular/core';

@Directive({
  selector: '[microFrontendZone]', // tslint:disable-next-line:directive-selector
})
export class MicrofrontendZoneDirective implements OnInit {
  constructor(private element: ElementRef, private zone: NgZone) {}

  ngOnInit(): void {
    this.element.nativeElement.microtaskEmpty$ = this.zone.onMicrotaskEmpty;
  }
}
