import * as THREE from 'three';

import {NetCell} from './net-cell';
import {InputCell} from './input-cell';


export class ModelCell {
    static NET = 'NET';
    static BIAS = 'BIAS';
    static INPUT = 'INPUT';
    static OUTPUT = 'OUTPUT';

    netSize = 0.1;
    inputSize = 0.1;

    cellType: string;
    layerIndex: number;
    seqIndex: number;
    label: string;
    activation: string;

    xyz: number[] = [0, 0, 0];
    cellMesh: THREE.Mesh;
    linkToList: ModelCell[] = [];
    linkFromList: ModelCell[] = [];

    constructor() {}

    create(viewScene: THREE.Scene, layerType: string): void {
       this.createMesh(layerType);

       this.cellMesh.matrixAutoUpdate = false;
       this.cellMesh.position.x = this.xyz[0];
       this.cellMesh.position.y = this.xyz[1];
       this.cellMesh.position.z = this.xyz[2];
       this.cellMesh.updateMatrix();
       viewScene.add(this.cellMesh);
       
       this.createExtra();
       if (this.label != null) {
        this.createCellLabel();
      }
    }

    createMesh(layerType: string) {
       var type = this.cellType == null? layerType : this.cellType;
       switch(type) {
          case ModelCell.NET: {
             this.cellMesh = NetCell.createMesh(this);
             break;
          }
          case ModelCell.INPUT: {
             this.cellMesh = InputCell.createMesh(this);
             break;
          }
          default: {
             console.error('No implementation for createMesh on cell type: ' + this.cellType);
             break;
          }
       }
    }

    createExtra() {

    }

    createCellLabel(): void {
    }

    linkTo(cell: ModelCell): void {
       this.linkToList.push(cell);
    }

    linkFrom(cell: ModelCell): void {
        this.linkFromList.push(cell);
     }

    setXyz(x: number, y: number, z: number) {
      this.xyz[0] = x;
      this.xyz[1] = y;
      this.xyz[2] = z;
    }

    static clone(cellData: any): ModelCell {
       if (cellData == null) {
          return null;
       }
       /*
       var cell = new ModelCell();
       cell = Object.assign(cell, cellData);
       if (cellData.xyz) {
          cell.xyz = Object.assign({}, cellData.xyx);
       }
       // linkTo, linkFrom?
       return cell;
      */
       var cell = Object.assign(new ModelCell(), cellData);
       // linkTo, linkFrom?
       return cell;
    }
}