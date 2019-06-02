import {Component, ElementRef, ViewChild, AfterViewInit, AfterContentChecked, HostBinding,
    EventEmitter, Input, Output} from '@angular/core';
import {ElementDraggable} from '../../utils/element-draggable';
import {AppService} from '../../services/app-service';
import {AppStates} from '../../services/app-states';
import {NeuronsModelView} from '../neurons/neurons-model-view';
import {NeuronsModel} from '../model/neurons-model';
import {ModelLayer} from '../model/model-layer';
import {ModelMain} from '../neurons/model-main';

declare var $: any;

@Component({
    selector: 'datainput-panel',
    templateUrl: 'datainput-panel.html',
    styleUrls: ['./datainput-panel.css'],
    providers: [AppService, AppStates]
})
export default class DataInputPanelComponent implements AfterViewInit, AfterContentChecked {
   @ViewChild('dataInputPanelRoot') rootRef: ElementRef;
   @Output() closeDataInputPanelEvent = new EventEmitter();
   @Input() neuronsModel: NeuronsModel;

   inputTypesOpt = ['Predict', 'Learn', 'Test'];
   inputType = 'Predict';
   expectedDisabled = true;
   inputLayer: ModelLayer;

   constructor(private appService: AppService, private appStates: AppStates) {}

   ngAfterViewInit() {
      //this.inputLayer = this.neuronsModel.layers[0];
   }

   ngAfterContentChecked() {
   }

   onInputTypeChange(newValue) {
      this.inputType = newValue;
      var bg = 'rgba(0, 220, 220, 0)!important';
      if (this.inputType == 'Predict') {
         this.expectedDisabled = true;
      } else {
         this.expectedDisabled = false;
         bg = 'rgba(0, 0, 0, 0)!important';
      }
      // not work??
      $('#expected-input').css('background-color', 'red !important');
   }

   processInput() {
   }

   closeDataInputView() {
      this.closeDataInputPanelEvent.emit();
   }
}