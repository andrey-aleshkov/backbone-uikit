define([
  'jquery',
  'underscore',
  'backbone',
  '../uikit/UIView',
  '../uikit/UINavigationBar',
  '../uikit/UIButton',
  '../uikit/UILabel',
  '../uikit/UIScrollView',
  './WoodView'
], function($, _, Backbone,
            UIView,
            UINavigationBar,
            UIButton,
            UILabel,
            UIScrollView,
            WoodView
) {
  // MiscTabView
  return UIView.extend({
    id: 'misc2-tab-view',
    render: function() {
      var scrollView = new UIScrollView({
        class: 'wood-scroll-view',
        maximumScale: 3,
        minimumScale: 0.08
      });
      var woodView = new WoodView();

      this.$el.empty();
      this.addSubview(new UINavigationBar({
        title: 'Nav',
        icon: 'settings',
        leftBarItems: [],
        centerBarItems: [new UILabel({text: this.title})],
        rightBarItems: []
      }));
      this.addSubview(scrollView);
      scrollView.addSubview(woodView);
      return this;
    }

  });
});
