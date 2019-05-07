import * as THREE from 'three';

import {ModelCell} from './model-cell';

export class OutputCell {

    static geometry: any;
    static material: any;

    static createMesh(modelCell: ModelCell) {
       if ( !OutputCell.geometry ) {
          var size = modelCell.inputSize;
          var cellColor = {color: 0x004444, specular: 0xaaaaaa, shininess: 30}
          OutputCell.geometry = new THREE.SphereGeometry(size/2, 32, 32);
          OutputCell.material = new THREE.MeshPhongMaterial(cellColor);
       }
       var mesh = new THREE.Mesh( OutputCell.geometry, OutputCell.material );
       return mesh;
    }
}