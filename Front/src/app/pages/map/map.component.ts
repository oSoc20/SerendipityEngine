import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store/store.service';
import { MapboxService, Feature} from '../../services/mapbox/mapbox.service'

@Component({
  selector: 'app-map-page',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapPageComponent implements OnInit {

  center : any;
  constructor(public store : StoreService) {
    this.center = this.store.selectedDestinationCity.center;
  }

  ngOnInit() { 
    console.log("ALexis");   
  }

}
