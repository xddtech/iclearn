import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing';
import NavbarComponent from './components/navbar/navbar';
import NeuronsViewComponent from './components/neurons/neurons-view';
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
      AppRoutingModule
   ],
   providers: [],
   bootstrap: [AppComponent]
})
export class AppModule { }
