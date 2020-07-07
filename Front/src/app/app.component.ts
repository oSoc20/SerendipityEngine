import { Component } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import { MapboxService, Feature} from './services/mapbox/mapbox.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SerendipityFront';

  map : Map;
  cities: string[] = [];
  selectedCity = null;

  constructor(private mapboxService: MapboxService) {}

  search(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm && searchTerm.length > 0) {
      this.mapboxService
        .search_word(searchTerm)
        .subscribe((features: Feature[]) => {
          this.cities = features.map(feat => feat.place_name);
        });
    }
    else {
      this.cities = [];
    }
  }

  onSelect(address: string) {
    this.selectedCity = address;
    this.cities = [];
  }
}
