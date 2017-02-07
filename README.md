# Platform Scaffold

Welcome to the Platform Scaffold. This repo is organized as follows:

| Directory          | Description                                                         |
| ------------------ | ------------------------------------------------------------------- |
| [/web](/web)       | Contains the web (Mobify Progressive Web SDK) scaffold              |
| [/native](/native) | Contains the native (Mobify Progressive App SDK, or Astro) scaffold |

## Requirements

- [Git](https://git-scm.com/)
- We recommend you use [nvm](https://github.com/creationix/nvm#installation) to
manage node and npm versions.
- node 6.x LTS
- npm 3.x

## SSL

### Prevent SSL Errors in Preview (on a Mac)

The development server uses a self-signed SSL certificate which is
valid, but treated as suspect by browsers. This means that we must
create and reconfirm security exceptions for it, and avoid localhost
for certain use cases (such as service workers).

To add the certificate to the Mac system trust store and make the
browsers accept it, do the following:

1. In the root of the project directory, run `open web/node_modules/webpack-dev-server/ssl/server.crt`.
2. Open `Keychain Access` -> go to `Certificates` -> select `localhost`
3. Right click on the entry and select `Get Info`
4. Expand the `Trust` section
5. Set `Secure Socket Layer (SSL)` to `Always Trust`
6. Close the info window. You will need to enter your password.

This process will allow all projects hosted with `webpack-dev-server`
version 1.15.0 and up to be trusted by your browsers.

### Previewing on a device

When you preview on a real device, or on the Android emulator, you are
connecting from a "remote" computer. Even the Android emulator is a separate
computer with its own IP. In order for your device to trust the SSL cert
that the webpack dev server uses, you'll need to use Chrome port forwarding.

_Note_: The webpack dev server uses a self-signed certificate for `localhost`
        which cannot be trusted when connecting to it using your local
        computer's IP address (ie. 192.168.2.2). Because of this you *have*
        to use Chrome port forwarding to connect to the webpack dev server
        from an Android device.

To set this up, do the following:

1. Open chrome on the computer running the webpack dev server
2. Navigate to `chrome://inspect`

   ![Chrome: Inspect Screenshot](web/dev-server/assets/chrome-inspect.png)

3. Click the **Port Forward** button beside the *Discover USB devices* checkbox
4. Add a new entry mapping port **8443** to **localhost:8443** and hit <Enter>
5. Make sure the checkbox **Enable port forwarding** at the bottom of the modal is checked

   ![Chrome: Inspect with port forward entry](web/dev-server/assets/chrome-inspect-port-forward.png)

6. Click **Done**

You can now preview on your Android device and use `https://localhost:8443/...`
