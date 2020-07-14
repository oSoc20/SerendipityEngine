import { Component, OnInit, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Transport } from 'src/app/utilitaries/transport-enum';
import { MapboxService, Feature} from '../../services/mapbox/mapbox.service'
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Frequency } from 'src/app/utilitaries/frequency-enum';
import { StoreService } from 'src/app/services/store/store.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  destination : FormGroup;
  origin : FormGroup;
  destinationCity: FormControl;
  originCity: FormControl;

  selectedFrequency = new FormControl();

  selectedDestinationCity : Feature = null;
  selectedOriginCity : Feature = null;
  
  fakeControl : FormGroup;
  
  isLinear = false;

  cities: string[] = []; // List of cities based on partial search string
  cityList: Feature[] = []; // List of city suggestions

  value: string;

  //destinationControl = new FormControl(); 
  //originControl;

  transports = [
    { id : Transport.Car, label : "by car",  picture : "car" },
    { id : Transport.Bicycle, label : "by bicycle",  picture : "bicycle" },
    { id : Transport.Foot, label : "by foot",  picture : "foot" },
    { id : Transport.Train, label : "by train",  picture : "train" },
    { id : Transport.Public, label : "public",  picture : "bus" },
    { id : Transport.Other, label : "other",  picture : "other" },
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

  constructor(private formBuilder: FormBuilder, private mapboxService: MapboxService, public store : StoreService) {
    this.fakeControl = this.formBuilder.group({
      fake : ['',[Validators.required,  Validators.maxLength(100),  Validators.minLength(10)]], 
    });

    this.destination = new FormGroup({destinationCity : new FormControl()});
    this.origin = new FormGroup({originCity : new FormControl()});
   }

  ngAfterViewInit() {
    document.getElementById('main-container').style.height = (window.innerHeight - document.getElementsByTagName("header")[0].offsetHeight - document.getElementsByTagName("footer")[0].offsetHeight) + "px";

  }

  changeSelectedTransport(value) {
    this.store.selectedTransport = value;
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
          //this.cities = features.map(feat => feat.text);
          this.cityList = features;
        });
    }
    else {
      this.cities = [];
    }
  }


  onSelect(address, origin : boolean) {
    let city = this.cityList.find(city => city.text === address.text);
    
    if(origin) {
      this.store.selectedOriginCity = city;
      console.log(this.store.selectedOriginCity);
    }
    else {
      this.store.selectedDestinationCity = city;
      console.log(this.store.selectedDestinationCity);
    }

    this.cities = [];
  }

  /* I let this in comment like this you can know how to access the label of the values #Alexis */
  display() {
    console.log(this.store.selectedDestinationCity.text);
    console.log(this.store.selectedOriginCity.text);
    console.log(this.store.selectedTransport);
    console.log(this.store.selectedFrequency.value);
  }

  getDisplayName(city: any) {
    return city.text + ", " + city.place_name.split(',').pop();
  }

}
