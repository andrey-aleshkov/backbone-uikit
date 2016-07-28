define([
    "jquery",
    "underscore",
    "backbone",
    "../uikit/UIView",
    "../uikit/UITabBar",
    "FirstTabView",
    "SecondTabView"

], function($, _, Backbone,
            UIView,
            UITabBar,
            FirstTabView,
            SecondTabView
){

    return UIView.extend({
        id: "main-view",

        render: function() {
            console.log("MainView::render");
            this.$el.empty();

            var firstTabView = new FirstTabView({
                title: "First",
                icon: "settings"
            });
            this.addSubview(firstTabView);

            var secondTabView = new SecondTabView({
                title: "Second",
                icon: "settings"
            });
            this.addSubview(secondTabView);

            // UITabBar
            this.tabBar = new UITabBar({
                selectedIndex: 0
            });
            this.addTabBar(this.tabBar);

            return this;
        }

    });
});
