define([
  'jquery',
  'underscore',
  'backbone',
  '../uikit/UIView',
  '../uikit/UINavigationBar',
  '../uikit/UIButton',
  '../uikit/UILabel',
  '../uikit/UITextField',
  '../uikit/UITextView',
  '../uikit/UIStepper',
  '../uikit/UISwitch',
  '../uikit/UISlider'

], function($, _, Backbone,
            UIView,
            UINavigationBar,
            UIButton,
            UILabel,
            UITextField,
            UITextView,
            UIStepper,
            UISwitch,
            UISlider
) {
  // FormsTabView
  return UIView.extend({
    id: 'forms-tab-view',
    render: function() {
      var dataModel;
      var submitBtn;
      this.$el.empty();

      dataModel = new Backbone.Model({
        number: 2
      });

      this.addSubview(new UITextField({
        type: 'tel',
        autocomplete: 'tel',
        name: 'phone',
        // value: 123,
        model: dataModel,
        delay: 1,
        attribute: 'number',
        placeholder: 'One line ...',
        class: 'my-text-field'
      }));

      this.addSubview(new UITextField({
        name: 'test',
        // value: 123,
        placeholder: 'One line ...',
        class: 'my-text-field',
        delay: 500,
        changeHandler: function(event) {
          console.log(event);
          console.log('event.data.value = ', event.data.value);
          console.log('this.value = ', this.value);
        }
      }));

      this.addSubview(new UITextView({
        text: '',
        placeholder: 'Let us know more ...',
        class: 'my-text-view'
      }));

      this.addSubview(new UILabel({
        model: dataModel,
        attribute: 'number'
      }));

      this.addSubview(new UIStepper({
        model: dataModel,
        attribute: 'number',
        displayValue: true,
        // value: 0,
        minimumValue: 0,
        maximumValue: 10,
        changeHandler: function(newValue, oldValue) {
          console.log('changeHandler, newValue = ', newValue, ' oldValue = ', oldValue);
        }
      }));

      this.addSubview(new UISwitch());

      this.addSubview(new UISlider({
        // startShift--------fromShift--------untilShift--------endShift
        // full range
        startShift: 0,
        endShift: 10,
        // selected part of the range
        fromShift: 1,
        untilShift: 5,
        //
        minRange: 2, // in hours
        changeHandler: function() {
          console.log('UISlider - changeHandler');
        },
        endHandler: function() {
          console.log('UISlider - endHandler');
        }
      }));

      // NavigationBar
      submitBtn = new UIButton({
        label: 'Submit',
        action: function() {}
      });
      this.addSubview(new UINavigationBar({
        leftBarItems: [],
        centerBarItems: [new UILabel({text: this.title})],
        rightBarItems: [submitBtn]
      }));

      return this;
    }
  });
});
