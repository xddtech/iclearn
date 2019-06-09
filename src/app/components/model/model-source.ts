import {Component, AfterViewInit, OnInit} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {Observable} from "rxjs";

import {AppService} from '../../services/app-service';
import {AppStates} from '../../services/app-states';
import {NeuronsModel} from './neurons-model';

@Component({
  selector: 'model-source',
  templateUrl: 'model-source.html',
  providers: [AppService, AppStates]
})
export default class ModelSourceComponent implements AfterViewInit, OnInit {
  neuronsModelName: string;
  neuronsModelPath: string;
  neuronsModelSrc: string;
  sourceHtmlDetail: SafeHtml;
  sourceDetail: string;

  constructor(private appService: AppService, private appStates: AppStates, private sanitizer: DomSanitizer) {
  }

  ngOnInit(){
     this.getModelSource();
  }

  ngAfterViewInit() {
  }

  getModelSource() {
     this.neuronsModelSrc = this.appStates.getCurrentNeuronsModelSrc();
     if (this.neuronsModelSrc) {
        this.generateModelDetail();
     } else {
        this.neuronsModelName = "undefined";
        this.sourceDetail = "neuronsModelSrc is null";
     }
     this.neuronsModelPath = AppStates.neuronsModelPath;
     this.sourceHtmlDetail = this.sanitizer.bypassSecurityTrustHtml(this.sourceDetail);
  }

  generateModelDetail() {
     var rawJson = JSON.parse(this.neuronsModelSrc);
     this.neuronsModelName = rawJson.name;
     //this.sourceDetail = this.neuronsModelSrc;
     this.sourceDetail = '<ul>';
     this.traverseObject('root', rawJson);
     this.sourceDetail += '</ul>';
  }

  traverseObject(key: string, obj: any) {
     var type = typeof obj;
     if (type == 'object') {
        for (var key in obj) {
           var child =  obj[key];
           var isChildObject = typeof child == 'object' ? true : false;
           if (isChildObject) {
              this.sourceDetail += '<li>' + key + ':<ul>';
           }
           this.traverseObject(key, obj[key]);
           if (isChildObject) {
              this.sourceDetail += '</ul></li>';
           }
        }
     } else {
       this.sourceDetail += '<li>';
       this.sourceDetail += key + ': ' + ((obj == null)? 'null' : JSON.stringify(obj)) + ',';
       this.sourceDetail += '</li>';
     }
  }
}