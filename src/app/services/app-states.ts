import {Injectable, ElementRef} from '@angular/core';

declare var JSON: any;

@Injectable()
export class AppStates {

  static navbarElem: ElementRef;

  constructor() {}

  toString() {
     let buf = 'navbarElem >> ';
     if (AppStates.navbarElem) {
        buf += 'offsetHeight:' + AppStates.navbarElem.nativeElement.offsetHeight
     }
     return buf;
  }
}