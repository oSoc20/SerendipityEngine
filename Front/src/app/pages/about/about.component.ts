import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    document.getElementById('main-container').style.height = (window.innerHeight - document.getElementsByTagName("header")[0].offsetHeight - document.getElementsByTagName("footer")[0].offsetHeight) + "px";

  }


}
