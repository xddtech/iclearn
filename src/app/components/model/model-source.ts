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
     this.neuronsModelSrc = appStates.getCurrentNeuronsModelSrc();
  }

  ngOnInit(){
     this.neuronsModelName = "unknown";
     this.neuronsModelPath = AppStates.neuronsModelPath;
     this.sourceDetail = this.neuronsModelSrc;
     if (this.neuronsModelSrc) {
        this.generateModelDetail();
     } else {
        this.sourceDetail = "neuronsModelSrc is null";
     }
     this.sourceHtmlDetail = this.sanitizer.bypassSecurityTrustHtml(this.sourceDetail);
  }

  ngAfterViewInit() {
  }

  generateModelDetail() {
     //this.sourceDetail = 'here';
     //this.traverseObject(this.neuronsModelSrc);
     //this.neuronsModelSrc = this.appStates.getCurrentNeuronsModelSrc();
     //this.sourceDetail = this.neuronsModelSrc;
  }

  traverseObject(obj: any) {
     /*
     var type = typeof obj;
     if (type == 'object') {
        for (var key in obj) {
            this.traverseObject(obj[key]);
        }
     } else {
        this.sourceDetail += ';' + JSON.stringify(obj);
     }
     */
     this.sourceDetail =  JSON.stringify(obj);
  }
}