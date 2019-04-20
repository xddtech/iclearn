import {Injectable, ElementRef} from '@angular/core';
import {Observable} from "rxjs";

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AppService {

  constructor(private http: HttpClient) {}

  getAboutHtml() {
     let reqHeaders = new HttpHeaders({
        'Accept':'plain/text'
     });
     return this.http.get('/assets/about.html', {headers: reqHeaders, responseType: 'text'});
  }
}