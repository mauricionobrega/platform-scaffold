# Progressive Mobile App SDK Scaffold

This directory contains the Progressive Mobile App SDK (Astro) Scaffold. It is a fully functioning iOS and Android app demoing the Merlins Potions e-commerce store and is a part of the Mobify Platform. It is built and maintained by the Apps team. For questions and support, head on to `#progressive-app-astro`.

## Requirements

* [Git](https://git-scm.com/)
* node 6 LTS\*
* npm 3

We recommend using [nvm](https://github.com/creationix/nvm#installation) to manage your node and npm versions. 

## Setup

Before you get started, take some time to look through [the Getting Started Guide](http://astro.mobify.com/latest/guides/before-you-begin/). Once you're familiar with progressive apps, follow these steps to set up this project to start developing:

- Clone this repository
- Navigate to the `native` folder in your terminal
- Run `npm run deps`

## Run
To run the app, follow these steps.

### iOS
To run the app for iOS, follow these steps:
- Open the `scaffold.xcworkspace` file in the 
- Make sure you have the `scaffold` target selected.
- Build and run the app (`CMD+R`)

### Android
To run the app for Android, follow these steps:
- Open Android Studio
- Select `Import Project`
- Select the build.gradle file inside the `android` folder
- Gradle will now build your dependencies, once it's done, you can run the app.
