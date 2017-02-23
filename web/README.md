# Mobify Progressive Web Scaffold

## Setup

```
npm install
npm run dev
```

## Adding a page (container)

```
npm run add:page
```

## Adding a component

```
npm run add:component
```

## Using the notification system

The scaffold comes with a system to notify users with messages that drop down
from the header, and can be dismissed. To make your own, add the following code
to the actions file of your component in the desired action. Example:

```
dispatch(addNotification({
    content: 'The notification message.',
    id: 'uniqueIdForTheNotification',
    showRemoveButton: true
}))
```

## Docs with Styleguide

To run the project documentation, including a live styleguide, use:

```
npm run docs:dev
```

## SVG Images and Icons

The SVG directory can be found in `app/static/svg/`. There are three purposes for this directory:

1. Store any **static SVG images**
    * These are stored in the `app/static/svg/` directory's root. These files are ignored by the SVG optimization task (for now).
2. Store **icon source files**
    * These are stored in the `app/static/svg/sprite-source/` directory and are the targets for the SVG optimization and Sprite building tasks.
3. Store the **generated icon sprite**
    * This is stored in the `app/static/svg/sprite-dist` directory as the destination for the generated icon sprite.

When adding, removing or modifying SVG icons, it is up to the developer to run the following command to generate the new SVG sprite sheet and commit the change.

```
npm run build-sprites
```

Icon sprites are a technique for creating easy to use icons. [Learn more here](https://medium.com/@webprolific/why-and-how-i-m-using-svg-over-fonts-for-icons-7241dab890f0#.1v9l7c7q2) about the technique and why we use it over icon fonts.

## Tests

To run the full test suite, you can use:

```
npm run test:all
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

## Lighthouse tests

You can run [Lighthouse](https://github.com/GoogleChrome/lighthouse) test against production with:

```
npm run test:pwa-prod
```

When you develop it might be helpful to run the same test against your local files:

```
sudo npm run test:pwa-local
```

You **must** keep running `npm run dev` at the same time.

There is also `test:pwa-ci` task (also requires `sudo`) for CI that runs `dev` and `pwa-local` in parallel.

## Developing against `develop` of the Progressive Web SDK

If you are wanting to improve or add a library/component in the [Progressive Web SDK](https://github.com/mobify/progressive-web-sdk),
you will need to clone the SDK (note: it is not open on Github).

```
git clone git@github.com:mobify/progressive-web-sdk.git
cd progressive-web-sdk
npm link
npm install # REQUIRED!!
npm run dev:build # Some assets required by the scaffold build are only created by this command (/dist/*)
```

Then navigate back to this directory and run:
```
cd ../progressive-web-scaffold/web
npm link progressive-web-sdk
npm run dev
```
