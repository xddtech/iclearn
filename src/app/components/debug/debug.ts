import {Component} from '@angular/core';

import {AppStates} from '../../services/app-states';

@Component({
  selector: 'app-debug',
  templateUrl: 'debug.html'
})
export default class AppDebugComponent {
  appStatesDebug: any;

  constructor() {
     this.load();
  }

  load() {
     this.appStatesDebug = AppStates.toDebug();
  }

  toString(obj: any) {
     return JSON.stringify(obj);
  }
}