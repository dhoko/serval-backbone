// http://backbonejs.org/#View
(function(win, doc, App){

  /**
   * Root View
   * @type {object}
   */
  App.Views.RootIndex = Backbone.View.extend({

    el: '#wrapper',

    template: tpl('root'),

    events: {
    },

    initialize: function() {
    },

    render: function() {
      this.$el.html(this.template({name: "Gloups"}));

      return this;
    }
  });


})(window, window.document, window.app || (window.app = {}));
