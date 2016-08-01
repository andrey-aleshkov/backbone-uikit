define([
    "jquery",
    "underscore",
    "backbone",
    "./UIView"
], function($, _, Backbone, UIView){

    // UITextField
    return UIView.extend({
        className: "ui-text-field",
        templateInput: _.template('<input type="<%= type %>" class="input-text" id="<%= name %>" name="<%= name %>" placeholder="<%= placeholder %>" value="<%= text %>">'),
        templateData: _.template('<div class="data-text" id="<%= name %>"><%= text %></div>'),
        templatePhoneNumber: _.template('<div class="data-text"><a href="tel:+<%= text %>">+<%= text %></a></div>'),
        // TODO: add hidden input

        type: "text",
        name: "",
        text: "",
        placeholder: "",
        editable: true,
        textAlignment: "left",
        phoneNumber: false,

        render: function() {
            //console.log("UITextField::render");
            this.$el.empty();

            var json = {};
            json.type = this.type;
            json.name = this.name;
            json.text = this.text;
            json.placeholder = this.placeholder;
            if (this.editable) {
                // input
                this.$el.html(this.templateInput(json));
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
            // events
            $(this.$el).on("change keyup paste", "input", this.changeHandler);

            // set text alignment
            switch(this.textAlignment) {
                case "left":
                    break;
                case "center":
                    this.setClass("text-align-center");
                    break;
                case "right":
                    break;
            }

            return this;
        },

        setText: function(newText) {
            //console.log("UITextField::setText");
            this.text = newText;
            this.render();
        },

        changeHandler: function() {
            //console.log("UITextField::changeHandler");
            this.text = $("input", this.$el).val();
            //console.log(this.text);
        },

        focus: function() {
            console.log("UITextField::focus");
            $("input", this.$el).focus();
        }

    });

});