define([
    "jquery",
    "underscore",
    "backbone",
    "./UIView"
], function($, _, Backbone, UIView){

    // UIButton
    return UIView.extend({
        className: "ui-btn",
        template: _.template('<span class="btn-text"><%= label %></span>'),
        templateIcon: _.template('<span class="btn-icon <%= icon %>"></span><span class="btn-text"><%= label %></span>'),

        action: null,

        label: "",
        icon: null,

        events: {
            "tapone": "taponeHandler",

            "touchstart": "touchstartHandler",
            "touchend": "touchendHandler",
            "swipemove": "swipemoveHandler"
        },

        render: function() {
            //console.log("UIButton::render");
            this.$el.empty();

            // set class
            this.setClass(this.class);

            // apply label
            var json = {};
            json.label = this.label;

            if (this.icon) {
                json.icon = this.icon;
                this.$el.html(this.templateIcon(json));
            } else {
                this.$el.html(this.template(json));
            }

            // apply disabled
            if (this.disabled) {
                this.$el.addClass("ui-dis");
            }
            // apply hidden
            if (this.hidden) {
                this.$el.addClass("ui-hid");
            }

            return this;
        },

        setLabel: function(newLabel) {
            this.label = newLabel;
            // redraw
            //this.render();
            $("a", this.$el).html(this.label);
        },

        taponeHandler: function(event) {
            //console.log("UIButton::taponeHandler");

            if (this.action && this.disabled == false) {
                this.action();
                //event.stopPropagation();
            } else {
                console.log("disabled or there is no action");
            }
        }

    });

});