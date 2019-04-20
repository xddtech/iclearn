import {ElementRef} from '@angular/core';

export class AppStates {

  constructor(public title: string) {}

  static navbarElem: ElementRef;

  static toString() {
     let buf = 'navbarElem:\n';
     return buf;
  }
}