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
    @ViewChild('modelNavPanel') modelNavPanelRef: ElementRef;
    @ViewChild('layersNavPanel') layersNavPanelRef: ElementRef;

    hideLayersNavPanel = true;

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

    toggleLayersPanel() {
       this.hideLayersNavPanel = !this.hideLayersNavPanel;
       if (!this.hideLayersNavPanel) {
          var menuElem = this.modelNavPanelRef.nativeElement;
          var top = menuElem.offsetTop;
          var left = menuElem.offsetLeft + menuElem.offsetWidth + 10;
          $('#layersnav-panel').css('top', top + 'px');
          $('#layersnav-panel').css('left', left + 'px');
       }
    }

    closeLayersPanel() {
       this.hideLayersNavPanel = true;
    }
 }