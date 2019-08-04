import * as THREE from 'three';

import {NetCell} from './net-cell';
import {InputCell} from './input-cell';
import {OutputCell} from './output-cell';
import {BiasCell} from './bias-cell';
import {LinkInfo} from './link-info';
import {ModelMain} from '../neurons/model-main';
import {AppConfig} from '../../app.config';


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
    W: number[] = [];

    xyz: number[] = [0, 0, 0];
    cellMesh: THREE.Mesh;
    linkToList: LinkInfo[] = [];
    linkFromList: LinkInfo[] = [];

    constructor() {}

    create(layerGroup: THREE.Group, layerType: string): void {
       this.createMesh(layerType);
       if ( !this.cellMesh ) {
          console.error('Failed to create cell mesh at layer ' + this.layerIndex + ', cell seqIndex ' + this.seqIndex);
          return;
       }

       this.cellMesh.matrixAutoUpdate = false;
       this.cellMesh.position.x = this.xyz[0];
       this.cellMesh.position.y = this.xyz[1];
       this.cellMesh.position.z = this.xyz[2];
       this.cellMesh.updateMatrix();
       layerGroup.add(this.cellMesh);
       
       this.createCellLinks(layerGroup);

       if (this.label != null) {
          this.createCellLabel(layerGroup, layerType);
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
          case ModelCell.BIAS: {
            this.cellMesh = BiasCell.createMesh(this);
            break;
          }
          case ModelCell.OUTPUT: {
             this.cellMesh = OutputCell.createMesh(this);
             break;
          }
          default: {
             console.error('No implementation for createMesh on cell type: ' + this.cellType);
             break;
          }
       }
    }

    createCellLinks(layerGroup: THREE.Group) {
       if (this.linkToList == null || this.linkToList.length == 0) {
          return;
       }
       var index = 0;
       for (index = 0; index < this.linkToList.length; index++) {
          var linkInfo = this.linkToList[index];
          var toCell = ModelMain.currentNeoronsModel.getCellOnLink(linkInfo);
          var toW = this.getToW(index);
          var line = this.createLinkLine(toCell, toW);
          layerGroup.add(line);
       }
    }

    getToW(index: number): number {
       if ( !this.W || (index >= this.W.length)) {
          return 0;
       }
       return this.W[index];
    }

    createLinkLine(toCell: ModelCell, toW: number): THREE.Line {
       var linkColor = this.getLinkColor(toW);
       var material = new THREE.LineBasicMaterial( linkColor );
       var geometry = new THREE.Geometry();
       var from = new THREE.Vector3(this.xyz[0], this.xyz[1], this.xyz[2]);
       var to = new THREE.Vector3(toCell.xyz[0], toCell.xyz[1], toCell.xyz[2]);
       geometry.vertices.push(from);
       geometry.vertices.push(to);
       var line = new THREE.Line( geometry, material );
       return line;
    }

    getLinkColor(toW: number): any {
       var red = (toW > 0)? 255 : 10;
       var green = (toW > 0)? 10 : 10;
       var blue = (toW > 0)? 10 : 255;
       var col = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
       return { color: col};
    }

    createCellLabel(layerGroup: THREE.Group, layerType: string): void {
       var ctype = this.cellType == null? layerType : this.cellType;
       if (ctype !== ModelCell.INPUT && ctype !== ModelCell.OUTPUT) {
          return;
       }
       var lsize = 0.1;
       var lheight = 0.025;
       var dx = 0;
       var dy = 0;
       if (ctype == ModelCell.INPUT) {
          dx = -0.05;
          dy = -this.inputSize - 0.125;
       } else if (ctype == ModelCell.OUTPUT) {
          dx = -0.05;
          dy = this.inputSize/2 + 0.05;
       }
       var param = {
         font: AppConfig.labelFont,
         size: lsize,
         height: lheight
       };
       var textGeo = new THREE.TextGeometry(this.label, <THREE.TextGeometryParameters>param);
       var material = new THREE.MeshPhongMaterial({ color: 0x000000, flatShading: true });
       textGeo.computeBoundingBox();
       textGeo.computeVertexNormals();
       var mesh = new THREE.Mesh(textGeo, material);
       mesh.position.x = this.xyz[0] + dx;
       mesh.position.y = this.xyz[1] + dy;
       mesh.position.z = this.xyz[2];
       layerGroup.add(mesh);
    }

    getDescription(): any {
       return this.label ? this.label : this.seqIndex;
    }

    connectTo(target: ModelCell) {
       var to = new LinkInfo();
       to.layerIndex = target.layerIndex;
       to.seqIndex = target.seqIndex;
       to.weight = 0; //?????
       this.linkToList.push(to);

       var from = new LinkInfo();
       from.layerIndex = this.layerIndex;
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