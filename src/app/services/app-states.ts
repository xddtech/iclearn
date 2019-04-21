import {Injectable, ElementRef} from '@angular/core';

declare var JSON: any;

@Injectable()
export class AppStates {

  static navbarElem: ElementRef;

  constructor() {}

  getNavbarHeight(): number {
     if(AppStates.navbarElem == null) {
        return 0;
     }
     return AppStates.navbarElem.nativeElement.offsetHeight;
  }

  static toString() {
     let buf = 'navbarElem >> ';
     if (AppStates.navbarElem) {
        buf += 'offsetHeight:' + AppStates.navbarElem.nativeElement.offsetHeight
     }
     return buf;
  }
}