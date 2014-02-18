/**
 * This is where all begins
 */
(function(win, doc, App){

    var wrap = document.getElementById('wrapper');
        wrap.style.width     = window.innerWidth + "px";
        wrap.style.maxWidth  = window.innerWidth + "px";
        wrap.style.height    = window.innerHeight + "px";
        wrap.style.maxHeight = window.innerHeight + "px";


    var $doc = $(doc);

    $doc.ready(function() {
        App.Routers.Instances.router = new App.Routers.Router();
        Backbone.history.start();
    });

})(window, window.document, window.app || (window.app = {}));

