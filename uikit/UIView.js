define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone) {
  // UIView
  return Backbone.View.extend({
    className: 'ui-view',
    animation: null,
    title: '',
    icon: '',
    class: '',
    oldClass: '',
    name: '',
    oldName: '',
    disabled: false,
    hidden: false,
    selected: false,
    superview: null,
    subviews: null,
    items: null,
    userInteractionEnabled: false,
    events: {},

    initialize: function(options) {
      var events = {};
      var eventСounter = 0;
      var isTouchSupported = 'ontouchend' in document;
      var key;

      this.subviews = [];

      // copy all the fields
      if (options) {
        for (key in options) {
          if (options.hasOwnProperty(key)) {
            this[key] = options[key];
          }
        }
      }

      // convert target events.
      for (key in this.events) {
        if (this.events.hasOwnProperty(key)) {
          switch (key) {
            case 'touchstart':
              if (!isTouchSupported) {
                // convert
                events.mousedown = this.events[key];
              } else {
                // just copy
                events.touchstart = this.events[key];
              }
              eventСounter++;
              break;
            case 'touchend':
              if (!isTouchSupported) {
                // convert
                events.mouseup = this.events[key];
              } else {
                // just copy
                events.touchend = this.events[key];
              }
              eventСounter++;
              break;
            case 'mousedown':
              if (isTouchSupported) {
                // convert
                events.touchstart = this.events[key];
              } else {
                // just copy
                events.mousedown = this.events[key];
              }
              eventСounter++;
              break;
            case 'mouseup':
              if (isTouchSupported) {
                // convert
                events.touchend = this.events[key];
              } else {
                // just copy
                events.mouseup = this.events[key];
              }
              eventСounter++;
              break;
            case 'swipemove':
            case 'pinch':
            case 'tapone':
            case 'mouseenter':
            case 'mouseover':
            case 'mouseleave':
            case 'mousemove':
            case 'mouseout':
              // just copy
              events[key] = this.events[key];
              eventСounter++;
              break;
            default:
              console.error('UIView: Sorry, unknown event name');
          }
        }
      }

      if (eventСounter) {
        this.events = events;
        this.userInteractionEnabled = true;
      }
      this.delegateEvents();

      // Animations
      if (this.animation && this.animation.keyframes) {
        // copy '0%' to 'current%'
        this.animation.keyframes.current = JSON.parse(JSON.stringify(this.animation.keyframes['0%']));
      }
      /*
       if (this.animation && this.animation.keyframes) {
       this.animation.keyframes.current = {
       transform: {
       // translate3d(x,y,z)
       translate: {
       x: 0,
       y: 0,
       z: 0
       },
       // scale3d(x,y,z)
       scale: {
       x: 1, //
       y: 1, //
       z: 1 //
       },
       // rotate3d(x,y,z,angle)
       rotate: {
       x: 0,
       y: 0,
       z: 0
       }
       },
       // opacity
       opacity: 1
       };
       }
       */

      _.bindAll.apply(_, [this].concat(_.functions(this)));

      this.$el.on('webkitTransitionEnd', this.transitionEndHandler);
    },

    transitionEndHandler: function(event) {
      event.stopPropagation();
    },

    destroy: function() {
      // v1
      /*
       // COMPLETELY UNBIND THE VIEW
       this.undelegateEvents();

       this.$el.removeData().unbind();

       // Removes a view and its el from the DOM, and calls stopListening to remove any bound events that the view has listenTo'd.
       this.remove();
       Backbone.View.prototype.remove.call(this);
       */

      // v2
      this.remove();
      this.unbind();

      _.each(this.subviews, function(subview) {
        if (subview.destroy) {
          subview.destroy();
        }
      });
    },

    render: function() {
      this.$el.empty();

      // animate
      // this.calculateAnimatedStyles(0);
      // this.applyAnimatedStyles(false);

      // name
      if (this.name) this.setName(this.name);

      // class
      if (this.class) this.setClass(this.class);

      // TODO: Think about it
      // items -> subviews
      this.addItems();

      return this;
    },

    size: function() {
      var rect = this.$el[0].getBoundingClientRect();
      return {
        width: rect.width,
        height: rect.height
      };
    },

    /*
     Event handlers for touch events
     */

    touchstartHandler: function(event) {
      event.preventDefault();
      if (this.userInteractionEnabled && !this.disabled) {
        // event.stopPropagation();
        this.select();
      }
    },

    touchendHandler: function(event) {
      event.preventDefault();
      if (this.userInteractionEnabled && !this.disabled) {
        // event.stopPropagation();
        this.deselect();
      }
    },

    taponeHandler: function(event) {
      if (this.userInteractionEnabled && !this.disabled) {
        event.stopPropagation();
      }
    },

    swipemoveHandler: function(event) {
      if (this.userInteractionEnabled && !this.disabled) {
        event.stopPropagation();
      }
    },

    setName: function(newName) {
      // save old class
      this.oldName = this.name;
      // save new one
      this.name = newName;
      this.$el.removeClass(this.oldName).addClass(this.name);
    },

    setClass: function(newClass) {
      // save old class
      this.oldClass = this.class;
      // save new one
      this.class = newClass;
      // redraw
      // this.render();
      // NB!: this order is crucial.
      this.$el.removeClass(this.oldClass).addClass(this.class);
    },

    disable: function() {
      this.disabled = true;
      // redraw
      this.$el.addClass('ui-dis');
    },

    enable: function() {
      this.disabled = false;
      // redraw
      this.$el.removeClass('ui-dis');
    },

    hide: function() {
      this.hidden = true;
      this.$el.addClass('ui-hid');
      // call handler
      this.viewDidDisappear();
    },

    show: function() {
      this.hidden = false;
      this.$el.removeClass('ui-hid');
      // call handler
      this.viewDidAppear();
    },

    deselect: function() {
      this.selected = false;
      this.$el.removeClass('ui-sel');
    },
    select: function() {
      this.selected = true;
      this.$el.addClass('ui-sel');
    },

    addSubview: function(view, jqueryObjectOrSelector) {
      var element = this.$el;
      var error = false;

      if (jqueryObjectOrSelector) {
        if (jqueryObjectOrSelector instanceof jQuery) {
          // jquery element
          if (jqueryObjectOrSelector.length) {
            element = jqueryObjectOrSelector;
          } else {
            console.error('empty jquery object');
            error = true;
          }
        } else if (typeof jqueryObjectOrSelector === 'string') {
          // string
          element = $(jqueryObjectOrSelector, this.$el);
          if (!element.length) {
            console.error('wrong selector ', jqueryObjectOrSelector);
            error = true;
          }
        }
      }

      if (!error) {
        element.append(view.render().el);
        view.superview = this;
        this.subviews.push(view);
      }
    },

    addItems: function() {
      var thisView = this;
      _.each(this.items, function(item) {
        thisView.addSubview(item);
      });
    },

    bringSubviewToFront: function(subview) {
      // 1) hide all
      _.each(this.subviews, function(thisSubview) {
        if (thisSubview !== subview) thisSubview.hide();
      });
      // 2) show the view
      subview.show();
    },

    addTabBar: function(tabBar) {
      tabBar.superview = this;
      this.$el.append(tabBar.render().el);
      this.$el.addClass('view-has-tab-bar');
    },

    viewDidAppear: function() {
      // console.log('UIView::viewDidAppear, id = ' + this.id);
    },

    viewDidDisappear: function() {
      // console.log('UIView::viewDidDisappear, id = ' + this.id);
    },

    goBack: function(subview) {
      // remove subview
      subview.remove();
      this.subviews.pop();
    },

    /*
     Animation
     */

    calculateAnimatedStyles: function(percent) {
      var key;
      var innerKey;
      var percent2;

      // calculate all the fields in this.animation

      if (percent <= 1) {
        // console.log('percent <= 100');
        for (key in this.animation.keyframes['100%']) {
          if (this.animation.keyframes['100%'].hasOwnProperty(key)) {
            switch (key) {
              case 'transform':
                for (innerKey in this.animation.keyframes['100%'].transform) {
                  if (this.animation.keyframes['100%'].transform.hasOwnProperty(innerKey)) {
                    // console.log('innerKey = ', innerKey);
                    switch (innerKey) {
                      case 'translate':
                      case 'rotate':
                      case 'scale':
                        // create 'current' keyframe if it doesn't exist yet
                        if (!this.animation.keyframes.current[key][innerKey]) {
                          this.animation.keyframes.current[key][innerKey] = {};
                        }
                        if (this.animation.keyframes['100%'][key][innerKey].hasOwnProperty('x')) {
                          this.animation.keyframes.current[key][innerKey].x = this.animation.keyframes['0%'][key][innerKey].x + (this.animation.keyframes['100%'][key][innerKey].x - this.animation.keyframes['0%'][key][innerKey].x) * percent;
                        }
                        if (this.animation.keyframes['100%'][key][innerKey].hasOwnProperty('y')) {
                          this.animation.keyframes.current[key][innerKey].y = this.animation.keyframes['0%'][key][innerKey].y + (this.animation.keyframes['100%'][key][innerKey].y - this.animation.keyframes['0%'][key][innerKey].y) * percent;
                        }
                        if (this.animation.keyframes['100%'][key][innerKey].hasOwnProperty('z')) {
                          this.animation.keyframes.current[key][innerKey].z = this.animation.keyframes['0%'][key][innerKey].z + (this.animation.keyframes['100%'][key][innerKey].z - this.animation.keyframes['0%'][key][innerKey].z) * percent;
                        }
                        break;
                      default:
                        console.error('not translate | rotate | scale');
                    }
                  }
                }

                break;
              case 'opacity':
                this.animation.keyframes.current[key] = this.animation.keyframes['0%'][key] + (this.animation.keyframes['100%'][key] - this.animation.keyframes['0%'][key]) * percent;
                break;
              default:
                console.error('not transform | opacity');
            }
          }
        }
      } else {
        // console.log('percent > 100');
        if (this.animation.keyframes.hasOwnProperty('200%')) {
          percent2 = percent - 1;
          for (key in this.animation.keyframes['200%']) {
            if (this.animation.keyframes['200%'].hasOwnProperty(key)) {
              switch (key) {
                case 'transform':
                  for (innerKey in this.animation.keyframes['200%'].transform) {
                    if (this.animation.keyframes['200%'].transform.hasOwnProperty(innerKey)) {
                      switch (innerKey) {
                        case 'translate':
                        case 'rotate':
                        case 'scale':
                          if (this.animation.keyframes['200%'][key][innerKey].hasOwnProperty('x')) {
                            this.animation.keyframes.current[key][innerKey].x = this.animation.keyframes['100%'][key][innerKey].x + (this.animation.keyframes['200%'][key][innerKey].x - this.animation.keyframes['100%'][key][innerKey].x) * percent2;
                          }
                          if (this.animation.keyframes['200%'][key][innerKey].hasOwnProperty('y')) {
                            this.animation.keyframes.current[key][innerKey].y = this.animation.keyframes['100%'][key][innerKey].y + (this.animation.keyframes['200%'][key][innerKey].y - this.animation.keyframes['100%'][key][innerKey].y) * percent2;
                          }
                          if (this.animation.keyframes['200%'][key][innerKey].hasOwnProperty('z')) {
                            this.animation.keyframes.current[key][innerKey].z = this.animation.keyframes['100%'][key][innerKey].z + (this.animation.keyframes['200%'][key][innerKey].z - this.animation.keyframes['100%'][key][innerKey].z) * percent2;
                          }
                          break;
                        default:
                          console.error('not translate | rotate | scale');
                      }
                    }
                  }
                  break;
                case 'opacity':
                  this.animation.keyframes.current[key] = this.animation.keyframes['100%'][key] + (this.animation.keyframes['200%'][key] - this.animation.keyframes['100%'][key]) * percent2;
                  break;
                default:
                  console.error('not transform | opacity');
              }
            }
          }
        }
      }
    },

    applyAnimatedStyles: function(animated) {
      var styleAttribute = '';
      var translateX;
      var translateY;
      var translateZ;
      // var rotateX;
      // var rotateY;
      // var rotateZ;
      var scaleX;
      var scaleY;
      var scaleZ;

      if (animated) {
        styleAttribute += 'transition: transform 0.6s cubic-bezier(0, 0, 0, 1), opacity 0.6s cubic-bezier(0, 0, 0, 1); ';
      }

      if (this.animation.keyframes.current.transform) {
        styleAttribute += 'transform:';

        if (this.animation.keyframes.current.transform.translate) {
          // translate3d(x,y,z)
          translateX = this.animation.keyframes.current.transform.translate.x ? this.animation.keyframes.current.transform.translate.x + 'px' : 0;
          translateY = this.animation.keyframes.current.transform.translate.y ? this.animation.keyframes.current.transform.translate.y + 'px' : 0;
          translateZ = this.animation.keyframes.current.transform.translate.z ? this.animation.keyframes.current.transform.translate.z + 'px' : 0;

          styleAttribute += 'translate3d(' + translateX + ', ' + translateY + ', ' + translateZ + ') ';
        }

        if (this.animation.keyframes.current.transform.rotate) {
          // rotate3d(x,y,z,deg)
          // TODO: Decide to check value of rotation or not.

          if (this.animation.keyframes.current.transform.rotate.hasOwnProperty('x')) styleAttribute += 'rotate3d(1, 0, 0, ' + this.animation.keyframes.current.transform.rotate.x + 'deg) ';
          if (this.animation.keyframes.current.transform.rotate.hasOwnProperty('y')) styleAttribute += 'rotate3d(0, 1, 0, ' + this.animation.keyframes.current.transform.rotate.y + 'deg) ';
          if (this.animation.keyframes.current.transform.rotate.hasOwnProperty('z')) styleAttribute += 'rotate3d(0, 0, 1, ' + this.animation.keyframes.current.transform.rotate.z + 'deg) ';
        }

        if (this.animation.keyframes.current.transform.scale) {
          // scale3d(x,y,z)
          scaleX = this.animation.keyframes.current.transform.scale.x ? this.animation.keyframes.current.transform.scale.x : 1;
          scaleY = this.animation.keyframes.current.transform.scale.y ? this.animation.keyframes.current.transform.scale.y : 1;
          scaleZ = this.animation.keyframes.current.transform.scale.z ? this.animation.keyframes.current.transform.scale.z : 1;

          styleAttribute += 'scale3d(' + scaleX + ', ' + scaleY + ', ' + scaleZ + ')';
        }

        styleAttribute += '; ';
      }

      if (this.animation.keyframes.current.hasOwnProperty('opacity')) {
        styleAttribute += 'opacity:' + this.animation.keyframes.current.opacity + '; ';
      }

      if (styleAttribute) this.$el.attr('style', styleAttribute);
    },

    onSwipe: function(percent) {
      if (this.animation && this.animation.on === 'swipe') {
        this.calculateAnimatedStyles(percent);
        this.applyAnimatedStyles(false);
      }
    },

    onBound: function(percent) {
      if (this.animation && this.animation.on === 'swipe') {
        this.calculateAnimatedStyles(percent);
        this.applyAnimatedStyles(true);
      }
    },

    onAppear: function() {
      // TODO: check undefined
      if (this.animation && this.animation.on === 'appear') {
        this.calculateAnimatedStyles(1);
        this.applyAnimatedStyles(true);
      }
    },

    onDisappear: function() {
      this.calculateAnimatedStyles(0);
      this.applyAnimatedStyles(false);
    }
  });
});
