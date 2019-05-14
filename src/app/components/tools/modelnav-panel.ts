import {Component, ElementRef, ViewChild, AfterViewInit, 
    ComponentFactoryResolver, Injectable, Inject, ReflectiveInjector, ViewContainerRef} from '@angular/core';
import {ElementDraggable} from '../../utils/element-draggable';
import {AppService} from '../../services/app-service';
import {AppStates} from '../../services/app-states';
import {NeuronsModelView} from '../neurons/neurons-model-view';

import LayersNavPanelComponent from './layersnav-panel';

declare var $: any;

@Component({
    selector: 'modelnav-panel',
    templateUrl: 'modelnav-panel.html',
    styleUrls: ['./modelnav-panel.css'],
    providers: [AppService, AppStates]
 })
 export default class ModelNavPanelComponent implements AfterViewInit {

    factoryResolver: ComponentFactoryResolver;
    @ViewChild('layersnavPanel', {read: ViewContainerRef}) viewContainerRef: ViewContainerRef;

    constructor(private appService: AppService, private appStates: AppStates, 
        @Inject(ComponentFactoryResolver) factoryResolver) {
       this.factoryResolver = factoryResolver;
    }
 
    ngAfterViewInit() {
       var top =  10 + this.appStates.getNavbarHeight();
       $('#modelnav-panel').css('top', top + 'px');
       $('#modelnav-panel').css('left', '10px');

       ElementDraggable.register('modelnav-panel', {});
    }

    resetModelView() {
        NeuronsModelView.appCamControl.reset();
    }

    openLayersPanel() {
       const factory = this.factoryResolver.resolveComponentFactory(LayersNavPanelComponent);
       const component = factory.create(this.viewContainerRef.parentInjector)
       this.viewContainerRef.insert(component.hostView)
    }
 }