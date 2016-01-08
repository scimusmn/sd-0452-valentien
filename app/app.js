import os from 'os'; // native node.js module
import { remote } from 'electron'; // native electron module
import jetpack from 'fs-jetpack'; // module loaded from npm
import { greet } from './hello_world/hello_world'; // code authored by you in this project
import env from './env';

import { tween } from './vendor/gsap/src/minified/TweenMax.min';
import { Zoomer } from './vendor/Zoomer/jquery.fs.zoomer.min';
// TODO: Removing for now. Find out whether this is used in final app.
//import { videojs } from './vendor/video-js/dist/video-js/video';

console.log('Loaded environment variables:', env);

var app = remote.app;
var appDir = jetpack.cwd(app.getAppPath());

document.addEventListener('DOMContentLoaded', function() {

  //Load XML
  console.log($);
  $.ajax({
    type: 'GET',
    url: './assets/static/data/config.xml',
    dataType: 'xml',
    success: function(xml) {

      AppData.updateSettings(xml);
      initialize();

    },

    error: function(jqXHR, textStatus, errorThrown) {
    },

  });

  // document.getElementById('greet').innerHTML = greet();
  // document.getElementById('platform-info').innerHTML = os.platform();
  // document.getElementById('env-name').innerHTML = env.name;
});
