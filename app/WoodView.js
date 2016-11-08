define([
  'jquery',
  'underscore',
  'backbone',
  '../uikit/UIView'
], function($, _, Backbone,
            UIView
) {
  // WoodView
  return UIView.extend({
    className: 'wood-view',

    events: {
      mouseenter: 'mouseenterHandler',
      mouseover: 'mouseoverHandler',
      mouseleave: 'mouseleaveHandler',
      mousemove: 'mousemoveHandler'
    },

    mouseenterHandler: function() {
      console.log('mouseenterHandler');
    },

    mouseoverHandler: function() {
      console.log('mouseoverHandler');
    },

    mouseleaveHandler: function() {
      console.log('mouseleaveHandler');
    },

    mousemoveHandler: function() {
      console.log('mousemoveHandler');
    }
  });
});
