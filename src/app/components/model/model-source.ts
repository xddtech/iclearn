import {Component, AfterViewInit, OnInit, AfterViewChecked} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {Observable} from "rxjs";

import {AppService} from '../../services/app-service';
import {AppStates} from '../../services/app-states';
import {NeuronsModel} from './neurons-model';

declare var $: any;

@Component({
  selector: 'model-source',
  templateUrl: 'model-source.html',
  styleUrls: ['./model-source.css'],
  providers: [AppService, AppStates]
})
export default class ModelSourceComponent implements AfterViewInit, OnInit, AfterViewChecked {
  neuronsModelName: string;
  neuronsModelPath: string;
  neuronsModelSrc: string;
  sourceHtmlDetail: SafeHtml;
  sourceDetail: string;
  collapsableSourceList = [];

  constructor(private appService: AppService, private appStates: AppStates, private sanitizer: DomSanitizer) {
  }

  ngOnInit(){
     this.getModelSource();
  }

  ngAfterViewInit() {
     $('#model-source-detail').find('ul').addClass('model-source-ul');
     for (var path in this.collapsableSourceList) {
        var target = path + '-target';
        //$('#' + path).attr('data-toggle', 'collapse');
        //$('#' + path).attr('data-target', target);
        //$('#' + target).addClass('expand-line');

        var btnId = path + '-btn';
        //$('#' + btnId).onclick = ModelSourceComponent.expandBtnClick(btnId);
        /* myEl is null
        var myEl = document.getElementById(btnId);
        myEl.addEventListener('click', function() {
           alert('Hello world');
        }, false);
        */
    }
  }

  ngAfterViewChecked() {
    /*
    for (var path in this.collapsableSourceList) {
       var target = path + '-target';
       var btnId = path + '-btn';
       // only called first time??
       $('#' + btnId).onclick = ModelSourceComponent.expandBtnClick(btnId);
   }
   */
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
     this.collapsableSourceList = [];
     var rawJson = JSON.parse(this.neuronsModelSrc);
     this.neuronsModelName = rawJson.name;
     //this.sourceDetail = this.neuronsModelSrc;
     this.sourceDetail = '<ul id="model-source-list" class="nobull">';
     this.traverseObject('root', rawJson, '');
     this.sourceDetail += '</ul>';
  }

  traverseObject(key: string, obj: any, ppath: string) {
    var type = typeof obj;
    if (type == 'object') {
       var path = ppath;
       var isArray = Array.isArray(obj);
       for (var key in obj) {
          var child =  obj[key];
          var isChildObject = typeof child == 'object' ? true : false;
          if (isChildObject) {
             path = ppath + '-' + key;
             var target = path + '-target';

             var btnId = path + '-btn'; 
             var btn = '<input type="button" id="' + btnId + '" href="#' + target + 
                       '" data-toggle="collapse" value="+" class="expand-btn"></input>';

             var line = '<li id="' + path + '" >' + btn + '&nbsp;' + key + ':' +  
                             '<ul id="' + target + '" class="collapse expand-verticalline model-source-ul">';
             this.sourceDetail += line;
             this.collapsableSourceList.push(path);
          }
          this.traverseObject(key, obj[key], path);
          if (isChildObject) {
             this.sourceDetail += '</ul></li>';
          }
       }
    } else {
      this.sourceDetail += '<li class="model-source-li">';
      this.sourceDetail +=  key + ': ' + ((obj == null)? 'null' : JSON.stringify(obj));
      this.sourceDetail += '</li>';
    }
  }

  static expandBtnClick(btnId: string) {
     //$('#' + btnId).value('=');
    //var e = event;
    //e.target.vaule = (e.target.value == '+' ? '=' : '+');
    //this.value = (this.value == '+' ? '=' : '+');
    //alert(btnId);
    /* can't find object
    var myEl = document.getElementById(btnId);
    if (!myEl) {
       console.error(btnId + ' is null');
    }
    */
  }
}