import { Injectable } from '@angular/core';
import { StoreService } from '../store/store.service';
import * as t from "../../../../node_modules/tiles-in-bbox";
//var t = require('tiles-in-bbox')
 
@Injectable({
  providedIn: 'root'
})
export class OpoiService {

  bbox = {
    bottom: 4.313869,
    left: 50.796245,
    right: 50.913716,
    top: 4.437046
  };
  zoom = 14;
  tiles: [];

  constructor(public store : StoreService) { }

  //Follows the GeoJson/OpenStreetMaps convention of a clockwise box starting at the bottom.
  calculateTiles() {
    this.tiles = t.tilesInBbox(this.getBbox(), this.zoom);
    console.log("tiles:", this.tiles);
  }

  /*
    "hydra:variable": "x", "hydra:property": "tiles:longitudeTile"
    "hydra:variable": "y", "hydra:property": "tiles:latitudeTile"
    "hydra:variable": "z", "hydra:property": "tiles:zoom"
    https://opoi.org/{z}/{x}/{y}
  */
  getUrl(longitude, latitude, zoom) {
    let long = this.long2tile(longitude, zoom);
    let lat = this.lat2tile(latitude, zoom);
    return `https://opoi.org/${zoom}/${long}/${lat}`;
  }

  long2tile(lon,zoom) { 
    return (Math.floor((lon+180)/360*Math.pow(2,zoom))); 
  }

  lat2tile(lat,zoom)  { 
    return (Math.floor((1-Math.log(Math.tan(lat*Math.PI/180) + 1/Math.cos(lat*Math.PI/180))/Math.PI)/2 * Math.pow(2,zoom)));
  }
  
  getBbox() {
    var bbox: number[] = this.store.selectedDestinationCity.bbox;

    return {
      bottom: bbox[0],
      left: bbox[1],
      top : bbox[2],
      right: bbox[3]
    };
  }

