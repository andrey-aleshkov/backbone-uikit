define([
  'jquery',
  'underscore',
  'backbone',
  '../uikit/UIView',
  'MainView'

], function($, _, Backbone,
            UIView,
            MainView
) {
  var AppView = UIView.extend({
    el: 'body',
    render: function() {
      this.$el.empty();
      this.addSubview(new MainView());
      return this;
    }
  });

  return new AppView();
});
