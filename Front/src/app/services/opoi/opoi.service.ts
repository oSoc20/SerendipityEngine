import { Injectable } from '@angular/core';
import { StoreService } from '../store/store.service';
import * as t from "../../../../node_modules/tiles-in-bbox";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
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
  tiles: object[];

  constructor(public store : StoreService, private http: HttpClient) { }

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
  getUrl(x, y, z) {
    return `https://opoi.org/${z}/${x}/${y}`;
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

  requestTile(tile) {
    const url = this.getUrl(tile.x, tile.y, tile.z);
    return this.http.get(url);
      // .pipe(map((res) => {
      //   return res;
      // }));
  }

  requestTiles() {
    for(var i = 0; i < this.tiles.length; i++) {
      this.requestTile(this.tiles[i]);
    }
  }

  requestTileTest() {
    this.requestTile(this.tiles[0]).subscribe(results => {console.log(results)});
  }

}
