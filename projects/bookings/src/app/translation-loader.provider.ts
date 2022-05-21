import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { MICRO_FRONTEND_URL } from './microfrontend-url.token';

class TranslateHttpLoader implements TranslateLoader {
  constructor(
    private http: HttpClient,
    private assetUrl: string,
    private translationFile: (language: 'en' | 'de') => string
  ) {}
  getTranslation(language: 'en' | 'de'): Observable<any> {
    const path = `${this.assetUrl}${this.translationFile(
      language
    )}?t=${new Date().getTime()}`;
    console.log(path, 'HALLO');
    return this.http.get(path);
  }
}

export const provideTranslateLoader = (
  translationFile: (language: 'en' | 'de') => string
) => ({
  provide: TranslateLoader,
  useFactory: (http: HttpClient, assetUrl: string) =>
    new TranslateHttpLoader(http, assetUrl, translationFile),
  deps: [HttpClient, MICRO_FRONTEND_URL],
});
