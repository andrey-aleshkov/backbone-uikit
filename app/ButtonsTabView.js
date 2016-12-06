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
  '../uikit/UICheckbox',
  'MySelectItemView',
  'Collection',
  'MyAccordionButtonView'

], function($, _, Backbone,
            UIView,
            UINavigationBar,
            UIButton,
            UILabel,
            UIAccordion,
            UISelect,
            UICheckbox,
            MySelectItemView,
            Collection,
            MyAccordionButtonView
) {
  // ButtonsTabView
  return UIView.extend({
    id: 'buttons-tab-view',

    render: function() {
      var backBtn;
      var collection;

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
        buttons: [
          new MyAccordionButtonView({
            title: 'First',
            price: '100 руб.'
          }),
          new MyAccordionButtonView({
            title: 'Second'
          })
        ],
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
      collection = new Collection();
      collection.add([{
        title: 'First',
        description: '11111'
      }, {
        title: 'Second',
        description: '222222'
      }, {
        title: 'Third',
        description: '33333'
      }, {
        title: '4th',
        description: '44444'
      }, {
        title: '5th',
        description: '55555'
      }, {
        title: '6th',
        description: '66666'
      }, {
        title: '7th',
        description: '77777'
      }, {
        title: '8th',
        description: '88888'
      }, {
        title: '9th',
        description: '99999'
      }]);

      this.addSubview(new UISelect({
        class: 'my-select',
        label: 'Zero',
        //selectedIndex: 0,
        collection: collection,
        ItemView: MySelectItemView,
        //disabled: true,
        changeHandler: function() {
          console.log(this.selectedIndex);
        }
      }));

      this.addSubview(new UICheckbox({
        name: 'my-select',
        checked: false
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
