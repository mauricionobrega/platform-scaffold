# Mobify Progressive Web Scaffold

## Setup

```
npm install
npm run dev
```

## Deploying Bundle to Mobify Cloud

If you will be deploying bundles to Mobify Cloud, then follow these steps to authorize your computer:
- Go to [https://cloud.mobify.com/account/](https://cloud.mobify.com/account/) and find your API key.
- Run the following command in your terminal:
```
npm run save-credentials -- -u <myEmail@organization.com> -k <myAPIkey>
```
- You're now ready to deploy bundles! To deploy bundles you run the following command:
```
npm run push -- -m "Test push by <name>"
```

## 🔒 Avoiding HTTPS errors in local development

The development server uses a self-signed SSL certificate which is valid, but
must be added to your operating system to work correctly.

### macOS

To add the certificate to the Mac system trust store:

1. Open https://localhost:8443. *You should see a security warning.* ⚠️
2. In the root of the project directory, run `open dev-server/localhost.pem`.
3. Add the certificate to your `login` Keychain.
4. In `Keychain Access` search for `Mobify Development Server`.
5. Right click it and select `Get Info`.
6. Expand the `Trust` section.
7. Set `Secure Socket Layer (SSL)` to `Always Trust`.
8. Close the info window. You will need to enter your password.
9. Open https://localhost:8443 in your browser. *The warning is gone!* 🎉

### Windows

To add the certificate to the Windows Trusted Root Certificate Store:

1.  Open https://localhost:8443. *You should see a security warning.* ⚠️
2.  Start Menu → Run `mmc.exe`.
3.  File → Add/Remove Snap-in.
4.  Select "Certificates" and click Add.
5.  Select "Computer Account" and click Next.
6.  Select "Local Computer" and click Finish.
7.  Click OK to close the Add or Remove Snap Ins dialog.
8.  Expand the Certificates node and right-click on the Trusted Roots Certification Authorities node.
9.  Select All Tasks → Import.
10.  Import the file at `$\web\dev-server\localhost.pem`. Leave all other settings as is while importing.
11. After clicking Finish, you should get an alert saying "Import Successful".
12. Exit the window. You do not need to save the console settings so click No when prompted.
13. Open https://localhost:8443 in your browser. *The warning is gone!* 🎉


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

To run the project's styleguide, use:

```
npm run styleguide
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

## Linting

This project comes with a linter setup using `eslint`,
`eslint-plugin-react`, `eslint-plugin-import`, and
`eslint-plugin-jsx-a11y`. By default, it uses the Mobify code style
(https://www.github.com/mobify/mobify-code-style). Run the linter
using:

```
npm run lint
```

If this code style is a poor match for your pre-existing practices,
there are two ways you can modify the linter configuration to suit
your use case better. For small changes, you can add rules to the
`.eslintrc.yml` file in the root web directory. Rules specified in
this file override rules in the Mobify standard; the following `rules`
section adds an additional rule and disables an existing rule:

```yaml
rules:
  react/react-in-js-scope: error
  camelcase: off
```

For larger differences from the Mobify code style, you can replace the
Mobify config with a different configuration base. This involves
editing the `extends` section in `.eslintrc.yml`. For example, if you
use the Airbnb style guide, replace the contents of `.eslintrc.yml`
with:

```yaml
extends:
  - airbnb
```

These methods can be combined to use a different standard with minor
local variations.

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

To verify that changes do not break the guest and registered checkout flows:

```
npm run smoke-test
```

## Lighthouse tests

You can run [Lighthouse](https://github.com/GoogleChrome/lighthouse) test against production with:

```
npm run test:pwa-prod
```

When you develop it might be helpful to run the same test against your local files. This assumes you have `npm run dev` running in another tab:

```
npm run test:pwa-local
```

For CI builds, this command builds and serves the bundle for testing with Preview:

```
npm run test:pwa-ci
```


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
cd ../platform-scaffold/web
npm link progressive-web-sdk
npm run dev
```

## Analyze Bundle Size

To visualize bundle script content, run:

```
npm run analyze-build
```

## Swapping Integration Managers

Note: This should make it's way into the Tutorial eventually, but this is here for now.

### Running against Merlins:

1. Open `app/main.jsx`.
2. Import the Merlin's connector:

```
import connector from './integration-manager/_merlins-connector'
// import connector from './integration-manager/_sfcc-connector'
```

3. Open Preview using the following link:

https://preview.mobify.com/?url=https%3A%2F%2Fwww.merlinspotions.com%2F&site_folder=https%3A%2F%2Flocalhost%3A8443%2Floader.js&disabled=0&domain=&scope=0

### Running against Salesforce Commerce Cloud:

1. Open `app/main.jsx`.
2. Import the SFCC connector:

```
// import connector from './integration-manager/_merlins-connector'
import connector from './integration-manager/_sfcc-connector'
```

3. Open Preview using the following link:

https://preview.mobify.com/?url=https%3A%2F%2Fmobify-tech-prtnr-na03-dw.demandware.net%2Fon%2Fdemandware.store%2FSites-2017refresh-Site%2Fdefault%2FHome-Show&site_folder=https%3A%2F%2Flocalhost%3A8443%2Floader.js&disabled=0&domain=&scope=1
