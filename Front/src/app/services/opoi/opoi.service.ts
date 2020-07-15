import { Injectable } from '@angular/core';
import { StoreService } from '../store/store.service';
import * as t from "../../../../node_modules/tiles-in-bbox";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';
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

  long2tile(lon,zoom) { 
    return (Math.floor((lon+180)/360*Math.pow(2,zoom))); 
  }

  lat2tile(lat,zoom)  { 
    return (Math.floor((1-Math.log(Math.tan(lat*Math.PI/180) + 1/Math.cos(lat*Math.PI/180))/Math.PI)/2 * Math.pow(2,zoom)));
  }
  
  getBbox() {
    var bbox: number[] = this.store.selectedDestinationCity.bbox;

    return {
      left: bbox[0],
      bottom: bbox[1],
      right : bbox[2],
      top: bbox[3]
    };
  }

  requestTile(tile) {
    const url = this.getUrl(tile.x, tile.y, tile.z);
    return this.http.get(url);
  }

  requestTiles() {
    var requestArray: Observable<Object>[] = [];
    this.tiles.map(tile => {
      requestArray.push(this.requestTile(tile));
    })
    
    return forkJoin(...requestArray);
  }

  /*
  requestTiles() {
    var responseArray: object[] = [];
    this.tiles.map(tile => {
      this.requestTile(tile).subscribe(response => responseArray.concat(response));
    })
    
    return responseArray;
  }
  */

  requestTileTest() {
    this.requestTile(this.tiles[0]).subscribe(results => {console.log(results)});
  }

  // @type: "schema:Museum"
  requestMuseum() {
    var museum: object[] = [];
    this.requestTiles().subscribe(res => {
      //console.log(res);
      res.map(result => 
        {
          //console.log("result: ", result["@graph"].filter(res => res["@type"] === "schema:Museum"));
          var museums: Object[] = result["@graph"].filter(res => res["@type"] === "schema:Museum");
          museum = museum.concat(museums);
        });
      console.log("museum: ", museum);
      return museum;
    });
  }

}
