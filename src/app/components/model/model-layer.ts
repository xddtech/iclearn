
import {ModelCell} from './model-cell';
import {NeuronsModel} from './neurons-model';

export class ModelLayer {
    static NET = 'NET';
    static INPUT = 'INPUT';
    static OUTPUT = 'OUTPUT';

    layerType: string;
    layerIndex: number;
    layerHeight: number;
    cellList: ModelCell[] = [];

    constructor() {}

    create(viewScene: THREE.Scene) {
       var i: number;
       for (i = 0; i < this.cellList.length; i++) {
          this.cellList[i].create(viewScene, this.layerType);
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
       var xpos = -rowCells * cellGap / 2;
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
       /*
       var layer = new ModelLayer();
       layer = Object.assign(layer, layerData);
       if (layerData.cellList) {
          var cellList: ModelCell[] = [];
          var i;
          for (i = 0; i < layerData.cellList.length; i++) {
             var cell = ModelCell.clone(layerData.cellList[i]);
             cellList.push(cell);
          }
          layer.cellList = cellList;
       }
       return layer;
       */
       /*
       if (layerData.cellList) {
          var i;
          for (i = 0; i < layerData.cellList.length; i++) {
            layerData.cellList[i] = ModelCell.clone(layerData.cellList[i]);
          }
       }
       var layer = Object.assign(new ModelLayer(), layerData);
       */
       var layer = Object.assign(new ModelLayer(), layerData);
       for (let i in layer.cellList) {
          layer.cellList[i] = ModelCell.clone(layer.cellList[i]);
       }
       return layer;
    }
}