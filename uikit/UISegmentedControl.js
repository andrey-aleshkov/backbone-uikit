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
  // UISegmentedControl
  return UIView.extend({
    className: 'ui-view ui-segmented-control',
    selectedIndex: 0,
    items: null,
    buttons: null,

    initialize: function(options) {
      UIView.prototype.initialize.apply(this, [options]);
      this.buttons = [];
    },

    render: function() {
      this.$el.empty();
      // class
      this.$el.addClass(this.class);
      // apply disabled
      if (this.disabled) {
        this.$el.addClass('ui-dis');
      }
      // apply hidden
      if (this.hidden) {
        this.$el.addClass('ui-hid');
      }

      this.items.forEach((item, index) => {
        let button = new UIButton({
          label: item.label,
          action: (thisButton) => {
            // deselect other buttons
            this.buttons.forEach((btn) => {
              btn.$el.removeClass('selected');
            });
            // select this one
            thisButton.$el.addClass('selected');
            // update selectedIndex
            this.selectedIndex = index;
            // call changeHandler
            this.changeHandler(this.selectedIndex);
          }
        });
        this.buttons.push(button);
        this.addSubview(button);
        if (index === this.selectedIndex) {
          button.$el.addClass('selected');
        }
      });

      return this;
    },

    changeHandler: function(newIndex) {
      //
    }
  });
});
