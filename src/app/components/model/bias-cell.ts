import * as THREE from 'three';

import {ModelCell} from './model-cell';

export class BiasCell {

    static geometry: any;
    static material: any;

    static createMesh(modelCell: ModelCell) {
       if ( !BiasCell.geometry ) {
          var size = modelCell.inputSize;
          var cellColor = {color: 0x444444, specular: 0xaaaaaa, shininess: 30}
          BiasCell.geometry = new THREE.CylinderGeometry(size/2, 0, size, 4, 1, false)
          BiasCell.material = new THREE.MeshPhongMaterial(cellColor);
       }
       var mesh = new THREE.Mesh( BiasCell.geometry, BiasCell.material );
       return mesh;
    }
}