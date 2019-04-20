import {Component, ViewChild, ElementRef, AfterViewInit, OnDestroy} from '@angular/core';

//declare var $: JQueryStatic;
declare var $: any;

const neuronViewDiv = "neurons-view-div";

@Component({
  selector: 'neurons-view',
  templateUrl: 'neurons-view.html',
  styleUrls: ['./neurons-view.css']
})
export default class NeuronsViewComponent implements AfterViewInit, OnDestroy {
  static viewGLRenderer: THREE.WebGLRenderer;

  constructor() {}

  ngAfterViewInit() {
     // hide scrollbar
     $("body").css("overflow", "hidden");
     this.afterShowElementReady();
  }

  ngOnDestroy() {
     // show scrollbar for other routes
     $("body").css("overflow", "auto");
  }

  private afterShowElementReady() {
     if (document.getElementById(neuronViewDiv) == null) {
        console.log("show element not ready, waiting ...");
        setTimeout(this.afterShowElementReady, 200);
        return;
     }
     this.createShow();
  }

  private createShow() {
    if (NeuronsViewComponent.viewGLRenderer == null) {
       //var modelView = new NeuronModelView(this.neuronService);
       //modelView.create(getNeuronViewElement());
    } else {
       document.getElementById(neuronViewDiv).appendChild(NeuronsViewComponent.viewGLRenderer.domElement);
       console.log("loaded the existing show renderer");
    }
  }
}