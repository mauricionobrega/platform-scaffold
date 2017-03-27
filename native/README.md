# Progressive Mobile App SDK Scaffold

This directory contains the Progressive Mobile App SDK (Astro) Scaffold. It is a fully functioning iOS and Android app demoing the Merlins Potions e-commerce store and is a part of the Mobify Platform.

## Requirements

* [Git](https://git-scm.com/)
* node 6 LTS\*
* npm 3

\* We recommend using [nvm](https://github.com/creationix/nvm#installation) to manage your node and npm versions. 

## Getting Started

To get started with a Progressive App project, follow these steps:

- Clone this repository
- Navigate to the `native` folder in your terminal
- Run `npm run deps`

For iOS:
- Open Xcode
- Open the `scaffold.xcworkspace` file
- Run the app

For Android:
- Open Android Studio
- Select `Import Project`
- Select the build.gradle file inside the `android` folder
- Gradle will now build your dependencies, once it's done, you can run the app.

#Generator

You can use the [generator](scripts/generator.sh) to generate a new Progressive Mobile app.


