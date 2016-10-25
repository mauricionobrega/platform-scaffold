## Requirements

- [Git](https://git-scm.com/)
- We recommend you use [nvm](https://github.com/creationix/nvm#installation) to
manage node and npm versions.
- node 4.x or greater
- npm 2.x or greater

## Setup

```
npm install
npm run dev
```

## Adding a page (container)

```
npm run add:page
```

## Styleguide

To run the project styleguide use:

```
npm run styleguide
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

## Automated end-to-end tests

To verify that changes do not break the checkout flow:

```
npm run smoke-test
```

## Developing against `develop` of the Progressive Web SDK

If you are wanting to improve or add a library/component in the Progressive Web SDK,
you will need to clone the SDK (note: it is not open on Github).

git clone git@github.com:mobify/progressive-web-sdk.git
cd progressive-web-sdk
npm link

Then navigate back to your project root directory and run `npm link progressive-web-sdk`.
