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
    // selectedIndexes: null,
    // multiSelect: false,
    addItems: function() {
      var thisView = this;
      _.each(this.items, function(item, index) {
        var state = new UIAccordionState({
          // opened: true
          index: index,
          item: item
        });
        thisView.addSubview(state);
      });
    }
  });
});
