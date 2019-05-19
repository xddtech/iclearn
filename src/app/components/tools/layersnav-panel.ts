import {Component, ElementRef, ViewChild, AfterViewInit, HostBinding,
        EventEmitter, Input, Output} from '@angular/core';
import {ElementDraggable} from '../../utils/element-draggable';
import {AppService} from '../../services/app-service';
import {AppStates} from '../../services/app-states';
import {NeuronsModelView} from '../neurons/neurons-model-view';
import {NeuronsModel} from '../model/neurons-model';
import {ModelLayer} from '../model/model-layer';

declare var $: any;

@Component({
    selector: 'layersnav-panel',
    templateUrl: 'layersnav-panel.html',
    styleUrls: ['./layersnav-panel.css'],
    providers: [AppService, AppStates]
 })
 export default class LayersNavPanelComponent implements AfterViewInit {

    @Output() closeLayersPanelEvent = new EventEmitter();
    @Input() neuronsModel: NeuronsModel;

    constructor(private appService: AppService, private appStates: AppStates) {
       //appService.neuronsModelObservable$.subscribe(model => {
          // not working????
          //this.neuronsModel = model;
       //});
    }

    getNeuronsModel() {
       //this.neuronsModel = this.appStates.getCurrentNeuronsModel();
    }
 
    ngAfterViewInit() {
       ElementDraggable.register('layersnav-panel', {});
       //this.getNeuronsModel();
    }

    closeLayersView() {
       this.closeLayersPanelEvent.emit();
    }
 }