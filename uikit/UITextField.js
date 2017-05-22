define([
  'jquery',
  'underscore',
  'backbone',
  './UIView'
], function($, _, Backbone,
            UIView
) {
  // UITextField
  return UIView.extend({
    className: 'ui-text-field',
    templateInput: _.template('<input type="<%= type %>" class="input-text" id="<%= name %>" name="<%= name %>" placeholder="<%= placeholder %>" value="<%= value %>" <%= autofocus %>>'),
    templateData: _.template('<div class="data-text" id="<%= name %>"><%= value %></div>'),
    templatePhoneNumber: _.template('<div class="data-text"><a href="tel:+<%= value %>">+<%= value %></a></div>'),
    model: null,
    attribute: '',
    value: '',
    valid: true,
    $input: null,
    type: 'text',
    autocomplete: '',
    // Email
    // email

    // Phone
    // tel

    // Credit Card
    // cc-name
    // cc-number cc-csc cc-exp-month cc-exp-year cc-exp cc-type

    // Name
    // name (full name) given-name (first name) additional-name (middle name) family-name (last name)

    // Address
    // For one address input: street-address
    // For two address inputs: address-line1 , address-line2 address-level1 (state or province) address-level2 (city) postal-code (zip code) country
    name: '',
    placeholder: '',
    autofocus: false,
    editable: true,
    phoneNumber: false,

    initialize: function(options) {
      UIView.prototype.initialize.apply(this, [options]);

      if (this.model) {
        this.value = this.model.get(this.attribute);
      }
    },

    render: function() {
      var json = {
        type: this.type,
        name: this.name,
        value: this.value,
        placeholder: this.placeholder,
        autofocus: this.autofocus ? 'autofocus' : ''
      };
      this.$el.empty();
      if (this.editable) {
        // input
        this.$el.html(this.templateInput(json));
        this.$input = this.$el.find('input');
        // autocomplete
        if (this.autocomplete) {
          this.$input.attr('autocomplete', this.autocomplete);
        }
        // events
        this.$input.on('focus', this.focusHandler);
        // this.$input.on('change keyup paste', this.changeHandler); // no autocomplete, old browsers support
        this.$input.on('input', (event) => {
          // set data
          this.value = this.$input.val();
          if (!event.data) {
            event.data = {};
          }
          event.data.value = this.value;
          // call handler
          this.changeHandler(event);
        }); // respects autocomplete, IE 10+
        this.$input.on('keypress', this.keypressHandler);
        this.$input.on('keydown', this.keydownHandler);
        this.$input.on('blur', this.blurHandler);
      } else {
        if (!this.phoneNumber) {
          // just text data
          this.$el.html(this.templateData(json));
        } else {
          // phone number - click to call
          this.$el.html(this.templatePhoneNumber(json));
        }
      }

      // apply disabled
      if (this.disabled) {
        this.$el.addClass('ui-dis');
      }
      // apply hidden
      if (this.hidden) {
        this.$el.addClass('ui-hid');
      }
      // class
      if (this.class) this.setClass(this.class);

      return this;
    },

    setValue: function(newValue) {
      this.value = newValue;
      this.render();
    },

    setValid: function(valid) {
      this.valid = valid;
      if (valid) {
        this.$el.removeClass('invalid').addClass('valid');
      } else {
        this.$el.removeClass('valid').addClass('invalid');
      }
    },

    focusHandler: function() {},

    keypressHandler: function() {},

    keydownHandler: function() {},

    changeHandler: function() {
      if (this.model) {
        this.model.set(this.attribute, this.value);
      }
    },

    blurHandler: function() {},

    focus: function() {
      this.$input.focus();
    }
  });
});
