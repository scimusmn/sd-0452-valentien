var appData = function() {
  this.configXML = {};
};

appData.updateSettings = function(configXML) {
  this.configXML = configXML;
  this.developerMode = ($(this.configXML).find('setting[id=developerMode]').attr('value') == 'true');
  this.screensaverTimeout = parseFloat($(this.configXML).find('setting[id=screensaverTimeout]').attr('value'));
  this.infoHideTimeout = parseFloat($(this.configXML).find('setting[id=infoHideTimeout]').attr('value'));
};

appData.setCurrentScreen = function(screenId) {
  this.currentScreenId = screenId;
};

appData.setFeaturePlant = function(plantId) {
  this.featuredPlant = plantId;
};

export default appData;
