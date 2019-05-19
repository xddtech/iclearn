import {ElementRef, Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";

import { HttpClient, HttpHeaders } from '@angular/common/http';

import {AppStates} from './app-states';
import {NeuronsModel} from '../components/model/neurons-model';

@Injectable()
export class AppService {

  neuronsModelSubject = new Subject<NeuronsModel>();
  neuronsModelObservable$ = this.neuronsModelSubject.asObservable();

  constructor(private http: HttpClient) {}

  informNeuronsModelSetup(model: NeuronsModel) {
     this.neuronsModelSubject.next(model);
  }

  getAboutHtml() {
     let reqHeaders = new HttpHeaders({
        'Accept':'plain/text'
     });
     var url = this.getBaseUrl() + '/assets/about.html';
     console.info('url=' + url);
     return this.http.get(url, {headers: reqHeaders, responseType: 'text'});
  }

  loadDefaultModel(): Observable<NeuronsModel> {
     var path = this.getBaseUrl() + '/assets/default-neurons-model.json';
     console.info('path=' + path);
     return this.loadNeuronsModel(path);
  }

  loadNeuronsModel(path: string): Observable<NeuronsModel> {
     this.informModelPath(path);
     return this.http.get<NeuronsModel>(path);
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