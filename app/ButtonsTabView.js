define([
  'jquery',
  'underscore',
  'backbone',
  '../uikit/UIView',
  '../uikit/UINavigationBar',
  '../uikit/UIButton',
  '../uikit/UILabel',
  '../uikit/UIAccordion',
  '../uikit/UISelect',
  'MySelectItemView'

], function($, _, Backbone,
            UIView,
            UINavigationBar,
            UIButton,
            UILabel,
            UIAccordion,
            UISelect,
            MySelectItemView
) {
  // ButtonsTabView
  return UIView.extend({
    id: 'buttons-tab-view',

    render: function() {
      var backBtn;

      this.$el.empty();

      // Buttons
      this.addSubview(new UIButton({
        label: 'Back',
        icon: 'arrow-left',
        class: 'test-01-btn'
      }));

      this.addSubview(new UIButton({
        label: 'Back',
        icon: 'arrow-left',
        iconOrder: 1,
        class: 'test-02-btn'
      }));

      this.addSubview(new UIButton({
        label: 'Back',
        icon: 'arrow-left',
        class: 'test-03-btn',
        align: 'left'
      }));

      this.addSubview(new UIButton({
        label: 'Back',
        icon: 'arrow-left',
        class: 'test-04-btn',
        align: 'right'
      }));

      this.addSubview(new UIButton({
        label: 'Back',
        icon: 'arrow-left',
        class: 'test-05-btn',
        align: 'justify'
      }));

      // UIAccordion
      this.addSubview(new UIAccordion({
        class: 'my-accordion',
        items: [
          new UIView({
            class: 'first-acc-view',
            title: 'First'
          }),
          new UIView({
            class: 'second-acc-view',
            title: 'Second'
          }),
          new UIView({
            class: 'third-acc-view',
            title: 'Third'
          })
        ]
      }));

      // UISelect
      this.addSubview(new UISelect({
        class: 'my-select',
        ItemView: MySelectItemView,
        options: [{
          title: 'First',
          value: 10
        }, {
          title: 'Second',
          value: 21
        }, {
          title: 'Third',
          value: 33
        }]
      }));

      // NavigationBar
      backBtn = new UIButton({
        label: 'Back',
        icon: 'arrow-left',
        action: function() {
          console.log('backBtn');
        }
      });
      this.addSubview(new UINavigationBar({
        leftBarItems: [backBtn],
        centerBarItems: [new UILabel({text: this.title})],
        rightBarItems: []
      }));

      return this;
    }

  });
});
