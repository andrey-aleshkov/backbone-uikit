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
  '../uikit/UISegmentedControl',
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
            UISegmentedControl,
            MySelectItemView,
            Collection,
            MyAccordionButtonView
) {
  // ButtonsTabView
  return UIView.extend({
    id: 'buttons-tab-view',

    events: {
      'tapone': 'taponeHandler'
    },

    render: function() {
      var backBtn;
      var collection;

      this.$el.empty();

      // Buttons
      this.addSubview(new UIButton({
        label: 'Back',
        icon: 'arrow-left',
        class: 'test-01-btn',
        action: (event) => {
          console.log('Back button action 10');
        }
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
        openedIndex: 2,
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
        id: '1',
        title: 'First',
        description: '11111'
      }, {
        id: '2',
        title: 'Second',
        description: '222222'
      }, {
        id: '3',
        title: 'Third',
        description: '33333'
      }, {
        id: '4',
        title: '4th',
        description: '44444'
      }, {
        id: '5',
        title: '5th',
        description: '55555'
      }, {
        id: '6',
        title: '6th',
        description: '66666'
      }, {
        id: '7',
        title: '7th',
        description: '77777'
      }, {
        id: '8',
        title: '8th',
        description: '88888'
      }, {
        id: '9',
        title: '9th',
        description: '99999'
      }]);

      this.addSubview(new UISelect({
        class: 'my-select',
        contentClass: 'my-select-content',
        label: 'Select ...',
        appearance: 'up',
        // selectedIndex: 0,
        collection: collection,
        ItemView: MySelectItemView,
        // disabled: true,
        changeHandler: function() {
          console.log(this.selectedIndex);
        }
      }));

      this.addSubview(new UICheckbox({
        name: 'my-select',
        checked: false
      }));

      // UISegmentedControl
      var segmentedControl = new UISegmentedControl({
        items: [{
          label: 'First'
        }, {
          label: 'Second'
        }, {
          label: 'Third'
        }],
        changeHandler: (index) => {
          console.log(index);
        }
      });
      this.addSubview(segmentedControl);


      backBtn = new UIButton({
        label: 'Back',
        icon: 'arrow-left',
        action: function() {
          console.log('backBtn');
        }
      });

      // NavigationBar
      this.addSubview(new UINavigationBar({
        // leftBarItems: [backBtn],
        // centerBarItems: [new UILabel({text: this.title})],
        centerBarItems: [segmentedControl],
        rightBarItems: []
      }));

      return this;
    },

    taponeHandler: function() {
      console.log('ButtonsTabView taponeHandler');
    }
  });
});
