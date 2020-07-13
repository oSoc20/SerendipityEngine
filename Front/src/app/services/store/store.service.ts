import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Feature } from '../mapbox/mapbox.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  selectedFrequency = new FormControl();
  selectedDestinationCity : Feature = null;
  selectedOriginCity : Feature = null;
  selectedTransport : Transport;

  constructor() { }
}
