(function(win, doc, App){

  App.Models = {};
  App.Models.Instances = {};
  App.Collections = {};
  App.Collections.Instances = {};
  App.Views = {};
  App.Views.Instances = {};
  App.Routers = {};
  App.Routers.Instances = {};
  App.Events = {};

  win.tpl = function(view) {
    return _.template(document.getElementById(view + '-viewtpl').innerHTML);
  }

})(window, window.document, window.app || (window.app = {}));
