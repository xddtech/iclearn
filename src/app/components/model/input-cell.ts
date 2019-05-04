import * as THREE from 'three';

import {ModelCell} from './model-cell';

export class InputCell {

    static createMesh(modelCell: ModelCell) {
       var cellColor = { color: 0x88ff00 };
       var size = modelCell.inputSize;
       var geometry = new THREE.BoxBufferGeometry(size, size, size);
       var material = new THREE.MeshLambertMaterial(cellColor);
       var mesh = new THREE.Mesh( geometry, material );
       return mesh;
    }
}