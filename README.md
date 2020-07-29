<p align="center">
    <br>
    <img src="https://github.com/oSoc20/SerendipityEngine/blob/master/img/serendipity-engine_AHA-01.svg" alt="Serendipity Engine Crest" width="200"/>
    <br>
<p>

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
