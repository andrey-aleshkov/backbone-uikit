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
    template: _.template(`
      <input type="checkbox"
             id="<%= name %>" name="<%= name %>"
             <%= checked %>
      />
      <label for="<%= name %>"></label>
    `),
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
      this.$el.html(this.template({
        name: this.name,
        checked: this.checked ? 'checked' : ''
      }));

      return this;
    },

    taponeHandler: function() {
      if (this.action && this.disabled === false) {
        this.action();
      } else {
        // disabled or there is no action
      }
    }
  });
});
