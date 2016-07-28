define([
    "jquery",
    "underscore",
    "backbone",
    "../uikit/UIView",
    "MainView"

], function($, _, Backbone,
            UIView,
            MainView
){

    var AppView = UIView.extend({
        el: "body",
        render: function() {
            console.log("AppView::render");
            this.$el.empty();

            var mainView = new MainView();
            this.addSubview(mainView);

            return this;
        }
    });

    return new AppView();

});
