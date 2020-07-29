<p align="center">
    <br>
    <img src="https://github.com/oSoc20/SerendipityEngine/blob/master/img/serendipity-engine_AHA-01.svg" alt="Serendipity Engine Crest" width="200"/>
    <br>
<p>

# SerendipityEngine
Aha! A generator for surprising yet recognizable maps of your neighbourhood

### Map provider used
#### Mapbox GL JS
Using Mapbox GL JS we were able to show a map based on the JavaScript library that uses WebGL to render interactive maps from vector tiles and Mapbox styles.

#### Mapbox Studio
For the map styling we made use of Mapbox Studio. Based on the layers in the style you are able to change the look and feel of the map based on for example their mode of transport.

### APIs used
#### Mapbox geocoding
- query: 
```https://api.mapbox.com/geocoding/v5/mapbox.places/<<QUERY>>.json?types=place&access_token=<<ACCESS_TOKEN>>```
- response: 
```json
{
    "type": "FeatureCollection",
    "query": [
        "brussels"
    ],
    "features": [
        {
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
                4.313869,
                50.796245,
                4.437046,
                50.913716
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
        },
     ],
    "attribution": "NOTICE: © 2020 Mapbox and its suppliers. All rights reserved. Use of this data is subject to the Mapbox Terms of Service (https://www.mapbox.com/about/maps/). This response and the information it contains may not be retained. POI(s) provided by Foursquare."
}
```

#### OPOI
- query: 
```https://opoi.org/14/8390/5496```
- response: 
```json
{
    "@context": {
        "PostalAddress": {
            "@id": "schema:PostalAddress"
        },
        "address": {
            "@id": "schema:address"
        },
        "addressLocality": {
            "@id": "schema:addressLocality"
        },
        "asWKT": {
            "@id": "geo:asWKT",
            "@type": "geo:wktLiteral"
        },
        "dateModified": {
            "@id": "schema:dateModified",
            "@type": "xsd:dateTime"
        },
        "dcterms": "http://purl.org/dc/terms/",
        "dcterms:license": {
            "@type": "@id"
        },
        "geo": "http://www.opengis.net/ont/geosparql#",
        "hasTag": {
            "@id": "osm:hasTag",
            "@type": "@id"
        },
        "hydra": "http://www.w3.org/ns/hydra/core#",
        "hydra:property": {
            "@type": "@id"
        },
        "hydra:variableRepresentation": {
            "@type": "@id"
        },
        "name": {
            "@id": "schema:name"
        },
        "openingHours": {
            "@id": "schema:openingHours"
        },
        "osm": "https://w3id.org/openstreetmap/terms#",
        "postalCode": {
            "@id": "schema:postalCode"
        },
        "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
        "sameAs": {
            "@id": "schema:sameAs",
            "@type": "@id"
        },
        "schema": "https://schema.org/",
        "seeAlso": {
            "@id": "rdfs:seeAlso",
            "@type": "@id"
        },
        "streetAddress": {
            "@id": "schema:streetAddress"
        },
        "taginfo": "https://taginfo.openstreetmap.org/tags/",
        "telephone": {
            "@id": "schema:telephone"
        },
        "tiles": "https://w3id.org/tree/terms#",
        "website": {
            "@id": "schema:url",
            "@type": "@id"
        },
        "xsd": "http://www.w3.org/2001/XMLSchema#"
    },
    "@graph": [
        {
            "@id": "http://www.openstreetmap.org/node/4413908644",
            "@type": "schema:BarOrPub",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Bruxelles - Brussel",
                "postalCode": "1000",
                "streetAddress": "Rue du Marché au Charbon - Kolenmarkt 5"
            },
            "asWKT": "POINT(4.3507743 50.8466241992768)",
            "dateModified": "2019-02-02T23:05:52Z",
            "hasTag": [
                "taginfo:amenity=bar",
                "taginfo:gay=yes",
                "taginfo:lgbtq=primary"
            ],
            "name": "L'Homo Erectus",
            "openingHours": "Mo-Su 16:00-08:00",
            "seeAlso": "https://www.facebook.com/pages/Homoerectus/297097853642834"
        },
        {
            "@id": "http://www.openstreetmap.org/way/399792852",
            "@type": "schema:Park",
            "asWKT": "POLYGON((4.3534499 50.8387801992782,4.3534523 50.8387749992782,4.3534572 50.8387715992782,4.3534669 50.8387701992782,4.3534752 50.8387720992782,4.3535401 50.8388164992782,4.35383 50.8386599992782,4.3540735 50.8388413992782,4.353642 50.8389247992782,4.3534523 50.8387871992782,4.3534499 50.8387801992782))",
            "dateModified": "2016-02-25T00:30:19Z",
            "hasTag": [
                "taginfo:leisure=garden"
            ]
        }
    ],
    "@id": "https://opoi.org/14/8390/5496",
    "dcterms:isPartOf": {
        "@id": "https://opoi.org",
        "@type": "hydra:Collection",
        "dcterms:license": "http://opendatacommons.org/licenses/odbl/1-0/",
        "dcterms:rights": "http://www.openstreetmap.org/copyright",
        "hydra:search": {
            "@type": "hydra:IriTemplate",
            "hydra:mapping": [
                {
                    "@type": "hydra:IriTemplateMapping",
                    "hydra:property": "tiles:longitudeTile",
                    "hydra:required": true,
                    "hydra:variable": "x"
                },
                {
                    "@type": "hydra:IriTemplateMapping",
                    "hydra:property": "tiles:latitudeTile",
                    "hydra:required": true,
                    "hydra:variable": "y"
                },
                {
                    "@type": "hydra:IriTemplateMapping",
                    "hydra:property": "tiles:zoom",
                    "hydra:required": true,
                    "hydra:variable": "z"
                }
            ],
            "hydra:template": "https://opoi.org/{z}/{x}/{y}",
            "hydra:variableRepresentation": "hydra:BasicRepresentation"
        }
    },
    "tiles:latitudeTile": 5496,
    "tiles:longitudeTile": 8390,
    "tiles:zoom": 14
}
```

### Problems encountered
- Determenig if a POI retrieved from the OPOI API belongs to a certain city / village
Based on the OPOI API working with the tiles, it is possible that these tiles contain multiple towns, thus resulting in a respone with POIs from multiple towns.
Because not all POI objects in the API response contain an address, it is hard to differenciate between these towns.
The costly solution would be to iterate trough all POIs and make a reverseGeoCoding API request with the coordinate of the POI.

- It would be great to have an overview of all types of POIs contained in the OPOI dataset.
Having an overview of all types, their @type and maybe @hasTag would be helpfull to quickly find data that fits your usecase.

- Flickr API not responding with usefull data, see [discussion](https://www.flickr.com/groups/api/discuss/72157715195176202/).
The plan was to use the Flickr places endpoint to retrieve the popular areas (most pictures taken) and based on that determine areas of interest.

### Future vision / recommendations
- Backend to store generated maps:  
There could be a backend that saves the generated maps or the parameters needed to generate the maps, so based on that users can compare their mental map with maps of other users.
- Solid implementation:
    - Once available, it would be a great addition if we are able to utilise gps records to know how acquainted the used is with the selected city. Based on prior visits and routes taken there could also be an indication of the interest a user has. To cold start this, the data could be imported from Google Maps Timeline and similar services.
    - Based on your contacts and their preferences your user profile could get better predicted when you don't own much data (could help overcome cold start problem).
- Implementing a spread factor:  
Adding a method that could pick from the list of the suggested places with an optimal spread could allow for a balanced map. This can also overcome the clustering of markers on the map and make sure they don't overlap.
