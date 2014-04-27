/**
 * This is where all begins
 */
(function init(win, doc, App){

  $(doc).ready(function() {
    win.i18nLoader(function loadI18n() {
      App.Routers.Instances.router = new App.Routers.Router();
      Backbone.history.start();
    });
  });

})(window, window.document, window.app || (window.app = {}));

