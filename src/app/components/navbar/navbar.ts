import {Component, ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import {AppStates} from '../../services/app-states';


@Component({
   selector: 'app-navbar',
   templateUrl: 'navbar.html',
   styleUrls: ['./navbar.css'],
   providers: [AppStates]
})
export default class NavbarComponent implements AfterViewInit {
   @ViewChild('appNavbar') navbarElement: ElementRef;

   constructor(private appStates: AppStates) {}

   ngAfterViewInit() {
      AppStates.navbarElem = this.navbarElement;
   }
}