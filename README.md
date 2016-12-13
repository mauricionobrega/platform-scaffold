## Requirements

- [Git](https://git-scm.com/)
- We recommend you use [nvm](https://github.com/creationix/nvm#installation) to
manage node and npm versions.
- node 6.x LTS
- npm 3.x

## Setup

```
npm install
npm run dev
```

## Adding a page (container)

```
npm run add:page
```

## Docs with Styleguide

To run the project documentation, including a live styleguide, use:

```
npm run docs:dev
```

## Add, remove, or edit svg icons

To update the SVG sprite to match any additions, removals, or changes made to SVG icons from `app/static/svg`, run the following command to create new spritesheet. (This spritesheet lives in `app/sprite/sprite.svg`.)

_SVG is an icon system to replace icon fonts. SVG Sprite is a series of icons stored in one file._

```
npm run build-sprites
```

## Tests

To run the full test suite, you can use:

```
npm run test:all
```

To run tests in watch mode and only run test related to files you modify during development, use:

```
npm run test:watch
```

## Prevent SSL Errors in Preview (on a Mac)

The development server uses a self-signed SSL certificate which is
valid, but treated as suspect by browsers. This means that we must
create and reconfirm security exceptions for it, and avoid localhost
for certain use cases (such as service workers).

To add the certificate to the Mac system trust store and make the
browsers accept it, do the following:

1. In the root of the project directory, run `open node_modules/webpack-dev-server/ssl/server.crt`.
2. Open `Keychain Access` -> go to `Certificates` -> select `localhost`
3. Right click on the entry and select `Get Info`
4. Expand the `Trust` section
5. Set `Secure Socket Layer (SSL)` to `Always Trust`
6. Close the info window. You will need to enter your password.

This process will allow all projects hosted with `webpack-dev-server`
version 1.15.0 and up to be trusted by your browsers.

## Automated end-to-end tests

To verify that changes do not break the checkout flow:

```
npm run smoke-test
```

## Developing against `develop` of the Progressive Web SDK

If you are wanting to improve or add a library/component in the [Progressive Web SDK](https://github.com/mobify/progressive-web-sdk),
you will need to clone the SDK (note: it is not open on Github).

```
git clone git@github.com:mobify/progressive-web-sdk.git
cd progressive-web-sdk
npm link
```

Then navigate back to your project root directory and run:
```
npm link progressive-web-sdk
```
