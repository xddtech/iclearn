import {Component, ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import {ElementDraggable} from '../../utils/element-draggable';
import {AppService} from '../../services/app-service';
import {AppStates} from '../../services/app-states';
import {NeuronsModelView} from '../neurons/neurons-model-view';

declare var $: any;

@Component({
    selector: 'modelnav-panel',
    templateUrl: 'modelnav-panel.html',
    styleUrls: ['./modelnav-panel.css'],
    providers: [AppService, AppStates]
 })
 export default class ModelNavPanelComponent implements AfterViewInit {

 
    constructor(private appService: AppService, private appStates: AppStates) {}
 
    ngAfterViewInit() {
       var top =  10 + this.appStates.getNavbarHeight();
       $('#modelnav-panel').css('top', top + 'px');
       $('#modelnav-panel').css('left', '10px');

       ElementDraggable.register('modelnav-panel', {});
    }

    resetModelView() {
        NeuronsModelView.appCamControl.reset();
    }
 }