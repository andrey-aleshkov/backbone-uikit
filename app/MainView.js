define([
    "jquery",
    "underscore",
    "backbone",
    "../uikit/UIView",
    "../uikit/UITabBar",
    'ButtonsTabView',
    "FormsTabView",
    "ModalsTabView",
    "MiscTabView"

], function($, _, Backbone,
            UIView,
            UITabBar,
            ButtonsTabView,
            FormsTabView,
            ModalsTabView,
            MiscTabView
){

    return UIView.extend({
        id: "main-view",

        render: function() {
            console.log("MainView::render");
            this.$el.empty();

            var buttonsTabView = new ButtonsTabView({
                title: "Buttons",
                icon: "settings"
            });
            var formsTabView = new FormsTabView({
                title: "Forms",
                icon: "settings"
            });
            var modalsTabView = new ModalsTabView({
                title: "Modals",
                icon: "settings"
            });
            var miscTabView = new MiscTabView({
                title: "Misc",
                icon: "settings"
            });

            this.addSubview(buttonsTabView);
            this.addSubview(formsTabView);
            this.addSubview(modalsTabView);
            this.addSubview(miscTabView);

            // UITabBar
            this.tabBar = new UITabBar({
                selectedIndex: 0
            });
            this.addTabBar(this.tabBar);

            return this;
        }

    });
});
