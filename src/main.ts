import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';

import { AppModule } from './app/app.module';
import {ENV} from './app/configs/environments/environment.cnfg';

if (ENV.production === 'production') {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
