import {Injectable, ElementRef} from '@angular/core';

import {NeuronsModel} from '../components/model/neurons-model';
import {NeuronsModelView} from '../components/neurons/neurons-model-view';

declare var JSON: any;

@Injectable()
export class AppStates {

  static navbarElem: ElementRef;
  static neuronsModel: NeuronsModel;
  static neuronsModelSrc: string;
  static neuronsModelPath: string;
  static neuronsModelViewRef: NeuronsModelView;

  constructor() {}

  getNavbarHeight(): number {
     if(AppStates.navbarElem == null) {
        return 0;
     }
     return AppStates.navbarElem.nativeElement.offsetHeight;
  }

  setCurrentNeuronsModel(neuronsModel: NeuronsModel, neuronsModelSrc: string) {
     AppStates.neuronsModel = neuronsModel;
     AppStates.neuronsModelSrc = neuronsModelSrc;
  }

  getCurrentNeuronsModel(): NeuronsModel {
     return AppStates.neuronsModel;
  }

  setCurrentNeuronsModelView(neuronsModelView: NeuronsModelView ){
     AppStates.neuronsModelViewRef = neuronsModelView;
  }

  getCurrentNeuronsModelView(): NeuronsModelView {
     return AppStates.neuronsModelViewRef;
  }

  getCurrentNeuronsModelSrc(): string {
     return AppStates.neuronsModelSrc;
  }

  static clickModelSourceNode(btnId: string) {
     //alert( 'clicked: ' + btnId);
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
     var win = {
        locationHref: window.location.href,
        locationOrign: window.location.origin
     }
     json['window'] = win;
     return json;
  }
}