/**
 * Electron helper packages
 */
import os from 'os';
import { remote } from 'electron';
import jetpack from 'fs-jetpack';
import env from './env';

/**
 * Application logic for painting browser
 */
import appData from './lib/appData.js';
import language from './lib/language.js';
import screenManager from './lib/screenManager.js';
import Screensaver from './lib/screensaver.js';
import MainScreen from './lib/MainScreen.js';
import ViewerScreen from './lib/ViewerScreen.js';

/**
 * Vendor libraries for the painting viewer
 */
import { tween } from './vendor/gsap/src/minified/TweenMax.min';
import { Zoomer } from './vendor/Zoomer/jquery.fs.zoomer.min';

var app = remote.app;
var appDir = jetpack.cwd(app.getAppPath());

document.addEventListener('DOMContentLoaded', function() {

  //Load XML
  $.ajax({
    type: 'GET',
    url: './assets/static/data/config.xml',
    dataType: 'xml',
    success: function(xml) {

      appData.updateSettings(xml);
      initialize();

    },

    error: function(jqXHR, textStatus, errorThrown) {
    },

  });

  function initialize() {

    screenManager.init();
    screenManager.addScreen(new MainScreen($('#screen_main'))); // Add Main screen
    screenManager.addScreen(new ViewerScreen($('#screen_viewer'))); // Add Viewer screen
    screenManager.showScreen(screenManager.SCREEN_MAIN);

    language.setupToggle('#language_btn');
    language.setupTranslations($(appData.configXML).find('component').first());

    var ss = new Screensaver(
      appData.screensaverTimeout, './assets/dynamic/videos/screensaver.webm', function() {
        //On sleep
        language.setLanguage(Language.ENGLISH);
        screenManager.showscreen(screenManager.SCREEN_MAIN);
      }
    );

  }

});
