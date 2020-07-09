import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  lat = 50.850340;
  lng = 4.351710;
  constructor() { }

  ngOnInit() {
    (mapboxgl as any).accessToken = environment.mapbox.accessToken; // dirty 'accessToken read-only' workaround see: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/23467
      this.map = new mapboxgl.Map({
        container: 'map',
        style: this.style,
        zoom: 13,
        center: [this.lng, this.lat],
        pitch: 0,//60, // pitch in degrees
        bearing: 0, // bearing in degrees
    });
    // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());
  }

}
