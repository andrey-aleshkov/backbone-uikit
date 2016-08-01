define([
    "jquery",
    "underscore",
    "backbone",
    "./UIView"
], function($, _, Backbone, UIView){

    // UISegmentedControl
    return UIView.extend({
        className: "ui-segm-control",
        template: _.template('<a href="javascript:void(0);"><%= label %></a>'),

        label: "",

        render: function() {
            //console.log("SegmentedControlView::render");
            this.$el.empty();

            // apply label
            var json = {};
            json.label = this.label;
            this.$el.html(this.template(json));
            // apply type
            this.$el.addClass(this.type).removeClass(this.oldType);
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
        }

    });

});