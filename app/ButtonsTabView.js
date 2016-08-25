define([
    "jquery",
    "underscore",
    "backbone",
    // ui
    "../uikit/UIView",
    "../uikit/UINavigationBar",
    "../uikit/UIButton",
    "../uikit/UILabel"

], function($, _, Backbone,
            // ui
            UIView,
            UINavigationBar,
            UIButton,
            UILabel
){
    // ButtonsTabView
    return UIView.extend({
        id: "buttons-tab-view",

        render: function() {
            var backBtn;

            this.$el.empty();

            // Buttons
            this.addSubview(new UIButton({
                label: "Back",
                icon: 'arrow-left',
                class: 'test-01-btn'
            }));

            this.addSubview(new UIButton({
                label: "Back",
                icon: 'arrow-left',
                iconOrder: 1,
                class: 'test-02-btn'
            }));

            this.addSubview(new UIButton({
                label: "Back",
                icon: 'arrow-left',
                class: 'test-03-btn',
                align: 'left'
            }));

            this.addSubview(new UIButton({
                label: "Back",
                icon: 'arrow-left',
                class: 'test-04-btn',
                align: 'right'
            }));

            this.addSubview(new UIButton({
                label: "Back",
                icon: 'arrow-left',
                class: 'test-05-btn',
                align: 'justify'
            }));

            // NavigationBar
            backBtn = new UIButton({
                label: "Back",
                icon: 'arrow-left',
                action: function() {
                    console.log("backBtn");
                }
            });

            var uiNavigationBar = new UINavigationBar({
                leftBarItems: [backBtn],
                centerBarItems: [new UILabel({text: this.title})],
                rightBarItems: []
            });
            this.addSubview(uiNavigationBar);

            return this;
        }

    });
});
