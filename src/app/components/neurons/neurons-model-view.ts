import * as THREE from 'three';
import '../../controls/TrackballControls.js';

import {AppService} from '../../services/app-service';
import {AppStates} from '../../services/app-states';
import {ModelMain} from './model-main';

// /// <reference path="../../../typings/app.threex.d.ts" />

export class NeuronsModelView {

   static viewScene: THREE.Scene;
   static viewCamera: THREE.PerspectiveCamera
   static viewRender: THREE.WebGLRenderer;
   static appCamControl: any;
   static showClock = new THREE.Clock();
   static appStatesRef: AppStates;

   static letAnimateRun: boolean;
   static animateStartTime: number;
   static animateLiveSecDefault = 10;

   constructor(private neuronsStageElement: Element, private appService: AppService, private appStates: AppStates) {
      NeuronsModelView.appStatesRef = this.appStates;
   }

   create() {
      NeuronsModelView.viewScene = new THREE.Scene();
      this.addCameraAndControls();

      NeuronsModelView.viewRender = new THREE.WebGLRenderer({ antialias: true });
      var vrender = NeuronsModelView.viewRender;
      vrender.setClearColor(new THREE.Color(0xEEEEEE));
      NeuronsModelView.onWindowResize();
      this.neuronsStageElement.appendChild(vrender.domElement);

      window.addEventListener("resize", NeuronsModelView.onWindowResize);
      NeuronsModelView.listenNeuronsStageEvents();

      this.addBackground();
      this.addShowObjects();
      this.addShowLights();

      NeuronsModelView.animate();
   }

   addCameraAndControls(): void {
      var fov = 30;
      var aspect = this.getCameraAspect();
      var near = 0.1;
      var far = 500;
      NeuronsModelView.viewCamera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      var vcamera = NeuronsModelView.viewCamera;
      vcamera.position.x = 0;
      vcamera.position.y = 2;
      vcamera.position.z = 12;
    
      var lookAt = new THREE.Vector3(0, 0, 0);
      vcamera.lookAt(lookAt);

      // right mouse not work when pass element
      var trackball = new THREE.TrackballControls(vcamera, document.getElementById('neurons-stage-div'));
      //var trackball = new THREE.TrackballControls(vcamera);
      NeuronsModelView.appCamControl = trackball;
      trackball.rotateSpeed = 1.0;
      trackball.zoomSpeed = 1.0;
      trackball.panSpeed = 1.0;
      trackball.noZoom = false;
      trackball.noPan = false;
      trackball.staticMoving = true;
      trackball.dynamicDampingFactor = 0.3;
      trackball.keys = [ 65, 83, 68 ];
      trackball.addEventListener('change', NeuronsModelView.renderScene);
   }

   static adjustCamera(dx: number, dy: number, dz: number) {
      var  camera = NeuronsModelView.viewCamera;
      if (!camera) {
         return;
      }
      camera.position.x = camera.position.x + dx;
      camera.position.y = camera.position.y + dy;
      camera.position.z = camera.position.z + dz;
   }

   redisplay() {
    window.addEventListener("resize", NeuronsModelView.onWindowResize);
    NeuronsModelView.listenNeuronsStageEvents();

     var prevTarget = {
        x: 0,
        y: 0,
        z: 0
     };
     if (NeuronsModelView.appCamControl) {
        prevTarget.x = NeuronsModelView.appCamControl.target.x;
        prevTarget.y = NeuronsModelView.appCamControl.target.y;
        prevTarget.z = NeuronsModelView.appCamControl.target.z;
        NeuronsModelView.appCamControl.dispose();
     }

     var trackball = new THREE.TrackballControls(NeuronsModelView.viewCamera, document.getElementById('neurons-stage-div'));
     NeuronsModelView.appCamControl = trackball;
     trackball.setTarget(prevTarget.x, prevTarget.y, prevTarget.z);
     trackball.rotateSpeed = 1.0;
     trackball.zoomSpeed = 1.0;
     trackball.panSpeed = 1.0;
     trackball.noZoom = false;
     trackball.noPan = false;
     trackball.staticMoving = true;
     trackball.dynamicDampingFactor = 0.3;
     trackball.keys = [ 65, 83, 68 ];
     trackball.addEventListener('change', NeuronsModelView.renderScene);
   }

