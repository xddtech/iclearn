import {Observable} from "rxjs";
import * as THREE from 'three';


import {AppService} from '../../services/app-service';
import {AppStates} from '../../services/app-states';
import {NeuronsModel} from '../model/neurons-model';

export class ModelMain {
   rootGroup: THREE.Group;
   neuronsModel: NeuronsModel;

   constructor(private viewScene: THREE.Scene, private appService: AppService, private appStates: AppStates) {
      this.init();
   }

   init() {
      this.rootGroup = new THREE.Group();
      this.viewScene.add(this.rootGroup);
   }

   loadCreateModel() {
      this.appService.loadDefaultModel().subscribe(model => {
        this.neuronsModel = model;
        this.appStates.setCurrentNeuronsModel(this.neuronsModel);
        this.neuronsModel.preProcess();
        this.neuronsModel.create(this.viewScene);
      });
   }

   create() {
      var geometry = new THREE.BoxBufferGeometry( 0.1, 0.1, 0.1 );
      var material = new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } );
      var object = new THREE.Mesh( geometry, material );
      this.rootGroup.add(object);

      this.loadCreateModel();
   }

}