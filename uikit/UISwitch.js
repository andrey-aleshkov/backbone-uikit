define([
  'jquery',
  'underscore',
  'backbone',
  './UIView'
], function($, _, Backbone,
            UIView
) {
  // UISwitch
  return UIView.extend({
    className: 'ui-view ui-switch',
    template: _.template('<div class="ui-switch-borders"></div><div class="ui-switch-marker"></div>'),

    name: '',
    disabled: false,
    checked: false,
    events: {
      'tapone': 'taponeHandler',
      'touchstart': 'touchstartHandler',
      'touchend': 'touchendHandler',
      'swipemove': 'swipemoveHandler'
    },

    render: function() {
      this.$el.empty();
      this.$el.html(this.template());

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
      console.log('this.disabled = ', this.disabled);
      if (!this.disabled) {
        if (this.checked) {
          // uncheck
          this.$el.addClass('unchecked').removeClass('checked');
          this.checked = false;
        } else {
          // check
          this.$el.addClass('checked').removeClass('unchecked');
          this.checked = true;
        }
        this.changeHandler(this.checked);
      }
    },

    changeHandler: function() {}
  });
});
