import * as THREE from 'three';

import {NetCell} from './net-cell';
import {InputCell} from './input-cell';
import {LinkInfo} from './link-info';
import {ModelMain} from '../neurons/model-main';


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
    linkToList: LinkInfo[] = [];
    linkFromList: LinkInfo[] = [];

    constructor() {}

    create(viewScene: THREE.Scene, layerType: string): void {
       this.createMesh(layerType);

       this.cellMesh.matrixAutoUpdate = false;
       this.cellMesh.position.x = this.xyz[0];
       this.cellMesh.position.y = this.xyz[1];
       this.cellMesh.position.z = this.xyz[2];
       this.cellMesh.updateMatrix();
       viewScene.add(this.cellMesh);
       
       this.createCellLinks(viewScene);

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

    createCellLinks(viewScene: THREE.Scene) {
       if (this.linkToList == null || this.linkToList.length == 0) {
          return;
       }
       for (let i in this.linkToList) {
          var linkInfo = this.linkToList[i];
          var toCell = ModelMain.currentNeoronsModel.getCellOnLink(linkInfo);
          var line = this.createLinkLine(toCell);
          viewScene.add(line);
       }
    }

    createLinkLine(toCell: ModelCell): THREE.Line {
       var material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
       var geometry = new THREE.Geometry();
       var from = new THREE.Vector3(this.xyz[0], this.xyz[1], this.xyz[2]);
       var to = new THREE.Vector3(toCell.xyz[0], toCell.xyz[1], toCell.xyz[2]);
       geometry.vertices.push(from);
       geometry.vertices.push(to);
       var line = new THREE.Line( geometry, material );
       return line;
    }

    createCellLabel(): void {
    }

    connectTo(fromLayer: number, target: ModelCell, toLayer: number) {
       var to = new LinkInfo();
       to.layerIndex = toLayer;
       to.seqIndex = target.seqIndex;
       to.weight = 0; //?????
       this.linkToList.push(to);

       var from = new LinkInfo();
       from.layerIndex = fromLayer;
       from.seqIndex = this.seqIndex;
       from.weight = 0; ///???
       target.linkFromList.push(from);
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
       var cell = Object.assign(new ModelCell(), cellData);
       // linkTo, linkFrom?
       for (var i in cell.linkTo) {
          cell.linkTo[i] = LinkInfo.clone(cell.linkTo[i]);
       }
       for (var i in cell.linkFrom) {
          cell.linkFrom[i] = LinkInfo.clone(cell.linkFrom[i]);
       }
       return cell;
    }
}