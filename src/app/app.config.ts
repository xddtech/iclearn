import {Injectable} from '@angular/core';

@Injectable()
export class AppConfig {
  static showDebugRoute = false;
  static labelFont: any;

  constructor() {}

  toString(){};
}