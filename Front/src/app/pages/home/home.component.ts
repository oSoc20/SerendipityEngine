import { Component, OnInit, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Transport } from 'src/app/utilitaries/transport-enum';
import { MapboxService, Feature} from '../../services/mapbox/mapbox.service'
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  destination : FormGroup;
  origin : FormGroup;
  selectedTransport : Transport;
  
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  
  cities: string[] = []; // List of cities based on partial search string
  cityList: Feature[] = []; // List of city suggestions
  //selectedCityOrigin: Feature = null;
  selectedCityOrigin: Feature = {
    "id": "place.4343180545953150",
    "type": "Feature",
    "place_type": [
        "place"
    ],
    "relevance": 1,
    "properties": {
        "wikidata": "Q228863"
    },
    "text": "Zulte",
    "place_name": "Zulte, East Flanders, Belgium",
    "bbox": [
        3.415547,
        50.896947,
        3.527883,
        50.983599
    ],
    "center": [
        3.4485632,
        50.9206638
    ],
    "geometry": {
        "type": "Point",
        "coordinates": [
            3.4485632,
            50.9206638
        ]
    },
    "context": [
        {
            "id": "region.6677865445789420",
            "short_code": "BE-VOV",
            "wikidata": "Q1114",
            "text": "East Flanders"
        },
        {
            "id": "country.1494593798110250",
            "wikidata": "Q31",
            "short_code": "be",
            "text": "Belgium"
        }
    ]
  };
  selectedCityDestination: Feature = null;
  control = new FormControl();
  value: string;

  //destinationControl = new FormControl(); 
  //originControl;

  transports = [
    { id : Transport.Car, label : "by car",  picture : "car" },
    { id : Transport.Bicycle, label : "by bicycle",  picture : "bicycle" },
    { id : Transport.Foot, label : "by foot",  picture : "foot" },
    { id : Transport.Train, label : "by train",  picture : "train" },
    { id : Transport.IntraCity, label : "public transport",  picture : "bus" },
    { id : Transport.Other, label : "other",  picture : "" },
   
  ]

  constructor(private formBuilder: FormBuilder, private mapboxService: MapboxService) {

    this.destination = this.formBuilder.group({
      destinationControl: ['',[Validators.required,  Validators.maxLength(50),  Validators.minLength(1)]],
    });
    this.origin = this.formBuilder.group({
      originControl: ['',[Validators.required,  Validators.maxLength(50),  Validators.minLength(1)]],
    });
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this.formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
   }

  ngAfterViewInit() {
    document.getElementById('main-container').style.height = (window.innerHeight - document.getElementsByTagName("header")[0].offsetHeight - document.getElementsByTagName("footer")[0].offsetHeight) + "px";
  }

  changeSelectedTransport(value) {
    this.selectedTransport = value;
  }

  
  ngOnInit() {
    //this.control.valueChanges.toPromise().then(ev => {console.log('AAA'); this.search(ev)});
  }

  search(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm && searchTerm.length > 0) {
      this.mapboxService
        .search_word(searchTerm)
        .subscribe((features: Feature[]) => {
          //this.cities = features.map(feat => feat.place_name);
          this.cities = features.map(feat => feat.text);
          this.cityList = features;
        });
    }
    else {
      this.cities = [];
    }
  }

  onSelectOrigin(place: string, origin: boolean) {
    this.selectedCityOrigin = this.cityList.find(city => city.text === place);
    console.log("origin", this.selectedCityOrigin);

    this.cities = [];
  }

  onSelectDestination(place: string, origin: boolean) {
    this.selectedCityDestination = this.cityList.find(city => city.text === place);
    console.log("destination", this.selectedCityDestination);
    
    this.cities = [];
  }

}
