define([
    "jquery",
    "underscore",
    "backbone",
    "../uikit/UIView",
    "../uikit/UITabBar",
    "FirstTabView",
    "SecondTabView",
    'ButtonsTabView'

], function($, _, Backbone,
            UIView,
            UITabBar,
            FirstTabView,
            SecondTabView,
            ButtonsTabView
){

    return UIView.extend({
        id: "main-view",

        render: function() {
            console.log("MainView::render");
            this.$el.empty();

            var firstTabView = new FirstTabView({
                title: "First",
                icon: "orders"
            });
            this.addSubview(firstTabView);

            var secondTabView = new SecondTabView({
                title: "Second",
                icon: "settings"
            });
            this.addSubview(secondTabView);

            var buttonsTabView = new ButtonsTabView({
                title: "Buttons",
                icon: "settings"
            });
            this.addSubview(buttonsTabView);

            // UITabBar
            this.tabBar = new UITabBar({
                selectedIndex: 0
            });
            this.addTabBar(this.tabBar);

            return this;
        }

    });
});
