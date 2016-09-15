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

    selectedIndex: 0,
    opened: false,
    button: null,
    buttonHeight: 40,
    listView: null,
    ItemView: null,
    options: null,
    // multiSelect: false,

    render: function() {
      var thisView = this;

      // class
      this.$el.addClass(this.class);

      if (this.options) {
        // Button
        this.button = new UIButton({
          label: thisView.options[this.selectedIndex].title,
          align: 'justify',
          iconOrder: 1,
          action: function() {
            this.superview.toggle();
          }
        });
        this.addSubview(thisView.button);

        // List of options
        this.listView = new UIView({
          class: 'ui-select-list'
        });
        this.addSubview(this.listView);

        this.options.forEach(function(option, index) {
          thisView.listView.addSubview(new thisView.ItemView({
            data: option,
            events: {
              tapone: 'taponeHandler'
            },
            taponeHandler: function() {
              console.log(thisView.$el);
              thisView.selectedIndex = index;
              thisView.toggle();
            }
          }));
        });
      }

      setTimeout(this.layout, 0);
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
      if (this.opened) {
        // close
        this.opened = false;
        this.close();
        this.button.setLabel(this.options[this.selectedIndex].title);
      } else {
        // open
        this.opened = true;
        this.open();
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
