define([
    "jquery",
    "underscore",
    "backbone",

    "../uikit/UIView",
    "../uikit/UINavigationBar",
    "../uikit/UIButton",
    "../uikit/UILabel",
    "../uikit/UIActivityIndicatorView"
], function($, _, Backbone,
            UIView,
            UINavigationBar,
            UIButton,
            UILabel,
            UIActivityIndicatorView
){
    return UIView.extend({
        id: "second-tab-view",
        render: function() {
            console.log("SecondTabView::render");
            this.$el.empty();

            // NavigationBar
            var backBtn = new UIButton({
                label: "&lt; Back",
                action: function() {
                    console.log("backBtn");
                }
            });

            var createBtn = new UIButton({
                label: "Create",
                action: function() {
                    console.log("createBtn");
                }
            });

            var uiNavigationBar = new UINavigationBar({
                title: "Nav",
                icon: "settings",
                leftBarItems: [backBtn],
                centerBarItems: [new UILabel({text: this.title})],
                rightBarItems: [createBtn]
            });
            this.addSubview(uiNavigationBar);

            var uiActivityIndicatorView = new UIActivityIndicatorView({
                class: 'test'
            });
            this.addSubview(uiActivityIndicatorView);

            return this;
        }

    });
});
