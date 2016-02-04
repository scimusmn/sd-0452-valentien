# A.R. Valentien Painting Viewer
Zoomable painting viewer for the San Diego Natural History Museum's [Coast to
Cactus exhibit](http://www.sdnhm.org/exhibitions/current-exhibitions/coast-to-cactus-in-southern-california/).

## Disclaimer
This code is offered here for example and reference. The compiled application is not intended for public consumption outside of the exhibit. This repository is lacking the media files that make up the full application.

## Technical highlights
The application features a JS based high res image viewer, giving visitors the ability to zoom in on an high res image by double clicking.

## Installation and setup
To set up the application the first time, run:

    $ npm install

To start the application in development mode, run:

    $ npm start

To build a release of the application for installation on the exhibit kiosk, run:

    $ npm run release

# Historical note
This is the latest version of the Valentien application, which was primarily developed in [this older repository](https://github.com/scimusmn/sd-valentien-old). This old version of the application was built to use Node Webkit and had some commit history that we didn't want to bring along into this new application which is designed for Electron. Refer to the old repository for the commit and attribution history if needed.
