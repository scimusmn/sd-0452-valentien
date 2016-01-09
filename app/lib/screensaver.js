// define(['videojs'], function(videojs) {

// import '../vendor/video-js/dist/video-js/video';

function screensaver(timeoutSeconds, videoSrc, onSleepCallback, onAwakeCallback) {

  // How long is timeout.
  this.timeoutSeconds = timeoutSeconds || 60;

  //Callback functions to reset external
  this.onSleepCallback = onSleepCallback || function() {};

  this.onAwakeCallback = onAwakeCallback || function() {};

  // Start the clock
  this.idleTime = 0;
  this.active = false;

  var _this = this;

  // Increment the idle time counter every minute.
  this.idleInterval = setInterval(function() { _this.timerIncrement(); }, 1000);// 1 second

  // Zero the idle timer on any movement.
  $('body').on('touchstart keypress mousemove mousedown', function() { _this.anyAction(); });

  //Setup video screensaver
  this.createVideo(videoSrc);

  //Default to hidden screensaver
  this.awake();

}

/**
* Setup fullscreen looping video to be shown during sleep.
*/
screensaver.prototype.createVideo = function(videoSrc) {

  //Create video tag
  var videoTag = '<video id="screensaver_video" style="position:fixed; top:0px; left:0px; z-index:999;" class="video-js vjs-default-skin vjs-big-play-centered"><source src="' + videoSrc + '" type="video/webm" /></video>';
  var videoOptions = { controls: false, autoplay: false, loop: 'true', preload: 'auto' };

  //Append to html
  $('body').append(videoTag);

  //Initialize player
  // this.videoPlayer = videojs('screensaver_video', videoOptions, function() {
  //   // Player (this) is initialized and ready.
  // });

};

/**
* Start the screensaver after X seconds of inactivity.
*/
screensaver.prototype.timerIncrement = function() {

  //Increment counter
  this.idleTime = this.idleTime + 1;

  // If it's been X seconds of inactivity, save the screen
  if (this.idleTime > this.timeoutSeconds && this.active == false) {

    this.sleep();

  }

};

/**
* Zero the idle timer on any movement.
*/
screensaver.prototype.anyAction = function() {

  this.idleTime = 0;

  if (this.active == true) {

    this.awake();

  }

};

/**
* Display the screensaver
*/
screensaver.prototype.sleep = function() {

  this.active = true;
  this.onSleepCallback();

  //Show the video
  $('#screensaver_video').fadeIn('slow');
  this.videoPlayer.play();

};

/**
* Remove the screensaver
*/
screensaver.prototype.awake = function() {

  this.active = false;
  this.onAwakeCallback();

  //Hide the video
  var _this = this;
  $('#screensaver_video').fadeOut('slow', function() {
    $('#screensaver_video').get(0).pause();
  });

};

export default screensaver;
