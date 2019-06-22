import {Component, ViewChild, ElementRef, AfterViewInit, OnDestroy} from '@angular/core';
import {AppService} from '../../services/app-service';
import {AppStates} from '../../services/app-states';
import {NeuronsModelView} from './neurons-model-view';

//declare var $: JQueryStatic;
declare var $: any;

const neuronsStageDiv = "neurons-stage-div";

@Component({
  selector: 'neurons-stage',
  templateUrl: 'neurons-stage.html',
  styleUrls: ['./neurons-stage.css'],
  providers: [AppService, AppStates]
})
export default class NeuronsStageComponent implements AfterViewInit, OnDestroy {

  static neuronsModelViewRef: NeuronsModelView;
  private neuronsModelView: NeuronsModelView;

  constructor(private appService: AppService, private appStates: AppStates) {}

  ngAfterViewInit() {
     // hide scrollbar
     $("body").css("overflow", "hidden");
     this.afterShowElementReady();
  }

  ngOnDestroy() {
     // show scrollbar for other routes
     $("body").css("overflow", "auto");
     console.info('stage destroied-----------------------');
     var vcamera = NeuronsModelView.viewCamera;
     console.info('befoer ===== x=' + vcamera.position.x + ', y=' +  vcamera.position.y + ', z=' +  vcamera.position.z);
  }

  private getNeuronsStageElement(): Element {
     return document.getElementById(neuronsStageDiv);
  }

  private afterShowElementReady() {
     if (this.getNeuronsStageElement() == null) {
        console.log("show element not ready, waiting ...");
        setTimeout(this.afterShowElementReady, 200);
        return;
     }
     this.createShow();
  }

  private createShow() {
    if ( !this.appStates.getCurrentNeuronsModelView() ) {
       this.neuronsModelView = new NeuronsModelView(this.getNeuronsStageElement(), this.appService, this.appStates);
       this.neuronsModelView.create();
       //NeuronsStageComponent.neuronsModelViewRef = this.neuronsModelView;
       this.appStates.setCurrentNeuronsModelView(this.neuronsModelView);
    } else {
       //this.neuronsModelView = NeuronsStageComponent.neuronsModelViewRef ;
       this.neuronsModelView = this.appStates.getCurrentNeuronsModelView();
       this.getNeuronsStageElement().appendChild(NeuronsModelView.viewRender.domElement);
       this.neuronsModelView.redisplay();
       //this.neuronsModelView.addCameraAndControls();
       console.log("loaded the existing show renderer");
    }
  }
}