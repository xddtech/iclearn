
import {ModelCell} from './model-cell';
import {NeuronsModel} from './neurons-model';

export class ModelLayer {
    static NET = 'NET';
    static INPUT = 'INPUT';
    static OUTPUT = 'OUTPUT';

    layerType: string;
    layerIndex: number;
    cellList: ModelCell[] = [];

    constructor() {}

    create(viewScene: THREE.Scene) {

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

    setupCellLayout(cellLayout: string, layerHeight: number, cellGap: number, maxRowCells: number) {
       if (cellLayout === NeuronsModel.SQUARE) {
          this.setupCellLayoutSquare(layerHeight, cellGap);
       } else {
          this.setupCellLayoutRowFill(layerHeight, cellGap, maxRowCells);
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
}