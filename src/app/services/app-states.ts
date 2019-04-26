import {Injectable, ElementRef} from '@angular/core';

import {NeuronsModel} from '../components/model/neurons-model';

declare var JSON: any;

@Injectable()
export class AppStates {

  static navbarElem: ElementRef;
  static neuronsModel: NeuronsModel;

  constructor() {}

  getNavbarHeight(): number {
     if(AppStates.navbarElem == null) {
        return 0;
     }
     return AppStates.navbarElem.nativeElement.offsetHeight;
  }

  static toString() {
     var json = {};
     if (AppStates.navbarElem) {
        var nav:any = {
           offsetHeight: AppStates.navbarElem.nativeElement.offsetHeight
        }
        json['navbarElem'] = nav;
     }
     if (AppStates.neuronsModel) {
        var model:any = {
           name: AppStates.neuronsModel.name
        }
        json['neuronsModel'] = model;
     }
     return JSON.stringify(json);
  }
}