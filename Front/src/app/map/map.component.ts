import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { OpoiService } from '../services/opoi/opoi.service';
import * as jsPDF from 'jspdf';
import { StoreService } from '../services/store/store.service';
import { MapboxService } from '../services/mapbox/mapbox.service';
import html2canvas from 'html2canvas';
import { PointsOfInterests } from '../utilitaries/points-of-interests-enum';
import { Transport } from '../utilitaries/transport-enum';
//import { type } from 'os';
import { filter } from 'rxjs/operators';

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

  getImagePath(pointType : PointsOfInterests) : string {

      let baseUrl = "../../assets/map/"

      switch(pointType) {
        case PointsOfInterests.Museum : return baseUrl + "museum.svg";
        case PointsOfInterests.Attraction : return baseUrl + "attraction.svg";
        case PointsOfInterests.Park : return baseUrl + "park.svg";
        case PointsOfInterests.Church : return baseUrl + "church.svg";
      }
  }

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


    this.map.addSource('mapbox-streets', {
      type: 'vector',
      url: 'mapbox://mapbox.mapbox-streets-v8'
    });

    if(this.store.selectedTransport == Transport.Train || this.store.selectedTransport == Transport.Public) {
      this.map.addLayer({
        'id': 'train',
        'type': 'symbol',
        'source': 'mapbox-streets',
        'source-layer': 'building',
        layout : {
          "icon-image" : "rail"
        },
        "filter" : ["==", "train_station", ["get", "type"]]
      });
    }


    if(this.store.selectedTransport == Transport.Public) {
      this.map.addLayer({
        'id': 'tram',
        'type': 'symbol',
        'source': 'mapbox-streets',
        'source-layer': 'transit_stop_label',
        layout : {
          "icon-image" : "rail-metro"
        },
        "filter" : ["==", "tram", ["get", "mode"]]
      });

      this.map.addLayer({
        'id': 'metro',
        'type': 'symbol',
        'source': 'mapbox-streets',
        'source-layer': 'transit_stop_label',
        layout : {
          "icon-image" : "rail-metro"
        },
        "filter" : ["==", "metro_rail", ["get", "mode"]]
      });

      this.map.addLayer({
        'id': 'bus',
        'type': 'symbol',
        'source': 'mapbox-streets',
        'source-layer': 'transit_stop_label',
        layout : {
          "icon-image" : "bus"
        },
        "filter" : ["==", "bus", ["get", "mode"]]
      });

    }

    if(this.store.selectedTransport && this.store.selectedTransport == Transport.Car) {
      if(this.store.selectedDestinationCity.text != this.store.selectedOriginCity.text) {
        this.map.addLayer({
          'id': 'motorway',
          'type': 'line',
          'source': 'mapbox-streets',
          'source-layer': 'road',
          'paint': {
            'line-color': 'rgba(55,148,179,1)'
          },
          "filter" : ["==", "motorway", ["get", "class"]]
        });
      }

      else {
        this.map.addLayer({
          'id': 'smallroads',
          'type': 'line',
          'source': 'mapbox-streets',
          'source-layer': 'road',
          'paint': {
            'line-color': 'rgba(55,148,179,1)'
          },
          "filter" : ["==", "street", ["get", "class"]]
        });
      }

    }

    if(this.store.selectedTransport && this.store.selectedTransport == Transport.Bicycle) {
        this.map.addLayer({
          'id': 'bycicle',
          'type': 'line',
          'source': 'mapbox-streets',
          'source-layer': 'road',
          'paint': {
            'line-color': 'rgba(55,148,179,1)'
          },
          "filter" : ["==", "yes", ["get", "bike_lane"]]
        });
    }

    if(this.store.selectedTransport && this.store.selectedTransport == Transport.Bicycle || this.store.selectedTransport == Transport.Foot) {
      this.map.addLayer({
        'id': 'lightweight',
        'type': 'line',
        'source': 'mapbox-streets',
        'source-layer': 'road',
        'paint': {
          'line-color': 'rgba(55,148,179,1)'
        },
        "filter" : ["==", "path", ["get", "class"]]
      });
  }

    // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());
    this.opoi.calculateTiles();
    //this.opoi.requestType("schema:CatholicChurch");
    //this.opoi.requestType("schema:CatholicChurch").then(res => {console.log("schema:CatholicChurch:", res)});
    this.opoi.requestType("schema:Museum").then(res => {
      //console.log("schema:Museum:", res);
      var temp = res.filter(value => value["asWKT"] && value["name"] && this.insideBbox(this.getCoords(value["asWKT"])));
      var amount = temp.length >= 2? 2: temp.length;
      temp = temp.sort(() => 0.5 - Math.random()).slice(0, amount);
      temp.map(poi => {
        //console.log("Adding POI")
        var coords = this.getCoords(poi["asWKT"]);

        //console.log(poi["name"]);
        if (Array.isArray(poi["name"])) {
          var arr: string[] = poi["name"];
          this.addMarker(coords, arr[0].split(" - ")[0], PointsOfInterests.Museum);//poi[name][0]);
        }
        else {
          this.addMarker(coords, poi["name"], PointsOfInterests.Museum);
        }
      })

    });
    this.opoi.requestTag("taginfo:tourism=attraction").then(res => {
      //console.log("taginfo:tourism=attraction", res);
      var temp = res.filter(value => value["asWKT"] && value["name"] && this.insideBbox(this.getCoords(value["asWKT"])));
      var amount = temp.length >= 3? 3: temp.length;
      temp = temp.sort(() => 0.5 - Math.random()).slice(0, amount);
      temp.map(poi => {
        //console.log("Adding POI")
        var coords = this.getCoords(poi["asWKT"]);

        //console.log(poi["name"]);
        if (Array.isArray(poi["name"])) {
          var arr: string[] = poi["name"];
          this.addMarker(coords, arr[0].split(" - ")[0], PointsOfInterests.Attraction);//poi[name][0]);
        }
        else {
          this.addMarker(coords, poi["name"], PointsOfInterests.Attraction);
        }
      })

    });
    this.opoi.requestType("schema:Park").then(res => {
      //console.log("schema:Park:", res);
      var temp = res.filter(value => value["asWKT"] && value["name"] && this.insideBbox(this.getCoords(value["asWKT"])));
      var amount = temp.length >= 1? 1: temp.length;
      temp = temp.sort(() => 0.5 - Math.random()).slice(0, amount);
      temp.map(poi => {
        //console.log("Adding POI")
        var coords = this.getCoords(poi["asWKT"]);

        //console.log(poi["name"]);
        if (Array.isArray(poi["name"])) {
          var arr: string[] = poi["name"];
          this.addMarker(coords, arr[0].split(" - ")[0], PointsOfInterests.Park);//poi[name][0]);
        }
        else {
          this.addMarker(coords, poi["name"], PointsOfInterests.Park);
        }
      })

    });


  });
}

  exportMap() {


    //var img = this.map.getCanvas().toDataURL(); //document.getElementById("map") "image/png"
    var img;
    html2canvas(document.getElementById("map")).then(canvas => {
      img = canvas.toDataURL();
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


      doc.save(this.store.selectedDestinationCity.text + "_mentalmap.pdf")
    });



  }

  rotateMap(bearingAngle: number) {
    this.bearing += bearingAngle;
    this.bearing %= 360;
    this.map.setBearing(this.bearing);
  }

  fitMap() {
    //var offset = 0.035;
    var offset = 0;
    //var offset = Math.min(Math.abs(this.city.bbox[0] - this.city.bbox[2]), Math.abs(this.city.bbox[1] - this.city.bbox[3]))*0.1;
    //console.log("OFFSET", this.city.bbox[0] - this.city.bbox[2], this.city.bbox[1] - this.city.bbox[3])
    var p1: mapboxgl.PointLike = [this.city.bbox[0] - offset, this.city.bbox[1] - offset];
    var p2: mapboxgl.PointLike = [this.city.bbox[2] + offset, this.city.bbox[3] + offset];
    this.map.fitBounds([p1, p2]);
    this.bearing = 0;
  }

  addMarker(coord: number[], text: string, type : PointsOfInterests, color: string = "transparent") {

    let icon = this.getImagePath(type);
    //console.log(icon)

    var el = document.createElement('div');
    el.className = 'marker';
    //el.style.backgroundColor = color;
    el.innerHTML = "<img style='width:20px; height:20px' src=\"" + icon + "\"/><b>" + text + "</b>";
    el.style.width = '50 px';
    el.style.height = '50 px';

    new mapboxgl.Marker(el)
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

  insideBbox(point: number[]): Boolean {
    return point[0] >= this.city.bbox[0] && point[0] <= this.city.bbox[2] && point[1] >= this.city.bbox[1] && point[1] <= this.city.bbox[3];
  }

}

