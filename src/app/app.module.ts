import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import NavbarComponent from './components/navbar/navbar';
import NeuronsViewComponent from './components/neurons/neurons-view';
import { AppService } from './services/app-service';
import { AppStates } from './services/app-states';
import ModelSourceComponent from './components/model/model-source';
import AboutComponent from './components/about/about';
import AppDebugComponent from './components/debug/debug';

@NgModule({
   declarations: [
      AppComponent,
      NavbarComponent,
      NeuronsViewComponent,
      ModelSourceComponent,
      AboutComponent,
      AppDebugComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      RouterModule.forRoot([
        {path: '',                    component: NeuronsViewComponent},
        {path: 'model',               component: ModelSourceComponent},
        {path: 'about',               component: AboutComponent},
        {path: 'debug',               component: AppDebugComponent}
      ])
   ],
   providers: [
      { provide: LocationStrategy, useClass: HashLocationStrategy },
      AppService,
      AppStates
   ],
   bootstrap: [AppComponent]
})
export class AppModule { }
