import { Component, OnInit, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MapboxService, Feature} from '../../services/mapbox/mapbox.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  form : FormGroup;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  cities: string[] = []; // List of cities based on partial search string
  selectedCity = null;

  constructor(private formBuilder: FormBuilder, private mapboxService: MapboxService) {

    this.form = this.formBuilder.group({
      city: ['',[Validators.required,  Validators.maxLength(50),  Validators.minLength(1)]],
    });
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

   }

  ngAfterViewInit() {
    document.getElementById('main-container').style.height = (window.innerHeight - document.getElementsByTagName("header")[0].offsetHeight - document.getElementsByTagName("footer")[0].offsetHeight) + "px";
  }


  ngOnInit() {

  }

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
