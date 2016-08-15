define([
    "jquery",
    "underscore",
    "backbone",

    "../uikit/UIView",
    "../uikit/UIButton",
    "../uikit/UILabel",
    "../uikit/UITextField",
    "../uikit/UITextView"

], function($, _, Backbone,
            UIView,
            UIButton,
            UILabel,
            UITextField,
            UITextView
){
    // InModalView
    return UIView.extend({
        className: "in-modal-view",

        render: function() {
            console.log("FirstTabView::InModalView");

            var thisView = this;

            this.$el.empty();

            this.addSubview(new UIButton({
                label: "Close",
                class: 'in-modal-button',
                action: function () {
                    console.log('in-modal-button');

                    thisView.superview.hide();
                }
            }));

            return this;
        }

    });
});
