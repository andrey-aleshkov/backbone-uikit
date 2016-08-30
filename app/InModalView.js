define([
  'jquery',
  'underscore',
  'backbone',
  '../uikit/UIView',
  '../uikit/UIButton'

], function($, _, Backbone,
            UIView,
            UIButton
) {
  // InModalView
  return UIView.extend({
    className: 'in-modal-view',

    render: function() {
      var thisView = this;
      this.$el.empty();
      this.addSubview(new UIButton({
        label: 'Close',
        class: 'in-modal-button',
        action: function() {
          thisView.superview.hide();
        }
      }));

      return this;
    }

  });
});
