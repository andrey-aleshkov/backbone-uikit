define([
  'jquery',
  'underscore',
  'backbone',
  './UIView',
  './UIButton',
  './UILabel'
], function($, _, Backbone, UIView,
            UIButton,
            UILabel
) {
  // UIStepper
  return UIView.extend({
    className: 'ui-stepper',
    model: null,
    attribute: '',
    value: 0,
    displayValue: false,
    minimumValue: 0,
    maximumValue: 1000,
    stepValue: 1,
    autorepeat: false,
    // wraps: false,
    decButton: null,
    incButton: null,
    valueLabel: null,
    changeHandler: null,

    initialize: function(options) {
      UIView.prototype.initialize.apply(this, [options]);

      if (this.model) {
        this.value = this.model.get(this.attribute);

        if (this.value < this.minimumValue || this.value > this.maximumValue ) {
          console.error(`The value (${this.value}) must be between the minimum (${this.minimumValue}) and maximum (${this.maximumValue}) values.`);
        }
      }
    },

    render: function() {
      var thisView = this;

      this.$el.empty();

      // set class
      this.setClass(this.class);

      // apply disabled
      if (this.disabled) {
        this.$el.addClass('ui-dis');
      }
      // apply hidden
      if (this.hidden) {
        this.$el.addClass('ui-hid');
      }

      // UI
      this.decButton = new UIButton({
        class: 'ui-stepper-dec-btn',
        label: '–',
        action: function() {
          thisView.decreaseValue();
        }
      });
      this.addSubview(this.decButton);

      if (this.displayValue) {
        this.valueLabel = new UILabel({
          class: 'ui-stepper-value-label'
        });
        this.addSubview(this.valueLabel);
      }

      this.incButton = new UIButton({
        class: 'ui-stepper-inc-btn',
        label: '+',
        action: function() {
          thisView.increaseValue();
        }
      });
      this.addSubview(this.incButton);

      this.updateUI();

      return this;
    },

    updateUI: function() {
      // protected disable =
      // (disable + lock)
      // +
      // (unlock + enable)
      if (this.value <= this.minimumValue) {
        this.decButton.disable();
        this.decButton.lock();
        //
        this.incButton.unlock();
        this.incButton.enable();
      } else if (this.value > this.minimumValue && this.value < this.maximumValue) {
        this.decButton.unlock();
        this.decButton.enable();
        //
        this.incButton.unlock();
        this.incButton.enable();
      } else if (this.value >= this.maximumValue) {
        this.decButton.unlock();
        this.decButton.enable();
        //
        this.incButton.disable();
        this.incButton.lock();
      }

      if (this.valueLabel) {
        this.valueLabel.setText(this.value);
      }
    },

    updateModel: function() {
      if (this.model) {
        this.model.set(this.attribute, this.value);
      }
    },

    decreaseValue: function() {
      var newValue = this.value - this.stepValue;
      var oldValue = this.value;

      if (newValue <= this.minimumValue) {
        newValue = this.minimumValue;
      }

      if (newValue !== oldValue) {
        this.value = newValue;
        this.updateUI();
        if (this.changeHandler) {
          this.changeHandler(newValue, oldValue);
        }
        this.updateModel();
      }
    },

    increaseValue: function() {
      var newValue = this.value + this.stepValue;
      var oldValue = this.value;

      if (newValue >= this.maximumValue) {
        newValue = this.maximumValue;
      }

      if (newValue !== oldValue) {
        this.value = newValue;
        this.updateUI();
        if (this.changeHandler) {
          this.changeHandler(newValue, oldValue);
        }
        this.updateModel();
      }
    }
  });
});
