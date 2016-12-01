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
    buttonHeight: 40,
    listView: null,
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
      var thisView = this;

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
          action: function() {
            this.superview.toggle();
          }
        });
        this.addSubview(this.button);

        // List of models
        this.listView = new UIView({
          class: 'ui-select-list'
        });
        this.addSubview(this.listView);

        this.collection.each(function(model, index) {
          thisView.listView.addSubview(new thisView.ItemView({
            model: model,
            events: {
              tapone: function() {
                thisView.oldSelectedIndex = thisView.selectedIndex;
                thisView.selectedIndex = index;
                thisView.toggle();
              }
            }
          }));
        });

        setTimeout(this.layout, 0);
      }

      return this;
    },

    layout: function() {
      this.buttonHeight = this.button.$el.outerHeight(true);
      this.listView.$el.attr('style', 'top:' + this.buttonHeight + 'px;');
      if (!this.opened) {
        this.close();
      } else {
        this.open();
      }
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
      this.$el.addClass('state-opened');
    },

    close: function() {
      this.$el.removeClass('state-opened');
    },

    selectItem: function() {
      //
    }
  });
});
