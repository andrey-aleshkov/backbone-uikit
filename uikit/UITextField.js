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
        // events
        this.$input.on('focus', this.focusHandler);
        this.$input.on('change keyup paste', this.changeHandler);
        this.$input.on('keypress', this.keypressHandler);
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

    changeHandler: function() {
      this.value = this.$input.val();
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
