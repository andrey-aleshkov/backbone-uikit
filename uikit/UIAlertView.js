define([
    "jquery",
    "underscore",
    "backbone",
    "./UIView",
    "./UIButton",
    "./UILabel"
], function($, _, Backbone,
            UIView,
            UIButton,
            UILabel
){

    // UIAlertView
    return UIView.extend({
        className: "ui-alert-view",
        template: `<div class="ui-alert-content"></div>`,

        title: '',
        message: '',

        render: function() {
            //console.log("UIAlertView::render");
            var thisView = this,
                $content;

            this.$el.empty();
            this.$el.html(this.template);

            $content = $('.ui-alert-content', this.$el);

            this.addSubview(new UILabel({
                class: 'alert-title-label',
                text: this.title
            }), $content);

            this.addSubview(new UILabel({
                class: 'alert-message-label',
                text: this.message
            }), $content);

            this.addSubview(new UIButton({
                class: 'alert-ok-btn',
                label: 'Ok',
                action: function () {
                    console.log('action');
                    thisView.hide();
                }
            }), $content);

            return this;
        },

        show: function () {
            //console.log("UIAlertView::show");
            $('body').append(this.render().el);
        },

        hide: function () {
            //console.log("UIAlertView::hide");
            this.destroy();
        }

    });

});