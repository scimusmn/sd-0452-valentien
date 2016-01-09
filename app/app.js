import os from 'os'; // native node.js module
import { remote } from 'electron'; // native electron module
import jetpack from 'fs-jetpack'; // module loaded from npm
import appData from './lib/appData.js';
import language from './lib/language.js';
import screenManager from './lib/screenManager.js';
import screensaver from './lib/screensaver.js';
import mainScreen from './lib/mainScreen.js';
import viewerScreen from './lib/viewerScreen.js';
import env from './env';

import { tween } from './vendor/gsap/src/minified/TweenMax.min';
import { Zoomer } from './vendor/Zoomer/jquery.fs.zoomer.min';

console.log('Loaded environment variables:', env);

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
    screenManager.addScreen(new mainScreen($('#screen_main'))); // Add Main screen
    screenManager.addScreen(new viewerScreen($('#screen_viewer'))); // Add Viewer screen
    screenManager.showScreen(screenManager.SCREEN_MAIN);

    language.setupToggle('#language_btn');
    language.setupTranslations($(appData.configXML).find('component').first());

    var ss = new screensaver(appData.screensaverTimeout, './assets/dynamic/videos/screensaver.webm', function() {

      //On sleep
      Language.setLanguage(Language.ENGLISH);
      screenManager.showscreen(screenManager.SCREEN_MAIN);

    });

  }

  // document.getElementById('greet').innerHTML = greet();
  // document.getElementById('platform-info').innerHTML = os.platform();
  // document.getElementById('env-name').innerHTML = env.name;
});