   addShowObjects(): void {
     var vscene =  NeuronsModelView.viewScene;

     var axesHelper = new THREE.AxesHelper(100);
     //vscene.add(axesHelper);
     
     const geometry = new THREE.BoxGeometry(1, 1, 1);
     const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
     const cube = new THREE.Mesh(geometry, material);
     //vscene.add(cube);

     var modelMain = new ModelMain(vscene, this.appService, this.appStates);
     modelMain.create();
   }

   addBackground(): void {
      NeuronsModelView.viewScene.background = new THREE.Color( 0xcce0ff );
   }

   addShowLights(): void {
      NeuronsModelView.viewScene.add( new THREE.AmbientLight( 0xffffff ) );
      var light1 = new THREE.DirectionalLight( 0xdfebff, 1.75 );
      light1.position.set(50, 200, 100);
      light1.position.multiplyScalar(1.3);
      light1.castShadow = false;
      NeuronsModelView.viewScene.add(light1) ;
    
      var light2 = new THREE.DirectionalLight( 0xdfebff, 0.8 );
      light2.position.set(-250, 510, 1150 );
      light2.castShadow = false;
      NeuronsModelView.viewScene.add(light2);
   }

   getCameraAspect(): number {
      var navbarHeight =  this.appStates.getNavbarHeight();
      var height = window.innerHeight - navbarHeight;
      return window.innerWidth / height;
   }

   static onWindowResize() {
      var navbarHeight =  NeuronsModelView.appStatesRef.getNavbarHeight();
      var height = window.innerHeight - navbarHeight;
      NeuronsModelView.viewRender.setSize(window.innerWidth, height);
      NeuronsModelView.animate();
   }

   static listenNeuronsStageEvents() {
      var myObj = document.getElementById('neurons-stage-div');
      for(var key in myObj){
         if(key.search('on') === 0) {
            myObj.addEventListener(key.slice(2), NeuronsModelView.onNeuronsStageEvents);
            
         }
      }
   }

   static onNeuronsStageEvents(event: any) {
      if (!NeuronsModelView.letAnimateRun) {
         NeuronsModelView.animate();
      }
   }

   static animate() {
      NeuronsModelView.letAnimateRun = true;
      NeuronsModelView.animateStartTime = NeuronsModelView.showClock.getElapsedTime();

      NeuronsModelView.animateWork();
   }

   static animateWork() {
      if ( !NeuronsModelView.letAnimateRun ) {
         return;
      }
      var dt = NeuronsModelView.showClock.getElapsedTime() - NeuronsModelView.animateStartTime;
      if (dt > NeuronsModelView.animateLiveSecDefault) {
         NeuronsModelView.letAnimateRun = false;
      }

      requestAnimationFrame(NeuronsModelView.animateWork);

      if (NeuronsModelView.viewRender == null) {
         console.error("viewRender is null");
         return;
      }
  
      var deltaTime = NeuronsModelView.showClock.getDelta();
      var elapsedTime = NeuronsModelView.showClock.getElapsedTime() * 10;
      try {
         NeuronsModelView.renderScene();
         if (NeuronsModelView.appCamControl instanceof THREE.TrackballControls) {
             NeuronsModelView.appCamControl.update();
         }
         /*} else if (NeuronModelView.appCamControl instanceof THREE.TrackballControls) {
            NeuronModelView.appCamControl.update();
         }*/
      } catch(error) {
        console.error("render error " + error);
      }
   }

   static renderScene() {
      NeuronsModelView.viewRender.render(NeuronsModelView.viewScene, NeuronsModelView.viewCamera);
   }
}