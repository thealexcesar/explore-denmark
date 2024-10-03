import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {BrowserModule, provideClientHydration, withEventReplay} from "@angular/platform-browser";
import {HTTP_INTERCEPTORS, provideHttpClient, withFetch} from "@angular/common/http";
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
import {ToastrModule} from "ngx-toastr";
import {CustomInterceptor} from "./core/interceptor/custom.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      BrowserModule,
      ToastrModule.forRoot({
        timeOut: 5000,
        positionClass: 'toast-top-right',
        preventDuplicates: true,
        disableTimeOut: false,
        closeButton: true,
        tapToDismiss: true,
        progressBar: true,
        easing: 'ease-in-out',
      })

    ),
    provideAnimationsAsync(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    provideZoneChangeDetection({ eventCoalescing: true }), provideAnimationsAsync(),
    { provide: HTTP_INTERCEPTORS, useClass: CustomInterceptor, multi: true },
  ]
};
