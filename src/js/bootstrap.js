(function(win, doc, App){

    "use strict";

    App.Models = {};
    App.Models.Instances = {};
    App.Collections = {};
    App.Collections.Instances = {};
    App.Views = {};
    App.Views.Instances = {};
    App.Routers = {};
    App.Routers.Instances = {};
    App.Events = {};
    App.Languages = {};
    App.Languages.Instances = {};
    App.Languages.available = [];


    // Display App's debug if it's 1, 0 to hide them
    win.VERBOSE = 1;

    // Custom template for lodash with {{}}
    _.templateSettings = {
      evaluate: /{{([\s\S]+?)}}/g,
      interpolate: /{{=([\s\S]+?)}}/g,
      escape: /{{-([\s\S]+?)}}/g
    };

    /**
     * Find our template inside the application
     * @param  {String} view Your partial name
     * @return {Object}      Your view for backbone. Parse by lodash
     * @throws {Error} If The application cannot find the requested view
     */
    win.tpl = function tpl(view) {
      var $view = document.getElementById(view.toLowerCase() + '-viewtpl');
      if(!$view) {
        throw new Error('Cannot find the requested view : ' + view);
      }
      return _.template($view.innerHTML);
    };

    /**
     * Helper to open a page
     * It sends log informations to the driver
     * @param  {String} page  Page name
     * @return {void}
     */
    win.openPage = function openPage(page) {
      var _page = page || 'root';
      console.debug("[App@openPage] : Open the page - " + _page);
      App.Routers.Instances.router.navigate(page,{trigger: true});
    };

    /**
     * Navigate back in the future
     * @param  {Integer} howMany
     * @return {void}
     */
    win.back = function back(howMany) {
        Backbone.history.history.go(-howMany);
    };

    // Remove the App's debug message
    if(!win.VERBOSE) {
      console.debug = function(){};
    }

    // Return the value for a field inside the form
    win.findByKey = function findByKey(o,key) {
      var field = _.findWhere(o,{name:key });
      return (field) ? field.value : "";
    };

    /**
     * It loads the i18n inside the application
     * Your file have to be inside a directory i18n
     * @param  {Function} cb Callback to execute when we have loaded the translation
     * @return {void}
     */
    win.i18nLoader = function i18nLoader(cb) {

      $.getJSON("../i18n/languages.json", function getI18n(json) {

        // Look for each translations
        var keys = Object.keys(json || {});

        if(!keys.length) {
          throw new Error('Empty languages file, no translation found');
        }

        var current = keys[0];
        console.debug('[App@i18nLoader] : i18n JSON is loaded', keys);

        // Load each languages to Languages instances
        for(var lang in json) {
          App.Languages.Instances[lang] = json[lang];
          App.Languages.available.push(lang);
        }

        console.debug('[App@i18nLoader] : Default language loaded - ' +  current);
        App.Languages.current = current;
        document.documentElement.lang = current;

        cb();
      });
    };

})(window, window.document, window.app || (window.app = {}));
