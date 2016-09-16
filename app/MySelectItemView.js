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

    data: null,

    render: function() {
      this.$el.empty();
      this.$el.html(this.template({
        title: this.model.get('title'),
        value: this.model.get('description')
      }));

      return this;
    }
  });
});
