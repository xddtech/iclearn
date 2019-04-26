import {Component, AfterViewInit} from '@angular/core';
import {Observable} from "rxjs";

import {AppStates} from '../../services/app-states';
import {NeuronsModel} from './neurons-model';

@Component({
  selector: 'model-source',
  templateUrl: 'model-source.html'
})
export default class ModelSourceComponent implements AfterViewInit {
  neuronsModel: NeuronsModel;

  constructor() {
    this.neuronsModel = NeuronsModel.getDefaultModel();
  }

  ngAfterViewInit() {
    this.neuronsModel = AppStates.neuronsModel;
 }
}