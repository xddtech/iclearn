import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import NavbarComponent from './components/navbar/navbar';
import NeuronsViewComponent from './components/neurons/neurons-view';
import { AppStates } from './services/app-states';
import AppDebugComponent from './components/debug/debug';

@NgModule({
   declarations: [
      AppComponent,
      NavbarComponent,
      NeuronsViewComponent,
      AppDebugComponent
   ],
   imports: [
      BrowserModule,
      RouterModule.forRoot([
        {path: '',                    component: NeuronsViewComponent},
        {path: 'debug',               component: AppDebugComponent}
      ])
   ],
   providers: [
      { provide: LocationStrategy, useClass: HashLocationStrategy },
      AppStates
   ],
   bootstrap: [AppComponent]
})
export class AppModule { }
