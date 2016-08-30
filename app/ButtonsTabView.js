define([
  'jquery',
  'underscore',
  'backbone',
  '../uikit/UIView',
  '../uikit/UINavigationBar',
  '../uikit/UIButton',
  '../uikit/UILabel',
  '../uikit/UIAccordion'

], function($, _, Backbone,
            UIView,
            UINavigationBar,
            UIButton,
            UILabel,
            UIAccordion
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
