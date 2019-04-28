
import {ModelConfig} from './model-config';
import {ModelLayer} from './model-layer';


export class NeuronsModel {
    static SQUARE = 'SQUARE';
    static ROW_FILL = 'ROW_FILL';
    name = '';
    cellGap = 0.5;
    layerGap = 1;
    maxRowCells = 20;
    cellLayout = NeuronsModel.ROW_FILL;

    config: ModelConfig;
    layers: ModelLayer[];

    create(viewScene: THREE.Scene) {
        
    }

    preProcess() {
        // set input layer below 
        var layerHeight = -this.layerGap;
        var index: number;
        for (index = 0; index < this.layers.length; index++) {
            var layer = this.layers[index];
            layer.setLayerIndex(index);
            layer.setupCellLayout(this.cellLayout, layerHeight, this.cellGap, this.maxRowCells);
            layerHeight += this.layerGap;
        }

    }

}