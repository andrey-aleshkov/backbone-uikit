define([
  'jquery',
  'underscore',
  'backbone',
  './UIView'
], function($, _, Backbone,
            UIView
) {
  // UIActivityIndicatorView
  return UIView.extend({
    className: 'ui-activity-indicator-view',
    isAnimating: true,

    render: function() {
      this.$el.empty();

      if (this.isAnimating) {
        this.startAnimating();
      }
      return this;
    },

    startAnimating: function() {
      this.isAnimating = true;
      this.$el.addClass('animating');
    },

    stopAnimating: function() {
      this.isAnimating = false;
      this.$el.removeClass('animating');
    }
  });
});
