export class ModelConfig {

   static clone(configData: any): ModelConfig {
      if (configData == null) {
         return null;
      }
      var modelConfig = Object.assign(new ModelConfig(), configData);
      return modelConfig;
   }
}