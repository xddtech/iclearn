import {ElementRef, Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";

import { HttpClient, HttpHeaders } from '@angular/common/http';

import {AppStates} from './app-states';
import {NeuronsModel} from '../components/model/neurons-model';

@Injectable()
export class AppService {

  modelPathList = ['/assets/default-neurons-model.json', '/assets/iris-model-4+3@10+3.json'];
  defaultModelPath = this.modelPathList[1];

  constructor(private http: HttpClient) {}

  getAboutHtml() {
     let reqHeaders = new HttpHeaders({
        'Accept':'plain/text'
     });
     var url = this.getBaseUrl() + '/assets/about.html';
     console.info('url=' + url);
     return this.http.get(url, {headers: reqHeaders, responseType: 'text'});
  }

  loadDefaultModel(): Observable<NeuronsModel> {
     var path = this.getBaseUrl() + this.defaultModelPath;
     return this.loadNeuronsModel(path);
  }

  loadNeuronsModel(path: string): Observable<NeuronsModel> {
     this.informModelPath(path);
     return this.http.get<NeuronsModel>(path);
  }

  loadDefaultModelSrc(): Observable<Object> {
     var path = this.getBaseUrl() + this.defaultModelPath;
     return this.loadNeuronsModelSrc(path);
  }

  loadNeuronsModelSrc(path: string): Observable<Object> {
     this.informModelPath(path);
     let reqHeaders = new HttpHeaders({
        'Accept':'application/json'
     });
     return this.http.get(path, {headers: reqHeaders, responseType: 'json'});
  }

  informModelPath(path: string) {
     AppStates.neuronsModelPath = path;
  }

  getBaseUrl(): string {
     var index = window.location.href.indexOf('/#');
     if (index < 0) {
        return window.location.href;
     }
     return window.location.href.substr(0, index);
  }
}