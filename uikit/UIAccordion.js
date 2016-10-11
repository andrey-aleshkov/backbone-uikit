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
      var thisView = this;
      _.each(this.items, function(item, index) {
        var state = new UIAccordionState({
          // opened: true
          index: index,
          item: item,
          button: thisView.buttons ? thisView.buttons[index] : null
        });
        thisView.addSubview(state);
      });
    }
  });
});
