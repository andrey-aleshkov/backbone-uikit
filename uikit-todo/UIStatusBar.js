define([
    "jquery",
    "underscore",
    "backbone",
    "./UIView"
], function($, _, Backbone, UIView) {

    // UIStatusBar
    return UIView.extend({
        className: "ui-status-bar",

        render: function() {
            //console.log("UIStatusBar::render");
            this.$el.empty();

            // set class
            if (this.class) {
                this.setClass(this.class);
            }

            return this;
        }

    });

});
