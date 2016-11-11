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
    }
  });
});
