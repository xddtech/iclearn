import {Component, ElementRef, ViewChild, AfterViewInit} from '@angular/core';
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

    constructor(private appService: AppService, private appStates: AppStates) {}
 
    ngAfterViewInit() {
       var top =  10 + this.appStates.getNavbarHeight();
       $('#layersnav-panel').css('top', top + 'px');
       $('#layersnav-panel').css('left', '10px');

       //ElementDraggable.register('layersnav-panel', {});
    }
 }