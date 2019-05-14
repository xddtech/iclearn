import {ElementRef, ComponentFactoryResolver, Injectable, Inject, ReflectiveInjector, ViewContainerRef} from '@angular/core';
import {Observable} from "rxjs";

import { HttpClient, HttpHeaders } from '@angular/common/http';

import {AppStates} from './app-states';
import {NeuronsModel} from '../components/model/neurons-model';

@Injectable()
export class AppService {
  private static factoryResolver: ComponentFactoryResolver;
  private static rootViewContainer: ViewContainerRef;

  constructor(private http: HttpClient, @Inject(ComponentFactoryResolver) factoryResolver) {
     AppService.factoryResolver = factoryResolver;
  }

  getComponentFactoryResolver(): ComponentFactoryResolver {
     return AppService.factoryResolver;
  }

  setRootViewContainerRef(viewContainerRef: ViewContainerRef) {
     AppService.rootViewContainer = viewContainerRef
  }

  getRootViewContainerRef(): ViewContainerRef {
     return AppService.rootViewContainer;
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