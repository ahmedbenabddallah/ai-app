import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http'; // Pour HttpClient
import { provideAnimations } from '@angular/platform-browser/animations'; // Optionnel
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Pour ngModel

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(), // Optionnel, pour les animations
    importProvidersFrom(FormsModule) // Ajoute FormsModule
  ]
};