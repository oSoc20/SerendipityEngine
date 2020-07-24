<p align="center">
    <br>
    <img src="https://github.com/oSoc20/SerendipityEngine/blob/master/img/serendipity-engine_AHA-01.svg" alt="Serendipity Engine Crest" width="200"/>
    <br>
<p>

# SerendipityEngine
Aha! A generator for surprising yet recognizable maps of your neighbourhood


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
