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
    className: 'ui-view in-modal-view',

    render: function() {
      var thisView = this;
      this.$el.empty();
      this.addSubview(new UIButton({
        label: 'Close',
        class: 'in-modal-close-button',
        action: function() {
          thisView.superview.reject();
        }
      }));
      this.addSubview(new UIButton({
        label: 'Ok',
        class: 'in-modal-button',
        action: function() {
          thisView.superview.resolve();
        }
      }));

      return this;
    }

  });
});
