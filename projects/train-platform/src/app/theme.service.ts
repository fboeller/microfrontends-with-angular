import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private themeSubject: BehaviorSubject<Theme> = new BehaviorSubject<Theme>(
    'light'
  );
  public readonly theme$ = this.themeSubject.asObservable();

  updateTheme(theme: Theme): void {
    this.themeSubject.next(theme);
  }
}
