import {Injectable, ElementRef} from '@angular/core';
import {Observable} from "rxjs";

import { HttpClient, HttpHeaders } from '@angular/common/http';

import {AppStates} from './app-states';
import {NeuronsModel} from '../components/model/neurons-model';

@Injectable()
export class AppService {

  constructor(private http: HttpClient) {}

  getAboutHtml() {
     let reqHeaders = new HttpHeaders({
        'Accept':'plain/text'
     });
     return this.http.get('/assets/about.html', {headers: reqHeaders, responseType: 'text'});
  }

  loadDefaultModel(): Observable<NeuronsModel> {
     var path = '/assets/default-neurons-model.json';
     return this.loadNeuronsModel(path);
  }

  loadNeuronsModel(path: string): Observable<NeuronsModel> {
     this.informModelPath(path);
     return this.http.get<NeuronsModel>(path);
  }

  informModelPath(path: string) {
     AppStates.neuronsModelPath = path;
  }
}