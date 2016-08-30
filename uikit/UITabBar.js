define([
  'jquery',
  'underscore',
  'backbone',
  './UIView',
  './UITabBarItem'
], function($, _, Backbone,
            UIView,
            UITabBarItem
) {
  // UITabBar
  return UIView.extend({
    className: 'ui-tab-bar',
    items: null,
    selectedIndex: 0,

    render: function() {
      var thisView = this;
      this.$el.empty();
      this.items = [];

      _.each(this.superview.subviews, function(superSubview, index) {
        var uiTabBarItem = new UITabBarItem({
          icon: superSubview.icon,
          title: superSubview.title,
          index: index,
          superview: thisView
        });
        thisView.items.push(uiTabBarItem);
        thisView.$el.append(uiTabBarItem.render().el);
      });

      this.selectItem(this.selectedIndex);

      return this;
    },

    selectItem: function(index) {
      // 1) save index
      this.selectedIndex = index;

      // 2) items
      _.each(this.items, function(item) {
        item.deselect();
      });
      this.items[this.selectedIndex].select();

      // 3) views
      this.superview.bringSubviewToFront(this.superview.subviews[this.selectedIndex]);
    }
  });
});
