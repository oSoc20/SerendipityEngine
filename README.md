# SerendipityEngine
Aha! A generator for surprising yet recognizable maps of your neighbourhood

## Publishing to the gh-pages website
(make sure the code you want to publish to the site is in the Front folder of the gh-pages branch)
```
$ npm install -g angular-cli-ghpages

$ git checkout gh-pages

$ git push origin gh-pages

$ ng build --prod --base-href https://osoc20.github.io/SerendipityEngine/

$ ngh --dir=dist/SerendipityFront
```
