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
    // ModalsTabView
    return UIView.extend({
        id: "modals-tab-view",
        render: function() {
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

            // NavigationBar
            signInBtn = new UIButton({
                label: "Login",
                action: function() {
                    console.log("signInBtn");
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

            this.addSubview(new UINavigationBar({
                leftBarItems: [],
                centerBarItems: [new UILabel({text: this.title})],
                rightBarItems: [signInBtn, showModalBtn, showAlertBtn, showConfirmBtn]
            }));

            return this;
        }

    });
});
