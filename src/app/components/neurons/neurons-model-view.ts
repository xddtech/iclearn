
// /// <reference path="../../../../node_modules/three/src/Three.d.ts" />
import * as THREE from 'three';

import {AppService} from '../../services/app-service';
import {AppStates} from '../../services/app-states';


//declare var THREE: any;

export class NeuronsModelView {

   viewScene: THREE.Scene;
   viewCamera: THREE.PerspectiveCamera
   viewRender: THREE.WebGLRenderer;
   showClock = new THREE.Clock();

   constructor(private neuronsStageElement: Element, private appService: AppService, private appStates: AppStates) {}

   create() {
      this.viewScene = new THREE.Scene();
      this.addCameraAndControls();

      this.viewRender = new THREE.WebGLRenderer({ antialias: true });
      //this.viewRender.setClearColor(new THREE.Color(0xEEEEEE));
      //NeuronModelView_onWindowResize();
      this.neuronsStageElement.appendChild(this.viewRender.domElement);

      window.addEventListener("resize", this.onWindowResize);

      this.addBackground();
      this.addShowObjects();
      this.addShowLights();

      this.animate();
   }

   addCameraAndControls(): void {
      /*
      var fov = 30;
      var aspect = this.getCameraAspect();
      var near = 0.1;
      var far = 500;
      this.viewCamera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      this.viewCamera.position.x = 0;
      this.viewCamera.position.y = 2;
      this.viewCamera.position.z = 12;
    
      var lookAt = new THREE.Vector3(0, 8, -1);
      this.viewCamera.lookAt(lookAt);
      */
      this.viewCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      this.viewCamera.position.z = 5;
   }

   addShowObjects(): void {
     /*
     var axisHelper = new THREE.AxisHelper(100);
     this.viewScene.add(axisHelper);
     */
     const geometry = new THREE.BoxGeometry(1, 1, 1);
     const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
     const cube = new THREE.Mesh(geometry, material);
     this.viewScene.add(cube);
   }

   addBackground(): void {
      //this.viewScene.background = new THREE.Color( 0xcce0ff );
   }

   addShowLights(): void {
      this.viewScene.add( new THREE.AmbientLight( 0xffffff ) );
      var light1 = new THREE.DirectionalLight( 0xdfebff, 1.75 );
      light1.position.set(50, 200, 100);
      light1.position.multiplyScalar(1.3);
      light1.castShadow = false;
      this.viewScene.add(light1) ;
    
      var light2 = new THREE.DirectionalLight( 0xdfebff, 0.8 );
      light2.position.set(-250, 510, 1150 );
      light2.castShadow = false;
      this.viewScene.add(light2);
   }

   getCameraAspect(): number {
      var navbarHeight =  this.appStates.getNavbarHeight();
      var height = window.innerHeight - navbarHeight;
      return window.innerWidth / height;
   }

   onWindowResize() {
      var navbarHeight =  this.appStates.getNavbarHeight();
      var height = window.innerHeight - navbarHeight;
      this.viewRender.setSize(window.innerWidth, height);
   }

   animate() {
      requestAnimationFrame(this.animate);
  
      var deltaTime = this.showClock.getDelta();
      var elapsedTime = this.showClock.getElapsedTime() * 10;
   
      if (this.viewRender != null) {
      try {
         this.viewRender.render(this.viewScene, this.viewCamera);
         /*
         if (NeuronModelView.appCamControl instanceof THREE.FirstPersonControls) {
            NeuronModelView.appCamControl.update(deltaTime);
         } else if (NeuronModelView.appCamControl instanceof THREE.TrackballControls) {
            NeuronModelView.appCamControl.update();
         }
         */
      } catch(error) {
        console.error("render error " + error);
      }
    } else {
       console.error("appRender is null");
    }
  }
}