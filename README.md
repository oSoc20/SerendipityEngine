<p align="center">
    <br>
    <img src="https://github.com/oSoc20/SerendipityEngine/blob/master/img/serendipity-engine_AHA-01.svg" alt="Serendipity Engine Crest" width="200"/>
    <br>
<p>

# SerendipityEngine
Aha! A generator for surprising yet recognizable maps of your neighbourhood

## Publishing to the gh-pages website

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
