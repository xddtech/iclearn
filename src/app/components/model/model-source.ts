import {Component, AfterViewInit} from '@angular/core';
import {Observable} from "rxjs";

import {AppService} from '../../services/app-service';
import {AppStates} from '../../services/app-states';
import {NeuronsModel} from './neurons-model';

@Component({
  selector: 'model-source',
  templateUrl: 'model-source.html',
  providers: [AppService, AppStates]
})
export default class ModelSourceComponent implements AfterViewInit {
  neuronsModel: NeuronsModel;

  constructor(private appService: AppService, private appStates: AppStates) {
     this.neuronsModel = appStates.getCurrentNeuronsModel();
  }

  ngAfterViewInit() {
  }
}