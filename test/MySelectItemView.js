define([
  'jquery',
  'underscore',
  'backbone',
  '../uikit/UIView'
], function($, _, Backbone,
            UIView
) {
  // MySelectItemView
  return UIView.extend({
    className: 'ui-view my-select-item-view',
    template: _.template(`
      <div><%= title %></div>
      <div><%= value %></div>
    `),
    disabled: false,
    data: null,

    initialize: function(options) {
      UIView.prototype.initialize.apply(this, [options]);

      if (this.model.get('disabled')) {
        this.disabled = true;
      }
    },

    render: function() {
      this.$el.empty();
      this.$el.html(this.template({
        title: this.model.get('title'),
        value: this.model.get('description')
      }));

      if (this.disabled) {
        this.$el.addClass('ui-dis');
      }

      return this;
    }
  });
});
