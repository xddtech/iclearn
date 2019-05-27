import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import NavbarComponent from './components/navbar/navbar';
import NeuronsStageComponent from './components/neurons/neurons-stage';
import { AppService } from './services/app-service';
import { AppStates } from './services/app-states';
import ModelSourceComponent from './components/model/model-source';
import AboutComponent from './components/about/about';
import AppDebugComponent from './components/debug/debug';
import ModelNavPanelComponent from './components/tools/modelnav-panel';
import LayersNavPanelComponent from './components/tools/layersnav-panel';
import DataInputPanelComponent from './components/tools/datainput-panel';

@NgModule({
   declarations: [
      AppComponent,
      NavbarComponent,
      NeuronsStageComponent,
      ModelSourceComponent,
      AboutComponent,
      AppDebugComponent,
      ModelNavPanelComponent,
      LayersNavPanelComponent,
      DataInputPanelComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      RouterModule.forRoot([
        {path: '',                    component: NeuronsStageComponent},
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
