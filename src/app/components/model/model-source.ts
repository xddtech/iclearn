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
  //collapsableSourceList = [];

  static btnState = {};

  constructor(private appService: AppService, private appStates: AppStates, private sanitizer: DomSanitizer) {
  }

  ngOnInit(){
     this.getModelSource();
  }

  ngAfterViewInit() {
     $('#model-source-detail').find('ul').addClass('model-source-ul');
     /*
     for (var path in this.collapsableSourceList) {
        var target = path + '-target';
        //$('#' + path).attr('data-toggle', 'collapse');
        //$('#' + path).attr('data-target', target);
        //$('#' + target).addClass('expand-line');
        var btnId = path + '-btn';
    }
    */
    $('#model-source-list .expand-btn').click(function(event) {
       var btnId = event.target.id;
       var sign = $('#' + event.target.id).val();
       sign = (sign == '+')? '=' : '+';
       $('#' + event.target.id).val(sign);
       ModelSourceComponent.btnState['btn' + btnId] = sign;

       AppStates.clickModelSourceNode(btnId);
    });
  }

  ngAfterViewChecked() {
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
     //this.collapsableSourceList = [];
     var rawJson = JSON.parse(this.neuronsModelSrc);
     this.neuronsModelName = rawJson.name;
     //this.sourceDetail = this.neuronsModelSrc;
     this.sourceDetail = '<ul id="model-source-list" class="model-root-ul">';
     this.traverseObject('root', rawJson, '');
     this.sourceDetail += '</ul>';
  }

  traverseObject(key: string, obj: any, ppath: string) {
    var type = typeof obj;
    if (type == 'object') {
       var path = ppath;
       var isArray = Array.isArray(obj);
       var isEmpty = true;
       for (var ckey in obj) {
          isEmpty = false;
          var child =  obj[ckey];
          var isChildObject = typeof child == 'object' ? true : false;
          if (isChildObject) {
             path = ppath + '-' + ckey;
             var target = path + '-target';

             var btnId = path + '-btn'; 
             var collapse = 'collapse';
             var sign = '+';
             if (ModelSourceComponent.btnState['btn' + btnId]) {
                if (ModelSourceComponent.btnState['btn' + btnId] == '+') {
                  collapse = 'collapse';
                  sign = '+'
                } else {
                  collapse = 'collapse.show';
                  sign = '=';
                }
             }
             var btn = '<input type="button" id="' + btnId + '" href="#' + target + 
                       '" data-toggle="collapse" value="' + sign + '" class="expand-btn"></input>';
              //value="&#58" --> :

             var desc = this.getNodeDescription(child, ckey, key);
             var line = '<li id="' + path + '" >' + btn + '&nbsp;<b>' + desc + '</b>:' +  
                    '<ul id="' + target + '" class="' + collapse + ' expand-verticalline model-source-ul">';

             this.sourceDetail += line;
             //this.collapsableSourceList.push(path);
          }
          this.traverseObject(ckey, obj[ckey], path);
          if (isChildObject) {
             this.sourceDetail += '</ul></li>';
          }
       }
       if (isEmpty) {
          this.sourceDetail += '<li class="model-source-li model-empty-li">empty object</li>';
       }
    } else {
      this.sourceDetail += '<li class="model-source-li">';
      this.sourceDetail +=  key + ': ' + JSON.stringify(obj);
      this.sourceDetail += '</li>';
    }
  }

  getNodeDescription(obj: any, key: string, parentKey: any): string {
     if (parentKey === 'layers') {
        return obj.layerType + '-' + obj.linkType + ' (' + obj.cellList.length + ')';
     }
     if (key === 'cellList') {
        return 'cellList (' + obj.length + ')';
     }
     if (parentKey === 'cellList') {
        return obj.cellType;
     }
     return key;
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