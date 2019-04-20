import {Component} from '@angular/core';

import {AppStates} from '../../services/app-states';

@Component({
  selector: 'app-debug',
  providers: [AppStates],
  templateUrl: 'debug.html'
})
export default class AppDebugComponent {
  appStatesText: string;

  constructor(private appStates: AppStates) {
     this.load();
  }

  load() {
     this.appStatesText = this.appStates.toString();
  }
}