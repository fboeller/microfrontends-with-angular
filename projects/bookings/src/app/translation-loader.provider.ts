import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export type Language = 'en' | 'de';

class TranslateHttpLoader implements TranslateLoader {
  constructor(private http: HttpClient) {}
  getTranslation(language: Language): Observable<any> {
    const cacheBusting = new Date().getTime();
    const path = `${environment.assetUrl}/assets/i18n/${language}.json?t=${cacheBusting}`;
    return this.http.get(path);
  }
}

export const TranslationLoaderProvider = {
  provide: TranslateLoader,
  useFactory: (http: HttpClient) => new TranslateHttpLoader(http),
  deps: [HttpClient],
};
