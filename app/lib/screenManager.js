import appData from './appData.js';

var screenManager = function() {};

//Constants
screenManager.SCREEN_MAIN = 'main';
screenManager.SCREEN_VIEWER = 'viewer';

screenManager.init = function() {

  this.screens = [];

};

screenManager.addScreen = function(screen) {
  this.screens.push(screen);
};

screenManager.showScreen = function(screenContainerId) {

  if (screenContainerId == appData.currentScreenId) return;

  //Transition out current screen
  var isFirstScreen = false;
  if (this.currentScreen) {
    this.currentScreen.transitionOut();
    $(this.currentScreen.containerDiv).css('z-index', '0');
  } else {
    isFirstScreen = true;
  }

  switch (screenContainerId) {

    case screenManager.SCREEN_MAIN:
      this.currentScreen = this.screens[0];
    break;
    case screenManager.SCREEN_VIEWER:
      this.currentScreen = this.screens[1];
    break;

  }

  //Update app data
  appData.setCurrentScreen(screenContainerId);

  //Prep screen before transition
  this.currentScreen.refresh();

  //Show new screen
  $(this.currentScreen.containerDiv).show();

  //Transition to current screen
  $(this.currentScreen.containerDiv).css('z-index', '1');
  if (isFirstScreen == false) this.currentScreen.transitionIn();

};

export default screenManager;
