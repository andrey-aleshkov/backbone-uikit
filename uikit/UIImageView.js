define([
  'jquery',
  'underscore',
  'backbone',
  './UIView'
], function($, _, Backbone,
            UIView
) {
  // UIImageView
  return UIView.extend({
    className: 'ui-image-view',
    imageUrl: null,
    frameWidth: null,
    frameHeight: null,
    imageWidth: 0,
    imageHeight: 0,
    status: null, // loaded | error
    image: null,

    initialize: function(options) {
      UIView.prototype.initialize.apply(this, [options]);
      this.image = new Image();
    },

    render: function() {
      var styleAttrLine = '';
      this.$el.empty();
      this.setClass(this.class);
      if (this.frameWidth !== null) styleAttrLine += 'width:' + this.frameWidth + '; ';
      if (this.frameHeight !== null) styleAttrLine += 'height:' + this.frameHeight + '; ';
      if (this.status === 'loaded') {
        styleAttrLine += 'background-image: url(' + this.imageUrl + ');';
      }
      styleAttrLine += 'background-size: ' + this.imageWidth + ' ' + this.imageHeight + ';';
      this.$el.attr('style', styleAttrLine);

      return this;
    },

    load: function() {
      this.beforeLoad();

      $(this.image)
        .one('load', function() {
          this.complete();
          this.success();
        })
        .one('error', function() {
          this.complete();
          this.error();
        })
        .attr('src', this.imageUrl).each(function() {
          // fail-safe for cached images which sometimes don't trigger 'load' events
          if (this.complete) {
            // cached image
            $(this).trigger('load');
          }
        });
    },

    beforeLoad: function() {
      // show indicator
    },

    complete: function() {
      // remove indicator
    },

    success: function() {
      // show the image
      this.status = 'loaded';
      this.render();
    },

    error: function() {
      // TODO: show error sign
      this.status = 'error';
      this.render();
    }
  });
});
