import { InjectionToken } from '@angular/core';

export interface AppConfig{
  user: boolean
}

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config', {
  providedIn: 'root',
  factory: () => ({
    user: false,
  }),
});
