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
  neuronsModel: NeuronsModel;
  sourceHtmlDetail: SafeHtml;
  sourceDetail: string;

  constructor(private appService: AppService, private appStates: AppStates, private sanitizer: DomSanitizer) {
     this.neuronsModel = appStates.getCurrentNeuronsModel();
  }

  ngOnInit(){
     if (this.neuronsModel) {
        this.generateModelDetail();
     } else {
        this.sourceDetail = "neuronsModel is null";
     }
     this.sourceHtmlDetail = this.sanitizer.bypassSecurityTrustHtml(this.sourceDetail);
  }

  ngAfterViewInit() {
  }

  generateModelDetail() {
     this.sourceDetail = 'here';
     //this.traverseObject(this.neuronsModel);
  }

  traverseObject(obj: any) {
     var type = typeof obj;
     if (type == 'object') {
        for (var key in obj) {
            this.traverseObject(obj[key]);
        }
     } else {
        this.sourceDetail += ';' + obj;
     }
  }
}