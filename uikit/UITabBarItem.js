define([
    "jquery",
    "underscore",
    "backbone",
    "./UIView"
], function($, _, Backbone, UIView){

    // UITabBarItem
    return UIView.extend({
        className: "ui-tab-bar-item",
        template: _.template('<span class="tab-bar-item-icon icon-<%= icon %>"></span><span class="tab-bar-item-text"><%= title %></span>'),

        events: {
            "tapone": "taponeHandler"
        },

        icon: "",
        title: "",
        index: null,

        selected: false,

        render: function() {
            //console.log("UITabBarItem::render");
            this.$el.empty();

            var json = {};
            json.icon = this.icon;
            json.title = this.title;
            this.$el.html(this.template(json));

            return this;
        },

        taponeHandler: function() {
            console.log("UITabBarItem::action");
            this.superview.selectItem(this.index);
        },

        select: function() {
            //console.log("UITabBarItem::select");
            this.$el.addClass("selected");
        },

        deselect: function() {
            //console.log("UITabBarItem::deselect");
            this.$el.removeClass("selected");
        }

    });

});
