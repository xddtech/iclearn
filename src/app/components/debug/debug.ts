import {Component} from '@angular/core';

import {AppStates} from '../../services/app-states';

@Component({
  selector: 'app-debug',
  templateUrl: 'debug.html'
})
export default class AppDebugComponent {
  appStatesText: string;

  constructor() {
     this.load();
  }

  load() {
     this.appStatesText = AppStates.toString();
  }
}