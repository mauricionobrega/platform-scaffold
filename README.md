# Progressive Web Scaffold
The scaffold / starter kit for Progressive Web

## Requirements
- [Git](https://git-scm.com/)
- We recommend you use [nvm](https://github.com/creationix/nvm#installation) to
manage node and npm versions.
- node 4.x or greater
- npm 2.x or greater

## Get the Scaffold

```bash
git clone git@github.com:mobify/progressive-web-scaffold.git
npm install
npm run configure
```

## Run the Scaffold

```
npm install
npm run dev
```

[Visit this preview link](https://preview.mobify.com/?url=http%3A%2F%2Fwww.merlinspotions.com%2F&site_folder=https%3A%2F%2Flocalhost%3A8443%2Floader.js&disabled=0&domain=&scope=0) and click preview.

## Adding a page (container)

```
npm run add:page
```

## Tests and test coverage

To run the full test suite, you can use:

```
npm test
```

To run tests in watch mode and only run test related to files you modify during development, use:

```
npm run test:watch
```

To see your test coverage in the console, use:

```
npm run test:coverage
```

or to see an HTML report in the browser, use:

```
npm run test:coverage
open coverage/index.html
```
