var language = function() {};

//Track current language
language.translationXML = {};
language.currentlanguage = '';

//language Keys
language.ENGLISH = 'en';
language.SPANISH = 'es';

/* setupToggle() | Set up a button for language toggling */
language.setupToggle = function(uniqueId) {

  this.toggleBtn = $(uniqueId);
  this.toggleTxt = $(this.toggleBtn).find('h3');

  //use language button to switch between english and spandish
  var _this = this;
  $(this.toggleBtn).on('click', function() {
    if (language.getCurrentlanguage() == language.ENGLISH) {
      $(_this.toggleTxt).html('English');
      language.setLanguage(language.SPANISH);
    } else {
      $(_this.toggleTxt).html('Español');
      language.setLanguage(language.ENGLISH);
    }

  });

};

/* setupTranslations() | Accepts xml to be searched. */
language.setupTranslations = function(xml) {

  language.translationXML = xml;

  //Default to english
  language.setLanguage(language.ENGLISH);

};

/* setLanguage() | Find and replace all text by translation ids */
language.setLanguage = function(languageId) {

  language.currentlanguage = languageId;

  //Find all swappable language
  $('#wrapper').find('p,h1,h2,h3,span').each(function() {

    var translationText = '';

    //Filter-id (optional) used to narrow translation search
    var filterId = $(this).attr('data-filter-id');

    //Retrieve translation text from translation xml
    if (filterId != undefined && filterId != '') {

      //Filtered
      translationText = language.getTranslation($(this).attr('id'), $(language.translationXML).find("[id='" + filterId + "']"));

    } else {

      //Unfiltered (search entire xml)
      translationText = language.getTranslation($(this).attr('id'), language.translationXML);

    }

    //Apply to html
    if (translationText != '') $(this).html(translationText);

  });

};

/* getTranslationById() | Find specific translation text in XML. */
language.getTranslation = function(translationId, fromConfig) {

  var translationText = $(fromConfig).find('text[id="' + translationId + '"]').children(language.currentlanguage).first().text();
  return translationText;

};

/* getCurrentlanguage() | Return the current displayed language key. */
language.getCurrentlanguage = function() {

  return language.currentlanguage;

};

export default language;
