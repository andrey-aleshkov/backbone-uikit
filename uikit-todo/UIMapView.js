define([
    "jquery",
    "underscore",
    "backbone",
    "./UIView"
], function($, _, Backbone, UIView){

    // UIMapView
    return UIView.extend({
        className: "ui-map-view",

        template: _.template('<div id="map-canvas"></div>'),
        map: null,

        width: null,
        height: null,

        // Google Map Options
        mapOptions: {
            zoom: 15,
            center: {
                lat: 55.7552,
                lng: 37.6175
            },
            zoomControl: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP // ROADMAP, SATELLITE, HYBRID, or TERRAIN
        },

        initialize: function (options) {
            //console.log("UIMapView::initialize");

            UIView.prototype.initialize.apply(this, [options]);

            this.on('render', this.activate);
        },

        render: function() {
            //console.log("UIMapView::render");

            this.$el.empty();
            this.$el.html(this.template());

            this.trigger("render");
            return this;
        },

        activate: function(){
            console.log("UIMapView::activate");
            /*
             The view works on a node not appended to the DOM, thus without size, a situation Google Map is not very fond of.
             Hackish way would be to temporarily add the element to the DOM, apply Google Maps, and then remove it from the DOM
             http://stackoverflow.com/questions/19976662/google-map-not-rendering-correctly-after-first-view-with-backbone-js
             */

            this.$el.addClass("temp");
            $("body").append(this.$el);

            var domElement = this.$('#map-canvas');
            this.map = new google.maps.Map(domElement.get(0), this.mapOptions);

            //this.$el.remove();
            //this.$el.removeClass("temp");
        }

    });

});