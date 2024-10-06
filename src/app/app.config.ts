import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {BrowserModule, provideClientHydration, withEventReplay} from "@angular/platform-browser";
import {HTTP_INTERCEPTORS, provideHttpClient, withFetch} from "@angular/common/http";
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
import {CustomInterceptor} from "./core/interceptor/custom.interceptor";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      BrowserModule,
      BrowserAnimationsModule,
    ),
    provideAnimationsAsync(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    provideZoneChangeDetection({ eventCoalescing: true }), provideAnimationsAsync(),
    { provide: HTTP_INTERCEPTORS, useClass: CustomInterceptor, multi: true },
  ]
};
