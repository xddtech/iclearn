
import * as THREE from 'three';

import {ModelCell} from './model-cell';

export class NetCell {

    static createMesh(modelCell: ModelCell) {
       var cellColor = { color: 0x00ff88 };
       var size = modelCell.netSize;
       var geometry = new THREE.BoxBufferGeometry(size, size, size);
       var material = new THREE.MeshLambertMaterial(cellColor);
       var mesh = new THREE.Mesh( geometry, material );
       return mesh;
    }
}