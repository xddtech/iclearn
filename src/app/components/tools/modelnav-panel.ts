import {Component, ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import {ElementDraggable} from '../../utils/element-draggable';
import {AppService} from '../../services/app-service';
import {AppStates} from '../../services/app-states';
import {NeuronsModel} from '../model/neurons-model';
import {NeuronsModelView} from '../neurons/neurons-model-view';
import DataInputPanelComponent from './datainput-panel';

declare var $: any;

@Component({
    selector: 'modelnav-panel',
    templateUrl: 'modelnav-panel.html',
    styleUrls: ['./modelnav-panel.css'],
    providers: [AppService, AppStates]
 })
 export default class ModelNavPanelComponent implements AfterViewInit {
    @ViewChild('modelNavPanel') modelNavPanelRef: ElementRef;
    @ViewChild('layersNavPanel') layersNavPanelRef: ElementRef;
    @ViewChild('dataInputPanel') dataInputPanelRef: ElementRef;

    neuronsModel: NeuronsModel;
    hideLayersNavPanel = true;
    hideDataInputPanel = true;
    inputPanelDragRegistered = false;

    constructor(private appService: AppService, private appStates: AppStates) {}
 
    ngAfterViewInit() {
       var top =  10 + this.appStates.getNavbarHeight();
       $('#modelnav-panel').css('top', top + 'px');
       $('#modelnav-panel').css('left', '10px');

       ElementDraggable.register('modelnav-head', 'modelnav-panel', {});
    }

    resetModelView() {
       NeuronsModelView.appCamControl.reset();
    }

    toggleLayersPanel() {
       if (this.hideLayersNavPanel) {
          this.openLayersPanel();
          this.hideLayersNavPanel = false;
       }
       /* disable toggle
       this.hideLayersNavPanel = !this.hideLayersNavPanel;
       if (!this.hideLayersNavPanel) {
           this.openLayersPanel();
       }
       */
    }

    openLayersPanel() {
       var menuElem = this.modelNavPanelRef.nativeElement;
       var top = menuElem.offsetTop;
       var left = menuElem.offsetLeft + menuElem.offsetWidth + 10;
       $('#layersnav-panel').css('top', top + 'px');
       $('#layersnav-panel').css('left', left + 'px');

       this.neuronsModel = this.appStates.getCurrentNeuronsModel();
    }

    openDataInputPanel() {
       this.hideDataInputPanel = false;
       this.neuronsModel = this.appStates.getCurrentNeuronsModel();

       //NeuronsModelView.appCamControl.dispose(); for input avail?
       if (!this.inputPanelDragRegistered) {
          // do for the first time
          setTimeout(() => {
             this.positionDataInputPanel();
          }, 600);
       }
    }

    positionDataInputPanel() {
       var inputPanel = this.dataInputPanelRef as any;
       var nativeElement = inputPanel.rootRef.nativeElement;
       var top = window.innerHeight - nativeElement.offsetHeight - 20;
       var left = window.innerWidth/2 - nativeElement.offsetWidth/2;
       $('#datainput-panel').css('top', top + 'px');
       $('#datainput-panel').css('left', left + 'px');

       if (!this.inputPanelDragRegistered) {
          ElementDraggable.register('input-action-header', 'datainput-panel', {});
          this.inputPanelDragRegistered = true;
       }
    }

    closeLayersPanel() {
       this.hideLayersNavPanel = true;
    }

    closeDataInputPanel() {
       this.hideDataInputPanel = true;
       //NeuronsModelView.appCamControl.addListeners();
    }
 }