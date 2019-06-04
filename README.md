# iclearn

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.8.

https://xddtech.github.io/iclearn/#/

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Deploy
copy -> update index.html base
<base href="/iclearn/"> <!-- for deploy -->

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Note
"Maximum call stack size exceeded":
I had the same problem. I removed the content of .npmrc, ran the generate command and it worked. After that you can restore the content of your .npmrc if needed.
1. rename C:\Users\u0105848\.npmrc to bak.npmrc; 2. npm install; 3. change bak.npmrc back

http-server /c/xdd-learn/iclearn/dist/iclearn

## THREE
How could I import @types/three in angular2
https://stackoverflow.com/questions/41117407/how-could-i-import-types-three-in-angular2

Using Threejs + OrbitContols in TypeScript
https://stackoverflow.com/questions/19444592/using-threejs-orbitcontols-in-typescript

## Add Controller
c:\xdd-learn\iclearn\node_modules\three\src\Three.d.ts
//XDD
export var TrackballControls: any;
or
export class TrackballControls {
    constructor(camera: any);
    rotateSpeed: number;
    zoomSpeed: number;
    panSpeed: number;
    noZoom: boolean;
    noPan: boolean;
    staticMoving: boolean;
    dynamicDampingFactor: number;
    keys: any;
    addEventListener: any;
    update(): void;
}

c:\xdd-learn\iclearn\src\app\controls\TrackballControls.js
import * as THREE from 'three';

1. add addListeners() for control
	this.addListeners = function () {
	    this.domElement.addEventListener( 'contextmenu', contextmenu, false );
	    this.domElement.addEventListener( 'mousedown', mousedown, false );
	    this.domElement.addEventListener( 'wheel', mousewheel, false );

	    this.domElement.addEventListener( 'touchstart', touchstart, false );
	    this.domElement.addEventListener( 'touchend', touchend, false );
	    this.domElement.addEventListener( 'touchmove', touchmove, false );

	    window.addEventListener( 'keydown', keydown, false );
	    window.addEventListener( 'keyup', keyup, false );
	}
	this.addListeners();
2. define screen.height if dom is passed in
this.handleResize = function () {
   this.screen.height = box.height > 2 ? box.height :  window.innerHeight;