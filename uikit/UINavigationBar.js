define([
    "jquery",
    "underscore",
    "backbone",
    "./UIView"
], function($, _, Backbone, UIView){

    // UINavigationBar
    return UIView.extend({
        className: "ui-view ui-navigation-bar",

        // Rectangle
        top: 0,
        left: 0,
        width: "100%",
        height: "44px",
        backgroundColor: "rgba(255,255,255,0.85)",

        leftBarItems: null,
        centerBarItems: null,
        rightBarItems: null,

        events: {
            "touchstart": "touchstartHandler",
            "touchend": "touchendHandler",
            "tapone": "taponeHandler",
            "swipemove": "swipemoveHandler"
        },

        render: function() {
            //console.log("UINavigationBar::render");
            this.$el.empty();

            var leftHTML =
                '<div class="ui-navigation-bar--left">' +
                    '<div class="ui-navigation-bar--left-items">' +
                        // content
                    '</div>' +
                '</div>';

            var centerHTML =
                '<div class="ui-navigation-bar--center">' +
                    '<div class="ui-navigation-bar--center-items">' +
                        // content
                    '</div>' +
                '</div>';

            var rightHTML =
                '<div class="ui-navigation-bar--right">' +
                    '<div class="ui-navigation-bar--right-items">' +
                        // content
                    '</div>' +
                '</div>';

            this.$el.append(leftHTML);
            this.$el.append(centerHTML);
            this.$el.append(rightHTML);

            var jsLeft = this.$el.find('.ui-navigation-bar--left-items');
            var jsCenter = this.$el.find('.ui-navigation-bar--center-items');
            var jsRight = this.$el.find('.ui-navigation-bar--right-items');

            _.each(this.leftBarItems, function(item) {
                var gridCell = $('<div class="item"></div>');
                gridCell.append(item.render().el);
                jsLeft.append(gridCell);
            });

            _.each(this.centerBarItems, function(item) {
                var gridCell = $('<div class="item"></div>');
                gridCell.append(item.render().el);
                jsCenter.append(gridCell);
            });

            _.each(this.rightBarItems, function(item) {
                var gridCell = $('<div class="item"></div>');
                gridCell.append(item.render().el);
                jsRight.append(gridCell);
            });

            return this;
        }

    });

});