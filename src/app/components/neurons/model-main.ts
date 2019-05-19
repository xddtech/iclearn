import {Observable} from "rxjs";
import * as THREE from 'three';


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
      this.appService.loadDefaultModel().subscribe(modelData => {
        this.neuronsModel = NeuronsModel.clone(modelData);
        ModelMain.currentNeoronsModel = this.neuronsModel;
        this.appStates.setCurrentNeuronsModel(this.neuronsModel);
        this.neuronsModel.preProcess();
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
   }

}