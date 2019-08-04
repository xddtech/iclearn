import {Component, ElementRef, ViewChild, AfterViewInit, AfterContentChecked, HostBinding,
    EventEmitter, Input, Output, OnDestroy} from '@angular/core';
import {ElementDraggable} from '../../utils/element-draggable';
import {AppService} from '../../services/app-service';
import {AppStates} from '../../services/app-states';
import {NeuronsModelView} from '../neurons/neurons-model-view';
import {NeuronsModel} from '../model/neurons-model';
import {ModelLayer} from '../model/model-layer';
import {ModelMain} from '../neurons/model-main';
import {ModelCell} from '../model/model-cell';

declare var $: any;

@Component({
    selector: 'datainput-panel',
    templateUrl: 'datainput-panel.html',
    styleUrls: ['./datainput-panel.css'],
    providers: [AppService, AppStates]
})
export default class DataInputPanelComponent implements AfterViewInit, AfterContentChecked, OnDestroy {
   @ViewChild('dataInputPanelRoot') rootRef: ElementRef;
   @Output() closeDataInputPanelEvent = new EventEmitter();
   @Input() neuronsModel: NeuronsModel;

   inputTypesOpt = ['Predict', 'Learn', 'Test'];
   inputType = 'Predict';
   expectedDisabled = true;
   inputLayer: ModelLayer;
   inputCellList: ModelCell[] = [];

   constructor(private appService: AppService, private appStates: AppStates) {
   }

   init() {
      this.inputCellList = [];
      if ( !this.neuronsModel ) {
         //console.error('inputPanel has no neurons model');
         return;
      }
      this.inputLayer = this.neuronsModel.layers[0];
      for (var index = 0; index < this.inputLayer.cellList.length; index++) {
         var cell = this.inputLayer.cellList[index];
         if (cell.cellType !== ModelCell.BIAS) {
            this.inputCellList.push(cell);
         }
      }
   }

   ngAfterViewInit() {
   }

   ngAfterContentChecked() {
      this.init();
   }

   ngOnDestroy() {
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
      //$('#expected-input-td').css('background', 'red !important');
      //$('#expected-input').css('background', 'red !important');
   }

   processInput() {
   }

   closeDataInputView() {
      this.closeDataInputPanelEvent.emit();
   }
}