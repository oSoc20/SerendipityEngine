import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface MapboxOutput {
  attribution: string;
  features: Feature[];
  query: [];
}

export interface Feature {
  id: string;
  properties: string;
  text: string;
  place_name: string;
  bbox: number[];
  center: number[];
}

@Injectable({
  providedIn: 'root'
})
export class MapboxService {

  constructor(private http: HttpClient) { }

  search_word(query: string) {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
    return this.http.get(url + query + '.json?types=place&access_token=' + environment.mapbox.accessToken)
      .pipe(map((res: MapboxOutput) => {
        return res.features;
      }));
  }

  calculate_bearing(coordA, coordB) {
    // angle in degrees: Math.atan2(lon2 - lon1, lat2 - lat1) * 180 / Math.PI;
    return Math.atan2(coordB[1] - coordA[1], coordB[0] - coordA[0]) * 180 / Math.PI;
  }
}
