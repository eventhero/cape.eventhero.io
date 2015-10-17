# EventHero visual style guide

## TODOs
- [X] Versioned structure
- [X] variables.less
- [X] watch: run gulp
- [X] Set long expiration caching in express app
- [X] heroku deployment
- [X] fonts
- [X] S3 deployment
- [X] Use codeship env vars in building version
- [X] Add npm deploy script to use local gulp, not globally installed
- [ ] integrate https://www.npmjs.com/package/kss to generate styleguide
- [ ] cloudfront caching ?

## Install for development (on Mac OSX)

- Install brew http://brew.sh
- Install nvm using brew, and install node (latest)
```
brew install nvm
nvm ls
nvm install vX.X
nvm use vX.X
```
- Install modules `npm install`

## Develop

- Develop by starting `npm run serve`. This will open browser and "watch" for changes and recompile/reload files live.

## Deploy

- Bump the version in package.json and commit
- Push to origin. Codeship automatically builds and deploys all commits to master

Deploys never overwrite previously deployed assets, each deployment pushes assets in ./dest to 
http://cape.eventhero.io/<version>/ folder.

## Continuous Integration/Deployment
codeship
IAM user - codeship-cape
IAM group - cape-ops
