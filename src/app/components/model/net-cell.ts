
import * as THREE from 'three';

import {ModelCell} from './model-cell';

export class NetCell extends ModelCell {
    cellColor: any = { color: 0x00ff00 }; 

    constructor(params: any) {
       super(params);
       this.cellType = ModelCell.NET;
    }

    createMesh() {
       var geometry = new THREE.BoxBufferGeometry(this.netSize, this.netSize, this.netSize);
       var material = new THREE.MeshLambertMaterial(this.cellColor);
       var mesh = new THREE.Mesh( geometry, material );
       return mesh;
    }

    createExtra() {}
}