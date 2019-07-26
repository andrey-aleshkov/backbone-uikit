define([
  'jquery',
  'underscore',
  'backbone',
  './UIView',
  './ThumbView'
], function($, _, Backbone,
            UIView,
            ThumbView
) {
  // UISlider
  return UIView.extend({
    className: 'ui-view ui-slider',

    trackView: null,
    selectedTrackView: null,
    minThumbView: null,
    maxThumbView: null,
    thumbView: null,
    thumbWidth: null,
    moving: '', // min | max

    minValue: 0,
    maxValue: 1,
    fromValue: null,
    untilValue: null,

    // full range
    startShift: 0,
    endShift: 0,
    // selected part of the range
    fromShift: null,
    untilShift: null,
    oldFromShift: null,
    oldUntilShift: null,

    minRange: 0, // in hours
    absMinRange: 0, // minRange in pixels

    events: {
      touchstart: 'touchstartHandler',
      touchend: 'touchendHandler',
      // mouseleave: 'mouseleaveHandler',
      swipemove: 'gestureHandler'
    },

    initialize: function(options) {
      UIView.prototype.initialize.apply(this, [options]);
      this.delegateEvents();

      if (this.fromShift === null) {
        this.fromShift =  this.startShift;
      }
      if (this.untilShift === null) {
        this.untilShift =  this.endShift;
      }

      this.fromValue = (this.fromShift - this.startShift) / (this.endShift - this.startShift);
      this.untilValue = (this.untilShift - this.startShift) / (this.endShift - this.startShift);
      // console.log(`this.fromValue = ${this.fromValue}, this.untilValue =  ${this.untilValue}`);
    },

    render: function() {
      this.$el.empty();

      this.trackView = new UIView({
        class: 'track-view'
      });
      this.addSubview(this.trackView);

      this.selectedTrackView = new UIView({
        class: 'selected-track-view'
      });
      this.addSubview(this.selectedTrackView, this.trackView.$el);

      this.minThumbView = new ThumbView();
      this.addSubview(this.minThumbView);

      this.maxThumbView = new ThumbView();
      this.addSubview(this.maxThumbView);

      setTimeout(() => {
        this.layout(0);
      }, 0);

      return this;
    },

    layout: function() {
      var trackViewRect = this.trackView.$el[0].getBoundingClientRect();
      var thumbViewRect = this.minThumbView.$el[0].getBoundingClientRect();

      console.log('this.trackView.$el[0] = ', this.trackView.$el[0]);
      console.log('this.minThumbView.$el[0] = ', this.minThumbView.$el[0]);

      console.log('trackViewRect = ', trackViewRect);
      console.log('thumbViewRect = ', thumbViewRect);

      this.rect = trackViewRect;

      this.trackWidth = trackViewRect.width;
      this.thumbWidth = thumbViewRect.width;
      this.absMinRange = this.minRange * (this.trackWidth - this.thumbWidth) / (this.endShift - this.startShift);

      console.log(`this.trackWidth: ${this.trackWidth}, this.thumbWidth: ${this.thumbWidth}, this.absMinRange = ${this.absMinRange}`);

      this.minThumbView.x = (this.trackWidth - this.thumbWidth) * this.fromValue;
      this.maxThumbView.x = (this.trackWidth - this.thumbWidth) * this.untilValue;

      this.minThumbView.minX = this.trackWidth * this.minValue; // const
      this.minThumbView.maxX = this.maxThumbView.x - this.absMinRange;

      this.maxThumbView.minX = this.minThumbView.x + this.absMinRange;
      this.maxThumbView.maxX = this.trackWidth * this.maxValue - this.thumbWidth; // const

      console.log(`this.minThumbView.minX: ${this.minThumbView.minX}, this.minThumbView.x: ${this.minThumbView.x}, this.minThumbView.maxX = ${this.minThumbView.maxX}`);
      console.log(`this.maxThumbView.minX: ${this.maxThumbView.minX}, this.maxThumbView.x: ${this.maxThumbView.x}, this.maxThumbView.maxX = ${this.maxThumbView.maxX}`);

      this.minThumbView.place();
      this.maxThumbView.place();

      this.selectedTrackViewPlace();
    },

    selectedTrackViewPlace: function() {
      this.selectedTrackView.$el.attr('style', `transform: translate3d(${this.minThumbView.x + this.thumbWidth / 2}px,0px,0px) scale3d(${(this.maxThumbView.x - this.minThumbView.x) / this.trackWidth},1,1);`);
    },

    touchstartHandler: function(event) {
      // console.log('RangeView::touchstartHandler');

      if (event.target === this.minThumbView.$el[0]) {
        this.thumbView = this.minThumbView;
        this.moving = 'min';
      } else if (event.target === this.maxThumbView.$el[0]) {
        this.thumbView = this.maxThumbView;
        this.moving = 'max';
      }

      if (this.thumbView) {
        this.thumbView.select();

        // TODO: touchend
        $(document).on('mouseup', () => {
          this.touchendHandler();
        });
      }
    },

    touchendHandler: function() {
      // console.log('RangeView::touchendHandler');

      if (this.thumbView) {
        this.thumbView.deselect();
        this.thumbView = null;
        this.moving = '';

        // TODO: touchend
        $(document).off('mouseup');

        this.endHandler();
      }
    },

    mouseleaveHandler: function() {
      console.log('RangeView::mouseleaveHandler');
      //this.thumbView = null;
      //this.moving = '';
    },

    gestureHandler: function(event, obj) {
      console.log('RangeView::gestureHandler');
      var description;
      var curMousePosition;
      var minValue;
      var maxValue;
      var fromShift;
      var untilShift;

      event.preventDefault();
      obj.originalEvent.preventDefault();

      if (this.thumbView) {
        description = obj.description.split(':'); // 'swipemove:1:left:up' => ['swipemove','1','left','up']

        switch (description[0]) {
          case  'swipemove':
            if (description[1] === '1') {
              // console.log('swipemove, obj = ', obj);
              curMousePosition = obj.originalEvent.clientX - this.rect.left;

              let newThumbViewX = curMousePosition - this.thumbWidth / 2;
              if (newThumbViewX < this.thumbView.minX) {
                this.thumbView.x = this.thumbView.minX;
              } else if (newThumbViewX > this.thumbView.maxX) {
                this.thumbView.x = this.thumbView.maxX;
              } else {
                this.thumbView.x = newThumbViewX;
              }
            }
            break;
          default:
        }

        // console.log(`${this.thumbView.minX} < ${curMousePosition} > ${this.thumbView.maxX + this.thumbWidth} `);

        this.thumbView.place();
        // move another
        if (this.moving === 'min') {
          // min is moving
          this.maxThumbView.minX = this.thumbView.x + this.absMinRange;
        } else {
          // max is moving
          this.minThumbView.maxX = this.thumbView.x - this.absMinRange;
        }
        this.selectedTrackViewPlace();

        minValue = this.minThumbView.x / (this.trackWidth - this.thumbWidth);
        maxValue = this.maxThumbView.x / (this.trackWidth - this.thumbWidth);

        // console.log(`minValue = ${minValue}, maxValue =  ${maxValue}`);

        fromShift = minValue * (this.endShift - this.startShift) + this.startShift;
        untilShift = maxValue * (this.endShift - this.startShift) + this.startShift;

        if (fromShift < this.startShift) {
          fromShift = this.startShift;
        }
        if (untilShift > this.endShift) {
          untilShift = this.endShift;
        }

        // round
        fromShift = Math.round(fromShift);
        untilShift = Math.round(untilShift);
        // console.log(`${fromShift} : ${untilShift}`);

        if (fromShift !== this.oldFromShift || untilShift !== this.oldUntilShift) {
          this.fromShift = fromShift;
          this.untilShift = untilShift;
          this.oldFromShift = this.fromShift;
          this.oldUntilShift = this.untilShift;
          this.changeHandler(this.fromShift, this.untilShift);
        }
      }
    },

    changeHandler: function() {},

    endHandler: function() {}
  });
});
