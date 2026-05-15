import { provideHttpClient } from '@angular/common/http';
import { APP_INITIALIZER, ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { firstValueFrom } from 'rxjs';
import { routes } from './app.routes';
import { LanguagePreferenceService } from './shared/presentation/services/language-preference.service';

export function initializeLanguage(
  translate: TranslateService,
  languagePreference: LanguagePreferenceService,
): () => Promise<unknown> {
  return () => firstValueFrom(translate.use(languagePreference.getStoredOrDefault()));
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideAnimations(),
    provideHttpClient(),
    ...provideTranslateService({
      fallbackLang: 'es',
      lang: 'es',
    }),
    ...provideTranslateHttpLoader({
      prefix: '/assets/i18n/',
      suffix: '.json',
    }),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeLanguage,
      deps: [TranslateService, LanguagePreferenceService],
      multi: true,
    },
    provideRouter(routes),
  ],
};
