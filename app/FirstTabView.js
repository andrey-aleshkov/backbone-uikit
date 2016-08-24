define([
    "jquery",
    "underscore",
    "backbone",
    // ui
    "../uikit/UIView",
    "../uikit/UINavigationBar",
    "../uikit/UIButton",
    "../uikit/UILabel",
    "../uikit/UIScrollView",
     "../uikit/UITextField",
    "../uikit/UITextView",
    "../uikit/UIStepper",

    "../uikit/alertView",
    "../uikit/confirmView",
    "../uikit/modalView",

    'InModalView'
], function($, _, Backbone,
            // ui
            UIView,
            UINavigationBar,
            UIButton,
            UILabel,
            UIScrollView,
            UITextField,
            UITextView,
            UIStepper,

            alert,
            confirm,
            modal,
            //
            InModalView
){
    // FirstTabView
    return UIView.extend({
        id: "first-tab-view",
        render: function() {
            console.log("FirstTabView::render");
            this.$el.empty();

            var // ScrollView
                woodScrollView,
                woodView,
                // NavigationBar
                backBtn,
                signInBtn,
                showModalBtn,
                showAlertBtn,
                showConfirmBtn,
                dataModel;

            // ScrollView
            woodScrollView = new UIScrollView({
                class: 'wood-scroll-view',
                maximumScale: 3,
                minimumScale: 0.1
            });
            this.addSubview(woodScrollView);

            woodView = new UIView({
                class: 'wood-view'
            });

            woodScrollView.addSubview(woodView);

            //console.log('woodScrollView.contentSize() = ', woodScrollView.contentSize());

            // form
            this.addSubview(new UITextField({
                text: '',
                placeholder: 'One line ...',
                class: 'my-text-field'
            }));

            this.addSubview(new UITextView({
                text: '',
                placeholder: 'Let us know more ...',
                class: 'my-text-view'
            }));

            dataModel = new Backbone.Model({
                number: 0
            });

            this.addSubview(new UILabel({
                model: dataModel,
                attribute: 'number'
            }));

            this.addSubview(new UIStepper({
                model: dataModel,
                attribute: 'number',
                value: 0,
                minimumValue: 0,
                maximumValue: 10
            }));

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

            signInBtn = new UIButton({
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

            showModalBtn = new UIButton({
                label: "Modal",
                action: function() {
                    console.log("modalBtn");

                    modal(new InModalView());
                }
            });

            showAlertBtn = new UIButton({
                label: "Alert",
                action: function() {
                    alert('Title', 'This is a message.');
                }
            });

            showConfirmBtn = new UIButton({
                label: "Confirm",
                action: function() {
                    confirm('Title', 'This is a message.');
                }
            });

            var uiNavigationBar = new UINavigationBar({
                leftBarItems: [backBtn],
                centerBarItems: [new UILabel({text: this.title})],
                rightBarItems: [signInBtn, showModalBtn, showAlertBtn, showConfirmBtn]
            });
            this.addSubview(uiNavigationBar);

            return this;
        }

    });
});
