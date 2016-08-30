define([
  'jquery',
  'underscore',
  'backbone',
  './UIView'
], function($, _, Backbone,
            UIView
) {
  // UINavigationBar
  return UIView.extend({
    className: 'ui-view ui-navigation-bar',
    template: `
      <div class="left-place"></div>
      <div class="center-place"></div>
      <div class="right-place"></div>`,
    leftBarItems: null,
    centerBarItems: null,
    rightBarItems: null,
    events: {
      'touchstart': 'touchstartHandler',
      'touchend': 'touchendHandler',
      'tapone': 'taponeHandler',
      'swipemove': 'swipemoveHandler'
    },

    render: function() {
      var thisView = this;
      var $leftPlace;
      var $centerPlace;
      var $rightPlace;

      this.$el.empty();
      this.$el.html(this.template);

      $leftPlace = this.$el.find('.left-place');
      $centerPlace = this.$el.find('.center-place');
      $rightPlace = this.$el.find('.right-place');

      _.each(this.leftBarItems, function(item) {
        thisView.addSubview(item, $leftPlace);
      });
      _.each(this.centerBarItems, function(item) {
        thisView.addSubview(item, $centerPlace);
      });
      _.each(this.rightBarItems, function(item) {
        thisView.addSubview(item, $rightPlace);
      });

      return this;
    }
  });
});
