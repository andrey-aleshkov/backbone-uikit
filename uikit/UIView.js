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
      var eventCounter = 0;
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
              eventCounter++;
              break;
            case 'touchend':
              if (!isTouchSupported) {
                // convert
                events.mouseup = this.events[key];
              } else {
                // just copy
                events.touchend = this.events[key];
              }
              eventCounter++;
              break;
            case 'mousedown':
              if (isTouchSupported) {
                // convert
                events.touchstart = this.events[key];
              } else {
                // just copy
                events.mousedown = this.events[key];
              }
              eventCounter++;
              break;
            case 'mouseup':
              if (isTouchSupported) {
                // convert
                events.touchend = this.events[key];
              } else {
                // just copy
                events.mouseup = this.events[key];
              }
              eventCounter++;
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
              eventCounter++;
              break;
            default:
              console.error('UIView: Sorry, unknown event name');
          }
        }
      }

      if (eventCounter) {
        this.events = events;
        this.userInteractionEnabled = true;
      }
      this.delegateEvents();

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
        this.select();
      }
    },

    touchendHandler: function(event) {
      event.preventDefault();
      if (this.userInteractionEnabled && !this.disabled) {
        this.deselect();
      }
    },

    taponeHandler: function(event) {
      if (this.userInteractionEnabled) {
        event.stopPropagation();
      }
    },

    swipemoveHandler: function(event) {
      event.stopPropagation();
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
    }
  });
});
