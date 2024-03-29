import * as THREE from 'three';

import {ModelCell} from './model-cell';

export class InputCell {

    static geometry: any;
    static material: any;

    static createMesh(modelCell: ModelCell) {
       if ( !InputCell.geometry ) {
          var size = modelCell.inputSize;
          var cellColor = {color: 0x004444, specular: 0xaaaaaa, shininess: 30}
          InputCell.geometry = new THREE.CylinderGeometry(size/2, size/2, size, 16 )
          InputCell.material = new THREE.MeshPhongMaterial(cellColor);
       }
       var mesh = new THREE.Mesh( InputCell.geometry, InputCell.material );
       return mesh;
    }
}