define([
  'jquery',
  'underscore',
  'backbone',
  './UIView'
], function($, _, Backbone,
            UIView
) {
  // UITabBarItem
  return UIView.extend({
    className: 'ui-tab-bar-item',
    template: _.template('<span class="tab-bar-item-icon icon-<%= icon %>"></span><span class="tab-bar-item-text"><%= title %></span>'),
    events: {
      'tapone': 'taponeHandler'
    },
    icon: '',
    title: '',
    index: null,
    selected: false,

    render: function() {
      this.$el.empty();
      this.$el.html(this.template({
        icon: this.icon,
        title: this.title
      }));

      return this;
    },

    taponeHandler: function() {
      this.superview.selectItem(this.index);
    },

    select: function() {
      this.$el.addClass('selected');
    },

    deselect: function() {
      this.$el.removeClass('selected');
    }
  });
});
