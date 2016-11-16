define([
  'jquery',
  'underscore',
  'backbone',
  './UIView'
], function($, _, Backbone,
            UIView
) {
  // UICheckbox
  return UIView.extend({
    className: 'ui-checkbox',
    name: '',
    checked: false,
    events: {
      'tapone': 'taponeHandler',
      'touchstart': 'touchstartHandler',
      'touchend': 'touchendHandler',
      'swipemove': 'swipemoveHandler'
    },

    render: function() {
      this.$el.empty();

      if (this.checked) {
        this.$el.addClass('checked');
      }

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

      return this;
    },

    taponeHandler: function() {
      if (this.checked) {
        // uncheck
        this.$el.removeClass('checked');
        this.checked = false;
      } else {
        // check
        this.$el.addClass('checked');
        this.checked = true;
      }
    }
  });
});
