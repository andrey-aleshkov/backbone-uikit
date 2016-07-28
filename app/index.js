requirejs.config({
    baseUrl: "app",
    urlArgs: function(id, url) {
        return "?bust=" + (new Date()).getTime();
    },
    paths: {
        jquery: '../lib/jquery/jquery-2.1.1.min',
        underscore: '../lib/underscore/underscore-1.3.3',
        backbone: '../lib/backbone/backbone-1.1.2',
        jgestures: '../lib/jgestures/jgestures-0.90'
    },
    shim: {
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'jgestures': {
            deps: ['jquery'],
            exports: 'jGestures'
        }
    }
});

// Debug only

/*
// https://github.com/jrburke/requirejs/wiki/Internal-API:-onResourceLoad
requirejs.onResourceLoad = function(context, map, depArray) {
    //console.log("onResourceLoad", map.id);
    console.log('requirejs loads |||' , map.url);
};
*/

requirejs([
    "jquery",
    "underscore",
    "backbone",
    "domReady",
    "appView",
    "jgestures"
], function($, _, Backbone, domReady, appView) {

    domReady(function () {
        console.log("index::onReady");

        appView.render();

    });

});



