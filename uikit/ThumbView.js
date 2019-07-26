define([
  'jquery',
  'underscore',
  'backbone',
  './UIView'
], function($, _, Backbone,
            UIView
) {
  // ThumbView
  return UIView.extend({
    className: 'ui-view thumb-view',
    minX: 0,
    x: 0,
    maxX: 0,

    render: function() {
      this.$el.empty();
      return this;
    },

    test: function() {
      if (this.x > this.maxX) {
        this.x = this.maxX;
      } else if (this.x < this.minX) {
        this.x = this.minX;
      }
    },

    place: function() {
      this.test();
      this.$el.attr('style', `transform: translate3d(${this.x}px,0px,0px);`);
    }
  });
});
