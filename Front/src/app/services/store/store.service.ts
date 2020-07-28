import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Feature } from '../mapbox/mapbox.service';
import { Transport } from 'src/app/utilitaries/transport-enum';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  selectedFrequency = new FormControl();
  selectedDestinationCity : Feature = null;
  selectedOriginCity : Feature = null;
  selectedTransport : Transport;

  brussels: Feature = {
    "id": "place.5091609961101710",
    "type": "Feature",
    "place_type": [
        "place"
    ],
    "relevance": 1,
    "properties": {
        "wikidata": "Q239"
    },
    "text": "Brussels",
    "place_name": "Brussels, Brussels-Capital, Belgium",
    "bbox": [
        4.312806, //4.313869
        50.821306, // 50.796245
        4.40375 , // 4.437046
        50.876222  // 50.913716
    ],
    "center": [
        4.3547,
        50.8467
    ],
    "geometry": {
        "type": "Point",
        "coordinates": [
            4.3547,
            50.8467
        ]
    },
    "context": [
        {
            "id": "region.9405604932134980",
            "wikidata": "Q240",
            "text": "Brussels-Capital"
        },
        {
            "id": "country.1494593798110250",
            "wikidata": "Q31",
            "short_code": "be",
            "text": "Belgium"
        }
    ]
  };

  antwerp: Feature = {
    "id": "place.13854421078813520",
    "type": "Feature",
    "place_type": [
        "place"
    ],
    "relevance": 1,
    "properties": {
        "wikidata": "Q12892"
    },
    "text": "Antwerpen",
    "place_name": "Antwerpen, Antwerp, Belgium",
    "bbox": [
        4.353778, //4.240662,
        51.184833, //51.143438,
        4.481733, //4.497881, 
        51.255146 //51.377641
    ],
    "center": [
        4.3997081,
        51.2211097
    ],
    "geometry": {
        "type": "Point",
        "coordinates": [
            4.3997081,
            51.2211097
        ]
    },
    "context": [
        {
            "id": "region.9941923600813520",
            "short_code": "BE-VAN",
            "wikidata": "Q1116",
            "text": "Antwerp"
        },
        {
            "id": "country.1494593798110250",
            "wikidata": "Q31",
            "short_code": "be",
            "text": "Belgium"
        }
    ]
  };

  ghent: Feature = {
    "id": "place.12911868262163970",
    "type": "Feature",
    "place_type": [
        "place"
    ],
    "relevance": 1,
    "properties": {
        "wikidata": "Q1296"
    },
    "text": "Gent",
    "place_name": "Gent, East Flanders, Belgium",
    "bbox": [
        3.686923, //3.579786,
        51.031700, //50.979496,
        3.751639, //3.849331,
        51.069702 //51.188767
    ],
    "center": [
        3.7250121,
        51.0538286
    ],
    "geometry": {
        "type": "Point",
        "coordinates": [
            3.7250121,
            51.0538286
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


  constructor() { }
}
