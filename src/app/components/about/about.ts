import {Component} from '@angular/core';
import {Observable} from "rxjs";

import {AppService} from '../../services/app-service';

@Component({
  selector: 'about-page',
  templateUrl: 'about.html',
  styleUrls: ['./about.css'],
  providers: [AppService]
})
export default class AboutComponent {
  aboutText: string;
  buildInfo: string;

  constructor(private appService: AppService) {
     this.load();
  }

  load() {
    this.appService.getAboutHtml().subscribe(data => {
       var obj = JSON.parse(data);
       this.aboutText = obj.aboutText;
       if (obj.build) {
          this.buildInfo = obj.build;
       } else {
          this.buildInfo= (new Date()).toString();
       }
    });
  }
}