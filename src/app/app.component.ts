import {Component, AfterViewInit} from '@angular/core';
import * as THREE from 'three';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
   title = 'iclearn';
   scene: any;
   camera: any;
   renderer: any;
   geometry: any;
   material: any;
   mesh: any;

   constructor() {}

   ngAfterViewInit() {
   }

   /********** for test purpose
   ngAfterViewInit() {
      //this.init();
      //this.animate();
   }

   init() {
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
      this.camera.position.z = 1000;

      this.geometry = new THREE.BoxGeometry(200, 200, 200);
      this.material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });

      this.mesh = new THREE.Mesh(this.geometry, this.material);
      this.scene.add(this.mesh);

      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(window.innerWidth, window.innerHeight);

      document.body.appendChild(this.renderer.domElement);
   }

  animate() {
     requestAnimationFrame(this.animate);
     this.mesh.rotation.x += 0.01;
     this.mesh.rotation.y += 0.02;
     this.renderer.render(this.scene, this.camera);
  }
  */
}
