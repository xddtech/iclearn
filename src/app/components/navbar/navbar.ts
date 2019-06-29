import {Component, ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import {AppStates} from '../../services/app-states';
import {AppConfig} from '../../app.config';

declare var $: any;

@Component({
   selector: 'app-navbar',
   templateUrl: 'navbar.html',
   styleUrls: ['./navbar.css'],
   providers: [AppStates]
})
export default class NavbarComponent implements AfterViewInit {
   @ViewChild('appNavbar') navbarElement: ElementRef;

   routeMap = {
      'homeRoute': '/',
      'modelRoute': '/model',
      'aboutRoute': '/about',
      'debugRoute': 'debug'
   };
   activeRoute = "";
   showDebugRoute = AppConfig.showDebugRoute;

   constructor(private appStates: AppStates, private router: Router) {
   }

   ngAfterViewInit() {
      AppStates.navbarElem = this.navbarElement;
   }

   clickRoute($event: any) {
      var routeId = $event.target.id;
      this.routeTo(routeId);
   }

   routeTo(routeId: string) { 
      if (routeId === this.activeRoute) {
         return;
      }
      if (!this.routeMap[routeId]) {
         console.error('route ' + routeId + ' is undefined in navbar');
         return;
      }
      if (this.activeRoute) {
         $('#' + this.activeRoute).removeClass('navitem-active');
      }
      this.activeRoute = routeId;
      $('#' + this.activeRoute).addClass('navitem-active');

      this.router.navigate([this.routeMap[this.activeRoute]]);
   }
}
