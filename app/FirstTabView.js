define([
    "jquery",
    "underscore",
    "backbone",

    "../uikit/UIView",
    "../uikit/UINavigationBar",
    "../uikit/UIButton",
    "../uikit/UILabel",
    "../uikit/UIScrollView"
], function($, _, Backbone,
            UIView,
            UINavigationBar,
            UIButton,
            UILabel,
            UIScrollView
){
    return UIView.extend({
        id: "first-tab-view",
        render: function() {
            console.log("FirstTabView::render");
            this.$el.empty();

            // ScrollView
            var woodScrollView = new UIScrollView({
                class: 'wood-scroll-view',
                maximumScale: 3,
                minimumScale: 0.1
            });
            this.addSubview(woodScrollView);

            var woodView = new UIView({
                class: 'wood-view'
            });

            woodScrollView.addSubview(woodView);

            console.log('woodScrollView.contentSize() = ', woodScrollView.contentSize());

            // NavigationBar
            var backBtn = new UIButton({
                label: "&lt; Back",
                action: function() {
                    console.log("backBtn");
                }
            });

            var signInBtn = new UIButton({
                label: "Login",
                action: function() {
                    console.log("signInBtn");

                    var scrollViewWidth = woodScrollView.size().width,
                        scrollViewContentWidth =  woodScrollView.contentSize().width;

                    console.log('scrollViewWidth = ', scrollViewWidth);
                    console.log('scrollViewContentWidth = ', scrollViewContentWidth);

                    //woodScrollView.setScaleRelativeToPoint(woodScrollView.scale - 0.05, {x: scrollViewWidth / 2, y: 100});
                    // 213 : 376
                    woodScrollView.setScaleRelativeToPoint(woodScrollView.scale - 0.15, {x: 213, y: 385});
                }
            });

            var testBtn = new UIButton({
                label: "Test",
                action: function() {
                    console.log("testBtn");
                }
            });

            var uiNavigationBar = new UINavigationBar({
                leftBarItems: [backBtn],
                centerBarItems: [new UILabel({text: this.title})],
                rightBarItems: [signInBtn, testBtn]
            });
            this.addSubview(uiNavigationBar);

            return this;
        }

    });
});
