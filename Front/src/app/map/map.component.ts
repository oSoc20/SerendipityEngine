import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  @Input() coord = [4.351710, 50.850340]; //long, lat
  @Input() bearing: number = 0; //angle

  constructor() { }

  ngOnInit() {
    (mapboxgl as any).accessToken = environment.mapbox.accessToken; // dirty 'accessToken read-only' workaround see: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/23467
      this.map = new mapboxgl.Map({
        container: 'map',
        style: this.style,
        zoom: 13,
        center: [this.coord[0], this.coord[1]],
        pitch: 0,//60, // pitch in degrees
        bearing: this.bearing, // bearing in degrees
    });
    // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());
  }

}
