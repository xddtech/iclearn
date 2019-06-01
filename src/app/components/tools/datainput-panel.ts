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

   constructor(private appService: AppService, private appStates: AppStates) {}

   ngAfterViewInit() {
      //ElementDraggable.register('input-action-header', 'datainput-panel', {});
      /*
      var inputPanel = this.rootRef as any;
      var top = window.innerHeight - inputPanel.nativeElement.offsetHeight - 10;
      var left = window.innerWidth/2 - inputPanel.nativeElement.offsetWidth;
      $('#datainput-panel').css('top', top + 'px');
      $('#datainput-panel').css('left', left + 'px');
      */
   }

   ngAfterContentChecked() {
      //ElementDraggable.register('input-action-header', 'datainput-panel', {});
      /*
      var inputPanel = this.rootRef as any;
      var top = window.innerHeight - inputPanel.nativeElement.offsetHeight - 10;
      var left = window.innerWidth/2 - inputPanel.nativeElement.offsetWidth;
      $('#datainput-panel').css('top', top + 'px');
      $('#datainput-panel').css('left', left + 'px');
      */
   }

   closeDataInputView() {
      this.closeDataInputPanelEvent.emit();
   }
}