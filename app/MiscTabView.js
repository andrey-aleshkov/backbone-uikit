define([
  'jquery',
  'underscore',
  'backbone',
  '../uikit/UIView',
  '../uikit/UINavigationBar',
  '../uikit/UIButton',
  '../uikit/UILabel',
  '../uikit/UIActivityIndicatorView'
], function($, _, Backbone,
            UIView,
            UINavigationBar,
            UIButton,
            UILabel,
            UIActivityIndicatorView
) {
  // MiscTabView
  return UIView.extend({
    id: 'misc-tab-view',
    render: function() {
      this.$el.empty();

      this.addSubview(new UINavigationBar({
        title: 'Nav',
        icon: 'settings',
        leftBarItems: [],
        centerBarItems: [new UILabel({text: this.title})],
        rightBarItems: []
      }));

      this.addSubview(new UIActivityIndicatorView({
        class: 'test'
      }));

      return this;
    }

  });
});
