import {Component, ElementRef, ViewChild, AfterViewInit, HostBinding,
        EventEmitter, Input, Output} from '@angular/core';
import {ElementDraggable} from '../../utils/element-draggable';
import {AppService} from '../../services/app-service';
import {AppStates} from '../../services/app-states';
import {NeuronsModelView} from '../neurons/neurons-model-view';

declare var $: any;

@Component({
    selector: 'layersnav-panel',
    templateUrl: 'layersnav-panel.html',
    styleUrls: ['./layersnav-panel.css'],
    providers: [AppService, AppStates]
 })
 export default class LayersNavPanelComponent implements AfterViewInit {

    @Output() closeLayersPanelEvent = new EventEmitter();

    constructor(private appService: AppService, private appStates: AppStates) {}
 
    ngAfterViewInit() {
       ElementDraggable.register('layersnav-panel', {});
    }

    closeLayersView() {
       this.closeLayersPanelEvent.emit();
    }
 }