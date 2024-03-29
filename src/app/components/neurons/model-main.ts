import {Observable} from "rxjs";
import * as THREE from 'three';

import {NeuronsModelView} from '../neurons/neurons-model-view';
import {AppService} from '../../services/app-service';
import {AppStates} from '../../services/app-states';
import {NeuronsModel} from '../model/neurons-model';

declare var $: any;

export class ModelMain {
   static mainRootGroup: THREE.Group;
   rootGroup: THREE.Group;
   neuronsModel: NeuronsModel;
   static currentNeoronsModel: NeuronsModel;

   constructor(private viewScene: THREE.Scene, private appService: AppService, private appStates: AppStates) {
      this.init();
   }

   init() {
      this.rootGroup = new THREE.Group();
      this.viewScene.add(this.rootGroup);
      ModelMain.mainRootGroup = this.rootGroup;

      var axesHelper = new THREE.AxesHelper(100);
      this.rootGroup.add(axesHelper);
   }

   loadCreateModel() {
      this.appService.loadDefaultModelSrc().subscribe(modelDataSrc => {
         // keep original text
         var srcJson = JSON.stringify(modelDataSrc);
         // convert to a model
         var modelData = new NeuronsModel();
         Object.assign(modelData, modelDataSrc);
         // do deep clone
         this.neuronsModel = NeuronsModel.clone(modelData);
         ModelMain.currentNeoronsModel = this.neuronsModel;
         this.appStates.setCurrentNeuronsModel(this.neuronsModel, srcJson);
         // preprocess the model
         this.neuronsModel.preProcess();
         // adjust camera
         this.adjustRootPosition();
         // create graphs
         this.neuronsModel.create(this.rootGroup);
      });
   }

   create() {
      //var geometry = new THREE.BoxBufferGeometry( 0.1, 0.1, 0.1 );
      //var material = new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } );
      //var object = new THREE.Mesh( geometry, material );
      //this.rootGroup.add(object);

      this.loadCreateModel();
   }

   adjustRootPosition() {
      if (!this.neuronsModel || !this.neuronsModel.layers) {
         return;
      }
      var length = this.neuronsModel.layers.length;
      var dsize = length - 4;
      if (dsize <= 0) {
         return;
      }
      var factor = 1;
      this.rootGroup.position.y = this.rootGroup.position.y - dsize * factor;
   }

   static toggleLayerVisibility(index: number, visible: boolean) {
      var neuronsModel = ModelMain.currentNeoronsModel;
      if (neuronsModel == null) {
         console.error('toggleLayerVisibility has null currentNeoronsModel');
         return;
      }
      var layer = neuronsModel.layers[index];
      if (layer.layerGroup == null) {
         console.error('toggleLayerVisibility has null layerGroup at ' + index);
         return;
      }
      if (visible) {
         layer.layerGroup.traverse( function ( object ) { object.visible = true; } );
      } else {
         layer.layerGroup.traverse( function ( object ) { object.visible = false; } );
      }
      NeuronsModelView.animate();
   }

}