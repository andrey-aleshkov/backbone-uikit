define([
    "jquery",
    "underscore",
    "backbone",
    "./UIView"
], function($, _, Backbone, UIView) {

    // UIModalView
    return function (contentView) {

        var UIModalView = UIView.extend({
                className: "ui-modal-view",

                contentView: null,

                render: function () {
                    //console.log("UIModalView::render");

                    this.$el.empty();
                    this.$el.html(this.template);

                    if (this.contentView) {
                        this.addSubview(this.contentView);
                    } else {
                        console.error('contentView is needed')
                    }

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