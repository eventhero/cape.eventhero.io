# EventHero visual style guide

## TODOs
- [X] Versioned structure
- [X] variables.less
- [X] watch: run gulp
- [X] Set long expiration caching in express app
- [X] heroku deployment
- [ ] fonts
- [ ] integrate https://github.com/darcyclarke/DSS to generate styleguide
- [ ] cloudfront caching ?

## Installation (on Mac OSX)

- Install brew http://brew.sh
- Install nvm using brew, and install node 0.10
```
brew install nvm
nvm install 0.10
nvm use 0.10
```
- Install gulp globally `npm install gulp -g`
- Install modules `npm install`

## Development

- Develop by starting `gulp`. This will open browser and "watch" for changes and recompile/reload files live.

## Release

- Bump the version in package.json
- `gulp build` and commit the built version of assets to git
- `git push heroku master`
