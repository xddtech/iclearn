
import {ModelConfig} from './model-config';
import {ModelLayer} from './model-layer';
import {ModelCell} from './model-cell';
import {LinkInfo} from './link-info';


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
       this.setupLayerLinks();
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

    setupLayerLinks() {
       var index: number;
       for (index = 0; index < this.layers.length - 1; index++) {
          var layer = this.layers[index];
          var nextLayer = this.layers[index + 1];
          this.connectLayers(layer, nextLayer);
       }
    }

    connectLayers(layer: ModelLayer, nextLayer: ModelLayer) {
       switch (layer.linkType) {
          case ModelLayer.DENSELAYER: {
             this.connectDenseLayers(layer, nextLayer);
             break;
          }
          default: {
             console.error('Invalid layer link type at ' + layer.layerIndex);
             break;
          }
       }
    }

    connectDenseLayers(layer: ModelLayer, nextLayer: ModelLayer) {
       if (layer.cellList == null || nextLayer.cellList == null) {
          console.error('Null cellList at one of layers ' + layer.layerIndex + ", " + nextLayer.layerIndex);
          return;
       }
       var i;
       var j;
       for (i = 0; i < layer.cellList.length; i++) {
          for (j = 0; j < nextLayer.cellList.length; j++) {
             if (nextLayer.cellList[j].cellType != ModelCell.BIAS) {
                layer.cellList[i].connectTo(i, nextLayer.cellList[j], j);
             }
          }
       }
    }

    getCellOnLink(linkInfo: LinkInfo): ModelCell {
       var layer = this.layers[linkInfo.layerIndex];
       return layer.cellList[linkInfo.seqIndex];
    }

    static clone(modelData: any): NeuronsModel {
       if (modelData == null) {
          return null;
       }
       var model = Object.assign(new NeuronsModel(), modelData);
       model.config = ModelConfig.clone(model.config);
       for (var i in model.layers) {
          model.layers[i] = ModelLayer.clone(model.layers[i]);
       }
       return model;
    }
}