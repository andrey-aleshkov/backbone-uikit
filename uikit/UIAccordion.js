define([
  'jquery',
  'underscore',
  'backbone',
  './UIView',
  './UIButton',
  './UIAccordionState'
], function($, _, Backbone,
            UIView,
            UIButton,
            UIAccordionState
) {
  // UIAccordion
  return UIView.extend({
    className: 'ui-view ui-accordion',
    items: null,
    buttons: null,
    openedIndex: null,
    // multiSelect: false,

    addItems: function() {
      var state;
      this.items.forEach((item, index) => {
        state = new UIAccordionState({
          opened: index === this.openedIndex,
          index: index,
          item: item,
          button: this.buttons ? this.buttons[index] : null
        });
        this.addSubview(state);
      });
    }
  });
});
