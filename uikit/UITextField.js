define([
    "jquery",
    "underscore",
    "backbone",
    "./UIView"
], function($, _, Backbone, UIView){

    // UITextField
    return UIView.extend({
        className: "ui-text-field",
        templateInput: _.template('<input type="<%= type %>" class="input-text" id="<%= name %>" name="<%= name %>" placeholder="<%= placeholder %>" value="<%= value %>">'),
        templateData: _.template('<div class="data-text" id="<%= name %>"><%= value %></div>'),
        templatePhoneNumber: _.template('<div class="data-text"><a href="tel:+<%= value %>">+<%= value %></a></div>'),

        model: null,
        attribute: '',
        value: '',

        $input: null,

        type: "text",
        name: "",
        placeholder: "",
        editable: true,
        //textAlignment: "left",
        phoneNumber: false,

        initialize: function (options) {
            UIView.prototype.initialize.apply(this, [options]);

            if (this.model) {
                this.value = this.model.get(this.attribute);
            }
        },

        render: function() {
            this.$el.empty();

            var json = {};
            json.type = this.type;
            json.name = this.name;
            json.value = this.value;
            json.placeholder = this.placeholder;
            if (this.editable) {
                // input
                this.$el.html(this.templateInput(json));
                this.$input = $("input", this.$el);
                // events
                this.$input.on("change keyup paste", this.changeHandler);
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
                this.$el.addClass("ui-dis");
            }
            // apply hidden
            if (this.hidden) {
                this.$el.addClass("ui-hid");
            }
            // class
            if (this.class) this.setClass(this.class);

            // set text alignment
            //switch(this.textAlignment) {
            //    case "left":
            //        break;
            //    case "center":
            //        this.setClass("text-align-center");
            //        break;
            //    case "right":
            //        break;
            //}

            return this;
        },

        setValue: function(newValue) {
            this.value = newValue;
            this.render();
        },

        changeHandler: function() {
            this.value = this.$input.val();
            if (this.model) {
                this.model.set(this.attribute, this.value);
            }
        },

        focus: function() {
            this.$input.focus();
        }

    });

});