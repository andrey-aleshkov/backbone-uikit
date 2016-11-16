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
    // selectedIndexes: null,
    // multiSelect: false,

    addItems: function() {
      var state;
      this.items.forEach((item, index) => {
        state = new UIAccordionState({
          // opened: true
          index: index,
          item: item,
          button: this.buttons ? this.buttons[index] : null
        });
        this.addSubview(state);
      });
    }
  });
});
