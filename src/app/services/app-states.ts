import {Injectable, ElementRef} from '@angular/core';

import {NeuronsModel} from '../components/model/neurons-model';

declare var JSON: any;

@Injectable()
export class AppStates {

  static navbarElem: ElementRef;
  static neuronsModel: NeuronsModel;
  static neuronsModelPath: string;

  constructor() {}

  getNavbarHeight(): number {
     if(AppStates.navbarElem == null) {
        return 0;
     }
     return AppStates.navbarElem.nativeElement.offsetHeight;
  }

  setCurrentNeuronsModel(neuronsModel: NeuronsModel) {
     AppStates.neuronsModel = neuronsModel;
  }

  getCurrentNeuronsModel(): NeuronsModel {
     return AppStates.neuronsModel;
  }

  static toDebug(): any {
     var json = {};
     if (AppStates.navbarElem) {
        var nav:any = {
           offsetHeight: AppStates.navbarElem.nativeElement.offsetHeight
        }
        json['navbarElem'] = nav;
     }
     if (AppStates.neuronsModel) {
        var model:any = {
           path: AppStates.neuronsModelPath,
           name: AppStates.neuronsModel.name
        }
        json['neuronsModel'] = model;
     }
     return json;
  }
}