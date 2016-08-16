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

    // UIConfirmView
    return function (title, message) {

        var UIConfirmView = UIView.extend({
                className: "ui-confirm-view",
                template: `
                    <div class="ui-confirm-content">
                        <div class="text-place"></div>
                        <div class="buttons-place"></div>
                    </div>`
                ,

                title: '',
                message: '',

                render: function() {
                    //console.log("UIConfirmView::render");
                    var thisView = this,
                        $textPlace,
                        $buttonsPlace;

                    this.$el.empty();
                    this.$el.html(this.template);

                    $textPlace = $('.text-place', this.$el);
                    $buttonsPlace = $('.buttons-place', this.$el);

                    this.addSubview(new UILabel({
                        class: 'confirm-title-label',
                        text: this.title
                    }), $textPlace);

                    this.addSubview(new UILabel({
                        class: 'confirm-message-label',
                        text: this.message
                    }), $textPlace);

                    this.addSubview(new UIButton({
                        class: 'confirm-cancel-btn',
                        label: 'Cancel',
                        action: function () {
                            thisView.hide();
                        }
                    }), $buttonsPlace);

                    this.addSubview(new UIButton({
                        class: 'confirm-ok-btn',
                        label: 'OK',
                        action: function () {
                            thisView.hide();
                        }
                    }), $buttonsPlace);

                    return this;
                },

                show: function () {
                    //console.log("UIConfirmView::show");
                    $('body').append(this.render().el);
                },

                hide: function () {
                    //console.log("UIConfirmView::hide");
                    this.destroy();
                }
            }),
            confirmView = new UIConfirmView({
                title: title,
                message: message
            });

        confirmView.show();

    }

});