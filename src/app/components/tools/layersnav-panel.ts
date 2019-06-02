import {Component, ElementRef, ViewChild, AfterViewInit, HostBinding,
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
    selector: 'layersnav-panel',
    templateUrl: 'layersnav-panel.html',
    styleUrls: ['./layersnav-panel.css'],
    providers: [AppService, AppStates]
 })
 export default class LayersNavPanelComponent implements AfterViewInit {

    @Output() closeLayersPanelEvent = new EventEmitter();
    @Input() neuronsModel: NeuronsModel;
    layersViewMap = {};

    constructor(private appService: AppService, private appStates: AppStates) {
    }
 
    ngAfterViewInit() {
       ElementDraggable.register('layersnav-head', 'layersnav-panel', {});
    }

    closeLayersView() {
       this.closeLayersPanelEvent.emit();
    }

    toggleLayerVisible(index: number) {
       var visible = false;
       if (this.layersViewMap[index] || this.layersViewMap[index] == false) {
          visible = !this.layersViewMap[index];
          this.layersViewMap[index] = visible;
       } else {
          this.layersViewMap[index] = false;
          visible = false;
       }
       ModelMain.toggleLayerVisibility(index, visible);
    }
 }