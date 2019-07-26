define([
  'jquery',
  'underscore',
  'backbone',
  '../uikit/UIView',
  '../uikit/UITabBar',
  'ButtonsTabView',
  'FormsTabView',
  'ModalsTabView',
  'MiscTabView',
  'Misc2TabView'

], function($, _, Backbone,
            UIView,
            UITabBar,
            ButtonsTabView,
            FormsTabView,
            ModalsTabView,
            MiscTabView,
            Misc2TabView
) {
  return UIView.extend({
    id: 'main-view',

    render: function() {
      this.$el.empty();

      this.addSubview(new FormsTabView({
        title: 'Forms',
        icon: 'settings'
      }));
      this.addSubview(new ButtonsTabView({
        title: 'Buttons',
        icon: 'settings'
      }));
      this.addSubview(new ModalsTabView({
        title: 'Modals',
        icon: 'settings'
      }));
      this.addSubview(new MiscTabView({
        title: 'Misc',
        icon: 'settings'
      }));
      this.addSubview(new Misc2TabView({
        title: 'Misc2',
        icon: 'settings'
      }));

      // UITabBar
      this.tabBar = new UITabBar({
        selectedIndex: 0
      });
      this.addTabBar(this.tabBar);

      return this;
    }

  });
});
