// http://backbonejs.org/#View
(function(win, doc, App){
    "use strict";
    /**
    * Root View
    * @type {object}
    */
    App.Views.Home = App.Views.MasterView.extend({

        template: tpl('home'),

        events: {
            "click .btn-action-x" : "button"
        },

        button : function button(){
            console.log("This event is called  before we swicth to another page");
        }

    });


})(window, window.document, window.app || (window.app = {}));
