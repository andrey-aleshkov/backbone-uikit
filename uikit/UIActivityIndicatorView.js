define([
    "jquery",
    "underscore",
    "backbone",
    "./UIView"
], function($, _, Backbone, UIView){

    // UIActivityIndicatorView
    return UIView.extend({
        className: "ui-activity-indicator-view",

        isAnimating: true,

        render: function() {
            //console.log("UIActivityIndicatorView::render");
            this.$el.empty();

            if (this.isAnimating) {
                this.startAnimating();
            }

            return this;
        },

        startAnimating: function() {
            //console.log("UIActivityIndicatorView::render");

            this.isAnimating = true;
            this.$el.addClass('animating');
        },

        stopAnimating: function() {
            //console.log("UIActivityIndicatorView::render");

            this.isAnimating = false;
            this.$el.removeClass('animating');
        }


});

});