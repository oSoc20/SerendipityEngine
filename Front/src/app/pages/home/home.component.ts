import { Component, OnInit, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Transport } from 'src/app/utilitaries/transport-enum';
import { MapboxService, Feature} from '../../services/mapbox/mapbox.service'
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Frequency } from 'src/app/utilitaries/frequency-enum';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  destination : FormGroup;
  origin : FormGroup;
  selectedCity: Feature = null;
  selectedFrequency = new FormControl();
  
  control = new FormControl();
  
  fakeControl : FormGroup;

  selectedTransport : Transport;
  
  isLinear = false;

  cities: string[] = []; // List of cities based on partial search string
  cityList: Feature[] = []; // List of city suggestions
  

  transports = [
    { id : Transport.Car, label : "by car",  picture : "car" },
    { id : Transport.Bicycle, label : "by bicycle",  picture : "bicycle" },
    { id : Transport.Foot, label : "by foot",  picture : "foot" },
    { id : Transport.Train, label : "by train",  picture : "train" },
    { id : Transport.IntraCity, label : "public transport",  picture : "bus" },
    { id : Transport.Other, label : "other",  picture : "bus" },
]

frequencies = [
    { id : Frequency.Never, label : "Never"},
    { id : Frequency.HardlyNever, label : "Hardly never"},
    { id : Frequency.Sometimes, label : "Sometimes"},
    { id : Frequency.Often, label : "Often"},
    { id : Frequency.Frequently, label : "Frequently"},
    { id : Frequency.Usually, label : "Usually"},
    { id : Frequency.NearlyAlways, label : "Nearly always"},
    { id : Frequency.Always, label : "Always"},

]

  

  constructor(private formBuilder: FormBuilder, private mapboxService: MapboxService) {
    this.fakeControl = this.formBuilder.group({});
    this.destination = this.formBuilder.group({
      city: ['',[Validators.required,  Validators.maxLength(50),  Validators.minLength(1)]],
    });
    this.origin = this.formBuilder.group({
      city: ['',[Validators.required,  Validators.maxLength(50),  Validators.minLength(1)]],
    });
    this.fakeControl = this.formBuilder.group({
      fake: ['',[Validators.required,  Validators.maxLength(50),  Validators.minLength(1)]],
    })

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
          this.cities = features.map(feat => feat.place_name);
          this.cityList = features;
        });
    }
    else {
      this.cities = [];
    }
  }

  onSelect(address: string) {
    this.selectedCity = this.cityList.find(city => city.place_name === address);
    console.log(this.selectedCity);
    this.cities = [];
  }

}
