<p align="center">
    <br>
    <img src="https://github.com/oSoc20/SerendipityEngine/blob/master/img/serendipity-engine_AHA-01.svg" alt="Serendipity Engine Crest" width="200"/>
    <br>
<p>
<p align="center"><b>Serendipity Engine</b></p>
<p align="center">
<a href="https://mit-license.org/"><img src="https://img.shields.io/badge/License-MIT-green.svg?style=flat-square"/></a>
<a href="https://github.com/oSoc20/SerendipityEngine/releases"><img src="https://img.shields.io/badge/Version-0.1.0-blue.svg?style=flat-square"/></a>
</p>
<p align="center">Serendipity Engine is a web application you can use to generate <a href="https://mymentalmap.be/">your mental map</a> of a city.<p>

# SerendipityEngine
Aha! A generator for surprising yet recognizable maps of your neighbourhood

## The team
<p align="center">
    <br>
    <a href="https://github.com/dormalexis">
        <img src="https://avatars2.githubusercontent.com/u/47395991?s=400&u=68653b094fd8aa7b3aff6b66817858b4bcfdadc3&v=4" alt="Alexis Dormal Avatar" width="100"/>
    </a>
    <a href="https://github.com/kasperzutterman">
        <img src="https://avatars1.githubusercontent.com/u/21260838?s=460&u=8ca0be9b61514dd41bb1e4a4a598eac14705fd7f&v=4" alt="Kasper Zutterman Avatar" width="100"/>
    </a>
    <a href="https://github.com/louisheeren">
        <img src="https://avatars1.githubusercontent.com/u/44835411?s=400&v=4" alt="Louis Heeren Avatar" width="100"/>
    </a>
    <br>
<p>

## Code

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.19.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

### Publishing to the gh-pages website

```
$ npm install -g angular-cli-ghpages

$ git checkout gh-pages

$ git push origin gh-pages
___
A) deploy on gh pages to https://osoc20.github.io/SerendipityEngine/ without custom url
$ ng build --prod --base-href https://osoc20.github.io/SerendipityEngine/

$ ngh --dir=dist/SerendipityFront
___
B) deploy on gh pages to https://mymentalmap.be with custom url

$ ng deploy --cname=mymentalmap.be
```
