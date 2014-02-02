// http://backbonejs.org/#View
(function(win, doc, App){

  /**
   * Root View
   * @type {object}
   */
  App.Views.HomeIndex = Backbone.View.extend({

    el: '#wrapper',

    template: tpl('home'),

    events: {
    },

    initialize: function() {
    },

    render: function() {
      this.$el.html(this.template);

      return this;
    }
  });


})(window, window.document, window.app || (window.app = {}));
