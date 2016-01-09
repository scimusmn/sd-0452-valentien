// define(['net/AppData', 'net/ui/ThumbGrid', 'net/ui/ScreenManager', 'tween'], function(AppData, ThumbGrid, ScreenManager, mainScreen, ViewerScreen) {

import thumbGrid from './thumbGrid.js';
import appData from './appData.js';
import screenManager from './screenManager.js';

var mainScreen = function(containerDiv) {

  this.containerDiv = containerDiv;

  this.thumbGrid = {};
  this.init();

};

// init() | Set up screen layout and buttons
mainScreen.prototype.init = function() {

  this.thumbGrid = new thumbGrid($('#main_nav_grid'), $('#main_nav_grid #thumb_clone'), $(appData.configXML).find('component plants plant'), 5, 6);
  this.thumbGrid.makeGrid();

  this.refreshButtonListeners();

};

// refresh() | Refresh displays as needed before showing
mainScreen.prototype.refresh = function() {

  this.resetGrid();

};

// resetGrid() | Reset visual states of thumb grid
mainScreen.prototype.resetGrid = function() {

  $('#main_nav_grid .thumb').each(function() {
    TweenLite.set($(this), { css: { zIndex: 0, opacity:1, scale:1, boxShadow:'0px 0px 0px 0px rgba(0,0,0,0)' } });
  });

};

// transitionIn() | Tween in display elements
mainScreen.prototype.transitionIn = function() {

  TweenLite.delayedCall(0.75, function() {

    TweenLite.to($('#main_nav_grid'), 1, { css: { left:0 }, ease:Power2.easeOut });
    TweenLite.to($('#screen_main .content-left'), 1, { css: { left:0 }, delay:0.2, ease:Power2.easeOut });

  });

};

// transitionOut() | Tween out display elements
mainScreen.prototype.transitionOut = function() {

  TweenLite.to($('#main_nav_grid'), 1, { css: { left:-1080 }, ease:Power2.easeIn });
  TweenLite.to($('#screen_main .content-left'), 1, { css: { left:-1080 }, delay:0.2, ease:Power2.easeIn });

};

// featurePlant() | Transition to viewer screen with selected plant
mainScreen.prototype.featurePlant = function(plantId, plantThumbBtn) {

  //Tell Viewer screen to setting up plant info
  appData.setFeaturePlant(plantId);

  screenManager.showScreen(screenManager.SCREEN_VIEWER);

};

// refreshButtonListeners() | Listen to all buttons on this screen
mainScreen.prototype.refreshButtonListeners = function() {

  var _this = this;

  //Removes all existing listeners to avoid doubling listeners
  this.disableButtonListeners();

  //Listen for all button clicks...
  $(this.containerDiv).find("[data-role='button']").on('click', function(event) {

    _this.buttonClicked($(this).attr('id'), $(this));

  });

};

// disableButtonListeners() | Remove all current button listeners
mainScreen.prototype.disableButtonListeners = function() {

  $(this.containerDiv).find("[data-role='button']").each(function() {

    $(this).off();

  });

};

// buttonClicked() | All click events for this screen shall pass through here
mainScreen.prototype.buttonClicked = function(btnId, btnRef) {

  console.log('buttonClicked(btnId): ' + btnId);

  //Plant Thumbs
  if (btnId.substring(0, 6) == 'thumb_') {

    var plantId = btnId.substring(6);
    this.featurePlant(plantId, btnRef);
    return;

  }

  //Other btns...
  switch (btnId) {
    case 'btn_id_1':

    break;
    default:

    break;
  }

};

export default mainScreen;
