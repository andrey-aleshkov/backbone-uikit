define([
    "jquery",
    "underscore",
    "backbone",

    "../uikit/UIView",
    "../uikit/UINavigationBar",
    "../uikit/UIButton",
    "../uikit/UILabel",
    "../uikit/UIScrollView",
    "../uikit/UIAlertView"
], function($, _, Backbone,
            UIView,
            UINavigationBar,
            UIButton,
            UILabel,
            UIScrollView,
            UIAlertView
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
                label: "Back",
                icon: 'back',
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

            var showAlertBtn = new UIButton({
                label: "Alert",
                action: function() {
                    var alertView = new UIAlertView({
                        title: 'Title',
                        message: 'This is a message.'
                    });
                    alertView.show();
                }
            });

            var uiNavigationBar = new UINavigationBar({
                leftBarItems: [backBtn],
                centerBarItems: [new UILabel({text: this.title})],
                rightBarItems: [signInBtn, testBtn, showAlertBtn]
            });
            this.addSubview(uiNavigationBar);

            return this;
        }

    });
});
