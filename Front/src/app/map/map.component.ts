import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { OpoiService } from '../services/opoi/opoi.service';
import * as jsPDF from 'jspdf';
import { StoreService } from '../services/store/store.service';
import { MapboxService } from '../services/mapbox/mapbox.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
  map: mapboxgl.Map;
  style = 'mapbox://styles/occidomoney/ckcu9tdng3kmj1jnrb68j3ly9';
  @Input() city: any;
  coord: number[] = [4.351710, 50.850340]; //long, lat
  bearing: number = 0; //angle

  constructor(
    private opoi: OpoiService,
    private mapboxService: MapboxService,
    public store : StoreService,
  ) { }

  ngOnInit() {
    this.coord = this.city.center;

    (mapboxgl as any).accessToken = environment.mapbox.accessToken; // dirty 'accessToken read-only' workaround see: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/23467
      this.map = new mapboxgl.Map({
        container: 'map',
        style: this.style,
        zoom: 13,
        center: [this.coord[0], this.coord[1]],
        pitch: 0,//60, // pitch in degrees
        bearing: this.bearing, // bearing in degrees
        preserveDrawingBuffer:true
    });

    this.map.on('load', () => {
      this.fitMap();
      this.bearing = this.mapboxService.calculate_bearing(this.store.selectedDestinationCity.center, this.store.selectedOriginCity.center);
      this.bearing += 180;
      this.bearing %= 360;
      this.map.setBearing(this.bearing);
    });

    // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());
    this.opoi.calculateTiles();
    //this.opoi.requestType("schema:CatholicChurch");
    this.opoi.requestType("schema:CatholicChurch").then(res => {console.log("schema:CatholicChurch:", res)});
    this.opoi.requestType("schema:Museum").then(res => {
      console.log("schema:Museum:", res);
      var temp = res.filter(value => value["asWKT"].includes("POINT"));
      var amount = temp.length >= 4? 4: temp.length;
      temp = temp.sort(() => 0.5 - Math.random()).slice(0, amount);
      temp.map(poi => {
        console.log("Adding POI")
        var coords = this.getCoords(poi["asWKT"]);
        this.addMarker(coords);
      })
      
    });
    this.opoi.requestTag("taginfo:tourism=attraction").then(res => {
      console.log("taginfo:tourism=attraction", res);
      var temp = res.filter(value => value["asWKT"].includes("POINT"));
      var amount = temp.length >= 4? 4: temp.length;
      temp = temp.sort(() => 0.5 - Math.random()).slice(0, amount);
      temp.map(poi => {
        console.log("Adding POI")
        var coords = this.getCoords(poi["asWKT"]);
        this.addMarker(coords);
      })
      
    });
  }

  exportMap() {

    var img = this.map.getCanvas().toDataURL(); //document.getElementById("map") "image/png"

    var doc = new jsPDF('landscape')
    doc.setFont("Playfair Display")
    doc.setFontSize(40)
    doc.text(this.store.selectedDestinationCity.text, 148.5, 25, 'center'); 
    doc.setFontSize(20)
    doc.setLineWidth(4)
    doc.setDrawColor(81,21,170)
    doc.rect(40, 45, 220, 130)


    doc.text(this.store.selectedDestinationCity.place_name.split(',').pop(), 148.5, 35, 'center'); 
    doc.addImage(img, 'PNG', 40, 45, 220, 130)
    doc.setFontSize(8)
    doc.text(200, 170, "map data © OpenStreetMap contributors")

    doc.setFontSize(40)
    doc.setFontType('italic')
    doc.setFontSize(15)
    doc.text("made with the serendipity engine", 148.5, 195, 'center'); 


    doc.save("test.pdf")
   
    

  }

  rotateMap(bearingAngle: number) {
    this.bearing += bearingAngle;
    this.bearing %= 360;
    this.map.setBearing(this.bearing);
  }

  fitMap() {
    var offset = 0.035;
    var p1: mapboxgl.PointLike = [this.city.bbox[0] - offset, this.city.bbox[1] - offset];
    var p2: mapboxgl.PointLike = [this.city.bbox[2] + offset, this.city.bbox[3] + offset];
    this.map.fitBounds([p1, p2]);
    this.bearing = 0;
  }

  addMarker(coord: number[]) {
    new mapboxgl.Marker()
      //.setLngLat({ lng: this.coord[0], lat: this.coord[1] })
      .setLngLat({ lng: coord[0], lat: coord[1] })
      .addTo(this.map);
  }

  getCoords(str: string): number[] {
    let regexp = /([0-9\.]+) ([0-9\.]+)/g;
    let res = str.match(regexp);
    var temp = res[0].split(' ');
    var arr: number[] = Array.from(temp).map(Number);
    //console.log("TEST ->", str, res, arr, temp);
    //arr.push(parseInt(res[0]), parseInt(res[1]));
    return arr;
  }
}

