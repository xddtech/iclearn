import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const entryUrl = new URL(window.document.location.href);
let hash = entryUrl.hash;
if (hash != null && hash.startsWith('#/model')) {
   // redirect to home
   entryUrl.hash = '';
   window.location.href = entryUrl.href;
}

let delay = Promise.resolve();
delay.then(() => {
   platformBrowserDynamic().bootstrapModule(AppModule);
}).catch(err => console.error('iclearn app bootstrap error, ' + err));

