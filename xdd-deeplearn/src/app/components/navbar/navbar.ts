import {Component, ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import {AppStates} from '../../services/app-states';


@Component({
   selector: 'app-navbar',
   templateUrl: 'navbar.html',
   styleUrls: ['./navbar.css']
})
export default class NavbarComponent implements AfterViewInit {
   @ViewChild('appNavbar') navbarElement: ElementRef;

   constructor() {}

   ngAfterViewInit() {
      AppStates.navbarElem = this.navbarElement;
   }
}