define([
  'jquery',
  'underscore',
  'backbone',
  './UIView'
], function($, _, Backbone,
            UIView
) {
  // UIScrollView
  return UIView.extend({
    className: 'ui-view ui-scroll-view',

    $content: null,

    scale: 1,
    currentScale: 1,
    maximumScale: 1000,
    minimumScale: 0.0000001,

    firstPinch: true,
    pinch: {
      x: 0,
      y: 0
    },

    translate: {
      x: 0,
      y: 0
    },

    pinchRelativeTranslate: {
      x: 0,
      y: 0
    },

    events: {
      touchstart: 'touchstartHandler',
      touchend: 'touchendHandler',
      pinch: 'gestureHandler',
      swipemove: 'gestureHandler'
    },

    render: function() {
      this.$el.empty();
      this.$el.append('<div class="scroll-content"></div>');
      this.$content = this.$el.find('.scroll-content');
      if (this.class) this.setClass(this.class);
      this.applyTransforms();
      return this;
    },

    addSubview: function(view) {
      this.$content.append(view.render().el);
      view.superview = this;
      this.subviews.push(view);
    },

    setOffset: function(translate) {
      this.translate = translate;
      this.applyTransforms();
    },

    setScale: function(scale) {
      var newScale = scale;
      if (newScale < this.minimumScale) {
        newScale = this.minimumScale;
      } else if (newScale > this.maximumScale) {
        newScale = this.maximumScale;
      }

      this.scale = newScale;
      this.currentScale = newScale;

      this.applyTransforms();
    },

    setScaleRelativeToPoint: function(scale, point) {
      var pinchRelativeTranslate = {
        x: 0,
        y: 0
      };

      // 1) calc coordinates of real origin point for the new coordinate system (point.x, point.y)
      pinchRelativeTranslate.x = this.translate.x - point.x;
      pinchRelativeTranslate.y = this.translate.y - point.y;

      // 2) calc scale
      this.currentScale = this.scale * scale;

      // 3) calc translates (x, y) to compensate scale in the new coordinate system
      this.translate.x = pinchRelativeTranslate.x * scale + point.x;
      this.translate.y = pinchRelativeTranslate.y * scale + point.y;

      this.applyTransforms();
      this.scale = this.currentScale;
    },

    contentSize: function() {
      var rect = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: 0,
        height: 0
      };

      if (this.$content) {
        rect = this.$content[0].getBoundingClientRect();
      }

      return {
        width: rect.width,
        height: rect.height
      };
    },

    applyTransforms: function() {
      var style = '';
      style += 'transform: ';
      style += 'translate3d(' + this.translate.x + 'px, ' + this.translate.y + 'px, 0px) ';
      style += 'scaleX(' + this.currentScale + ') scaleY(' + this.currentScale + ') ';
      style += ';';
      this.$content.attr('style', style);
    },

    touchstartHandler: function() {},

    touchendHandler: function() {
      this.scale = this.currentScale;
      this.firstPinch = true;
    },

    gestureHandler: function(event, obj) {
      var description;
      // swipe
      var deltaX = 0;
      var deltaY = 0;
      var scale;
      event.preventDefault();
      obj.originalEvent.preventDefault();

      description = obj.description.split(':'); // 'swipemove:1:left:up' => ['swipemove','1','left','up']

      switch (description[0]) {
        case 'pinch':
          scale = this.scale * obj.scale;
          if (scale >= this.minimumScale || scale <= this.maximumScale) {
            if (this.firstPinch) {
              // 1) (0,0) for the new coordinate system
              this.pinch.x = obj.originalEvent.layerX;
              this.pinch.y = obj.originalEvent.layerY;

              // calc coordinates of real origin point for the new coordinate system (this.pinch.x, this.pinch.y)
              this.pinchRelativeTranslate.x = this.translate.x - this.pinch.x;
              this.pinchRelativeTranslate.y = this.translate.y - this.pinch.y;
            }

            this.firstPinch = false;

            // 2) calc scale
            this.currentScale = this.scale * obj.scale;

            // 3) calc translates (x, y) to compensate scale in the new coordinate system

            this.translate.x = this.pinchRelativeTranslate.x * obj.scale + this.pinch.x;
            this.translate.y = this.pinchRelativeTranslate.y * obj.scale + this.pinch.y;
          }

          // '-webkit-transform','scale('+ ( obj.direction * obj.delta[0].moved ) +')');
          break;
        case  'rotate':
          // '-webkit-transform','rotate('+ ( obj.delta[0].moved ) +'deg)');
          break;

        case  'swipemove':
          // handle swipemove only with 1 finger
          if (description[1] === 1) {
            deltaX = obj.delta[0].startX;
            deltaY = obj.delta[0].startY;

            this.translate.x = deltaX + this.translate.x;
            this.translate.y = deltaY + this.translate.y;

            // this.firstPinch = true;

            // css('left')) + obj.delta[0].startX );
            // css('top')) + obj.delta[0].startY );
            // $(obj.originalEvent.currentTarget).data('moving',true)
          }
          break;

        case 'swipe' :
          // if(_a[1] != 1 || jQuery(obj.originalEvent.currentTarget).data('moving') } {break;}
          // css('left', parseInt(jQuery(obj.originalEvent.currentTarget).css('left')) + obj.delta[0].startX );
          // css('top', parseInt(jQuery(obj.originalEvent.currentTarget).css('top')) + obj.delta[0].startY );
          break;
        default:
      }

      this.applyTransforms();
    }
  });
});
