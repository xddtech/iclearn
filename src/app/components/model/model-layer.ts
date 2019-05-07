import * as THREE from 'three';

import {ModelCell} from './model-cell';
import {NeuronsModel} from './neurons-model';

export class ModelLayer {
    static NET = 'NET';
    static INPUT = 'INPUT';
    static OUTPUT = 'OUTPUT';
    static DENSELAYER = "DenseLayer";

    layerType: string;
    linkType: string;
    layerIndex: number;
    layerHeight: number;
    cellList: ModelCell[] = [];
    hasBias: boolean = false;

    layerGroup: THREE.Group;


    constructor() {
    }

    create(rootGroup: THREE.Group) {
      this.layerGroup = new THREE.Group();
      rootGroup.add(this.layerGroup);
       var i: number;
       for (i = 0; i < this.cellList.length; i++) {
          this.cellList[i].create(this.layerGroup, this.layerType);
       }
    }

    collectLayerInfo() {
      for (let i in this.cellList) {
         if (this.cellList[i].cellType == ModelCell.BIAS) {
            this.hasBias = true;
         }
      }
    }

    addCell(cell: ModelCell) {
       cell.layerIndex = this.layerIndex;
       this.cellList.push(cell);
    }

    setLayerIndex(index: number) {
       this.layerIndex = index;
       var i: number;
       for (i = 0; i < this.cellList.length; i++) {
          this.cellList[i].layerIndex = this.layerIndex;
       }
    }

    setupCellLayout(cellLayout: string, cellGap: number, maxRowCells: number) {
       if (cellLayout === NeuronsModel.SQUARE) {
          this.setupCellLayoutSquare(this.layerHeight, cellGap);
       } else {
          this.setupCellLayoutRowFill(this.layerHeight, cellGap, maxRowCells);
       }
    }

    setupCellLayoutRowFill(layerHeight: number, cellGap: number, maxRowCells: number) {
       if (this.cellList == null || this.cellList.length == 0) {
          console.error('cellList is empty at layer ' + this.layerIndex);
          return;
       }
       var cellsCount = this.cellList.length;
       var zpos = 0;
       var rowCells = cellsCount > maxRowCells? maxRowCells : cellsCount;
       var xpos = -(rowCells - 1) * cellGap / 2;
       var ypos = layerHeight;
       var seq: number;
       var rowCount = 0;
       for (seq = 0; seq < cellsCount; seq++) {
          var cell = this.cellList[seq];
          cell.seqIndex = seq;
          cell.setXyz(xpos, ypos, zpos);
          rowCount++;
          if (rowCount > maxRowCells) {
             rowCount = 0;
             zpos = -cellGap;
             rowCells = (cellsCount - seq) > maxRowCells? maxRowCells : (cellsCount - seq);
             xpos = - rowCells * cellGap / 2; 
          } else {
             xpos += cellGap;
          }
       }
    }

    setupCellLayoutSquare(layerHeight: number, cellGap: number) {

    }

    static clone(layerData: any): ModelLayer {
       if ( layerData == null) {
         return null;
       }
       var layer = Object.assign(new ModelLayer(), layerData);
       for (let i in layer.cellList) {
          layer.cellList[i] = ModelCell.clone(layer.cellList[i]);
       }
       return layer;
    }
}