define([
  'jquery',
  'underscore',
  'backbone',
  './UIView',
  './UIButton'
], function($, _, Backbone,
            UIView,
            UIButton
) {
  // UISelect
  return UIView.extend({
    className: 'ui-view ui-select',
    collection: null,

    oldSelectedIndex: null,
    selectedIndex: -1,
    opened: false,
    button: null,
    label: '',
    rect: null,
    listView: null,
    listContentView: null,
    overlayView: null,
    ItemView: null,
    changeHandler: null,
    // multiSelect: false,

    initialize: function(options) {
      UIView.prototype.initialize.apply(this, [options]);
      this.listenTo(this.collection, 'update', () => {
        if (this.collection.length === 1) {
          this.selectedIndex = 0;
        }
        this.render();
      });
      this.oldSelectedIndex = this.selectedIndex;
    },

    render: function() {
      this.$el.empty();
      // class
      this.$el.addClass(this.class);

      // apply disabled
      if (this.disabled) {
        this.$el.addClass('ui-dis');
      }

      if (this.collection.length) {
        // Button
        this.button = new UIButton({
          label: this.label ? this.label : this.collection.at(this.selectedIndex).get('title'),
          align: 'justify',
          iconOrder: 1,
          action: () => {
            this.toggle();
          }
        });
        this.addSubview(this.button);

        if (!this.opened) {
          this.close();
        } else {
          this.open();
        }
      }

      return this;
    },

    toggle: function() {
      if (!this.disabled) {
        if (this.opened) {
          // close
          this.opened = false;
          this.close();
          if (this.selectedIndex > -1) {
            this.button.setLabel(this.collection.at(this.selectedIndex).get('title'));
            if (this.oldSelectedIndex !== this.selectedIndex && this.changeHandler) {
              this.changeHandler();
              this.oldSelectedIndex = this.selectedIndex;
            }
          }
        } else {
          // open
          this.opened = true;
          this.open();
        }
      }
    },

    open: function() {
      var rect = this.$el[0].getBoundingClientRect();
      // these are relative to the viewport, i.e. the window
      this.rect = {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height
      };
      // console.log(`top = ${this.rect.top}, left = ${this.rect.left}, right = ${this.rect.right}, height = ${this.rect.height}`);

      this.$el.addClass('state-opened');

      // overlay
      this.overlayView = new UIView({
        class: 'ui-select-overlay',
        events: {
          'tapone': () => {
            console.log('tapone');
            this.toggle();
          }
        }
      });
      $('body').append(this.overlayView.render().el);

      // List of models
      this.listView = new UIView({
        class: 'ui-select-list'
      });
      this.overlayView.addSubview(this.listView);
      this.listView.$el.attr('style', `top: ${(this.rect.top + this.rect.height)}px; left:${this.rect.left}px; width:${this.rect.width}px;`);

      this.listContentView = new UIView({
        class: 'ui-select-list-content'
      });
      this.listView.addSubview(this.listContentView);

      this.collection.each((model, index) => {
        this.listContentView.addSubview(new this.ItemView({
          model: model,
          events: {
            tapone: () => {
              this.oldSelectedIndex = this.selectedIndex;
              this.selectedIndex = index;
              this.toggle();
            }
          }
        }));
      });

      setTimeout(this.layoutOpen, 0);
    },

    layoutOpen: function() {
      var currentHeight = this.listContentView.$el.outerHeight(true);
      var availableHeight = $(window).height() - (this.rect.top + this.rect.height);

      if (availableHeight < currentHeight) {
        this.listContentView.$el.attr('style', 'height:' + availableHeight + 'px;');
      }
    },

    close: function() {
      this.$el.removeClass('state-opened');
      if (this.overlayView) {
        this.overlayView.destroy();
      }
    }
  });
});
