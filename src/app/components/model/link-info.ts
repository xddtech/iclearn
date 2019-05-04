
export class LinkInfo {
   layerIndex: number;
   seqIndex: number;
   weight: number;

   static clone(linkData: any): LinkInfo {
      if (linkData == null) {
         return null;
      }
      var link = Object.assign(new LinkInfo(), linkData);
      return link;
   }
}