define([
    "jquery",
    "underscore",
    "backbone",
    "./UIView",
    "./UIButton"
], function($, _, Backbone, UIView,
            UIButton
){

    // UIStepper
    return UIView.extend({
        className: "ui-stepper",

        model: null,
        attribute: '',
        value: 0,
        minimumValue: 0,
        maximumValue: 1000,
        stepValue: 1,
        autorepeat: false,
        //wraps: false,

        decButton: null,
        incButton: null,

        render: function() {
            var thisView = this;

            this.$el.empty();

            // set class
            this.setClass(this.class);

            // apply disabled
            if (this.disabled) {
                this.$el.addClass("ui-dis");
            }
            // apply hidden
            if (this.hidden) {
                this.$el.addClass("ui-hid");
            }

            // UI
            this.decButton = new UIButton({
                class: 'ui-stepper-dec-btn',
                label: '–',
                action: function () {
                    thisView.decreaseValue();
                }
            });
            this.addSubview(this.decButton);

            this.incButton = new UIButton({
                class: 'ui-stepper-inc-btn',
                label: '+',
                action: function () {
                    thisView.increaseValue();
                }
            });
            this.addSubview(this.incButton);

            this.update();

            return this;
        },

        update: function () {
            //console.log("UIStepper::update");

            //console.log(this.value);

            if (this.value <= this.minimumValue) {
                this.decButton.disable();
                this.incButton.enable();
            } else if (this.value > this.minimumValue && this.value < this.maximumValue) {
                this.decButton.enable();
                this.incButton.enable();
            } else if (this.value >= this.maximumValue) {
                this.decButton.enable();
                this.incButton.disable();
            }

            if (this.model) {
                this.model.set(this.attribute, this.value);
            }
        },

        decreaseValue: function () {
            //console.log("UIStepper::decreaseValue");

            var newValue = this.value - this.stepValue;
            if (newValue <= this.minimumValue) {
                newValue = this.minimumValue;
            }
            this.value = newValue;
            this.update();
        },

        increaseValue: function () {
            //console.log("UIStepper::increaseValue");

            var newValue = this.value + this.stepValue;
            if (newValue >= this.maximumValue) {
                newValue = this.maximumValue;
            }
            this.value = newValue;
            this.update();
        }

    });

});