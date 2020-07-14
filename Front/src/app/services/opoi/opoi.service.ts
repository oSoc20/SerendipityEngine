import { Injectable } from '@angular/core';
import { StoreService } from '../store/store.service';
import * as t from "../../../../node_modules/tiles-in-bbox/index.js";
//var t = require('tiles-in-bbox')
 
@Injectable({
  providedIn: 'root'
})
export class OpoiService {

  // bbox = {
  //   bottom : 42.356,
  //   left : -71.1279,
  //   top : 42.3876,
  //   right : -71.1002
  // };
  zoom = 15;
  tiles;

  constructor(public store : StoreService) { }

  //Follows the GeoJson/OpenStreetMaps convention of a clockwise box starting at the bottom.
  calculateTiles() {
    this.tiles = t.tilesInBbox(this.store.selectedDestinationCity.bbox, this.zoom);
    console.log(this.tiles);
  }

  /*
    "hydra:variable": "x", "hydra:property": "tiles:longitudeTile"
    "hydra:variable": "y", "hydra:property": "tiles:latitudeTile"
    "hydra:variable": "z", "hydra:property": "tiles:zoom"
    https://opoi.org/{z}/{x}/{y}
  */
  getUrl(long, lat, zoom) {
    return `https://opoi.org/${zoom}/${long}/${lat}`;
  }

}
