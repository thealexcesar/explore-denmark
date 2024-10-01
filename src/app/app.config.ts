import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {BrowserModule, provideClientHydration, withEventReplay} from "@angular/platform-browser";
import {HttpClientModule, provideHttpClient, withFetch} from "@angular/common/http";
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      BrowserModule,
      HttpClientModule,
    ),
    provideAnimationsAsync(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    provideZoneChangeDetection({ eventCoalescing: true }), provideAnimationsAsync()
  ]
};
