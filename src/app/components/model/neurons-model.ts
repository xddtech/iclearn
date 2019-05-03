
import {ModelConfig} from './model-config';
import {ModelLayer} from './model-layer';
import {ModelCell} from './model-cell';


export class NeuronsModel {
    static MULTILAYER_NETWORK = 'MultiLayerNetwork';
    static SQUARE = 'SQUARE';
    static ROW_FILL = 'ROW_FILL';

    networkType = NeuronsModel.MULTILAYER_NETWORK;
    name = '';
    cellGap = 0.5;
    layerGap = 1;
    maxRowCells = 20;
    cellLayout = NeuronsModel.ROW_FILL;

    config: ModelConfig;
    layers: ModelLayer[];

    create(viewScene: THREE.Scene) {
       var index: number;
       for (index = 0; index < this.layers.length; index++) {
          this.layers[index].create(viewScene);
       }
    }

    preProcess() {
       if ( !this.validate() ) {
          return;
       }

       this.setupLayout();
    }

    validate(): boolean {
       if ( this.layers == null ||  this.layers.length == 0) {
          console.warn('No layers in neurons network');
          return false;
       }
       if (this.layers.length == 1) {
          console.warn('Only one layer in neurons network');
        return false; 
       }
       var cellList0 = this.layers[0].cellList;
       if (cellList0 == null || cellList0.length == 0) {
           console.warn('Empty input cells');
           return false;
       }
       return true;
    }

    setupLayout() {
       // set input layer position below 
       var layerHeight = -this.layerGap;
       var index: number;
       for (index = 0; index < this.layers.length; index++) {
          var layer = this.layers[index];
          layer.setLayerIndex(index);
          layer.layerHeight = layerHeight;
          layer.setupCellLayout(this.cellLayout, this.cellGap, this.maxRowCells);
          layerHeight += this.layerGap;
       }
    }

    updateLayersLayoutOnly() {
       var index: number;
       for (index = 0; index < this.layers.length; index++) {
          var layer = this.layers[index];
          layer.setupCellLayout(this.cellLayout, this.cellGap, this.maxRowCells);
       }        
    }
}