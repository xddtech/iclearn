import {ModelConfig} from './model-config';
import {ModelLayer} from './model-layer';

export class NeuronsModel {
    name = '';
    config: ModelConfig;
    layers: ModelLayer[];

    static getDefaultModel(): NeuronsModel {
       var model = new NeuronsModel();
       model.name = 'Default Model';
       return model;
    }
}