define([
    "jquery",
    "underscore",
    "backbone",
    "./UIView"
], function($, _, Backbone, UIView){

    // UIButton
    return UIView.extend({
        className: "ui-btn",
        template: `<span class="btn-icon"></span><span class="btn-label"></span>`,
        $icon: null,
        $label: null,

        action: null,

        label: '',
        icon: '',
        iconOrder: 0,
        align: 'center', // center | justify | left | right

        events: {
            "tapone": "taponeHandler",

            "touchstart": "touchstartHandler",
            "touchend": "touchendHandler",
            "swipemove": "swipemoveHandler"
        },

        render: function() {
            //console.log("UIButton::render");
            this.$el.empty();
            this.$el.html(this.template);

            this.$icon = $('.btn-icon', this.$el);
            this.$label = $('.btn-label', this.$el);

            // label
            if (this.label) {
                this.$label.html(this.label);
            }

            // icon
            if (this.icon) {
                this.$icon.addClass('icon--' + this.icon);
            }

            // icon order
            if (this.iconOrder) {
                this.$icon.addClass('btn-icon--order');
            }

            // align
            if (this.align != 'center') {
                this.$el.addClass('ui-btn--align-' + this.align);
            }

            // class
            this.$el.addClass(this.class);

            // apply disabled
            if (this.disabled) {
                this.$el.addClass('ui-dis');
            }
            // apply hidden
            if (this.hidden) {
                this.$el.addClass('ui-hid');
            }

            return this;
        },

        setLabel: function(newLabel) {
            this.label = newLabel;
            this.$label.html(this.label);
        },

        setIcon: function (newIcon) {
            this.icon = newIcon;
            this.$icon.addClass('icon--' + newIcon);
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