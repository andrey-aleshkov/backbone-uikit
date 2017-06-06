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
      var buttonsTabView = new ButtonsTabView({
        title: 'Buttons',
        icon: 'settings'
      });
      var formsTabView = new FormsTabView({
        title: 'Forms',
        icon: 'settings'
      });
      var modalsTabView = new ModalsTabView({
        title: 'Modals',
        icon: 'settings'
      });
      var miscTabView = new MiscTabView({
        title: 'Misc',
        icon: 'settings'
      });
      var misc2TabView = new Misc2TabView({
        title: 'Misc2',
        icon: 'settings'
      });

      this.$el.empty();
      this.addSubview(buttonsTabView);
      this.addSubview(formsTabView);
      this.addSubview(modalsTabView);
      this.addSubview(miscTabView);
      this.addSubview(misc2TabView);

      // UITabBar
      this.tabBar = new UITabBar({
        selectedIndex: 0
      });
      this.addTabBar(this.tabBar);

      return this;
    }

  });
});
