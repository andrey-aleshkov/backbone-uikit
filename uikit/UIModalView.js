define([
    "jquery",
    "underscore",
    "backbone",
    "./UIView",
    "./UIButton",
    "./UITextField"
], function($, _, Backbone, UIView, UIButton, UITextField) {

    // UIModalView
    return function (contentView) {

        var UIModalView = UIView.extend({
                className: "ui-modal-view",
                template: `<div class="ui-modal-content"></div>`,

                contentView: null,

                render: function () {
                    //console.log("UIModalView::render");

                    var $content;

                    this.$el.empty();
                    this.$el.html(this.template);

                    $content = $('.ui-modal-content', this.$el);

                    this.addSubview(this.contentView, $content);

                    return this;
                },

                show: function () {
                    //console.log("UIModalView::show");
                    $('body').append(this.render().el);
                },

                hide: function () {
                    //console.log("UIModalView::hide");
                    this.destroy();
                }

            }),
            modalView = new UIModalView({
                contentView: contentView
            });

        modalView.show();

    }

});