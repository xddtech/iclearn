import {Component} from '@angular/core';
import {Observable} from "rxjs";

import {AppService} from '../../services/app-service';

@Component({
  selector: 'about-page',
  templateUrl: 'about.html',
  providers: [AppService]
})
export default class AboutComponent {
  aboutText: string;

  constructor(private appService: AppService) {
     this.load();
  }

  load() {
    this.appService.getAboutHtml().subscribe(data => {
       this.aboutText = data;
    });
  }
}