define([
    "jquery",
    "underscore",
    "backbone",
    "./UIView"
], function($, _, Backbone, UIView){

    // UITextView
    return UIView.extend({
        className: "ui-text-view",
        // <textarea rows="10" cols="45" name="text"></textarea>
        templateTextarea: _.template('<textarea class="input-text" name="<%= name %>" placeholder="<%= placeholder %>" rows="" cols=""><%= text %></textarea>'),
        templateData: _.template('<div class="data-text"><%= text %></div>'),
        // TODO: add hidden input

        name: "",
        text: "",
        placeholder: "",
        editable: true,
        textAlignment: "left",

        render: function() {
            //console.log("UITextView::render");
            this.$el.empty();

            // set additional CSS-class
            this.setClass(this.class);

            var json = {};
            json.name = this.name;
            json.text = this.text;
            json.placeholder = this.placeholder;
            if (this.editable) {
                // input
                this.$el.html(this.templateTextarea(json));
            } else {
                // just text data
                this.$el.html(this.templateData(json));
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
            $("input", this.$el).on('change keyup paste', this.changeHandler);

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
            this.text = newText;
            this.$el.html(this.text);
        },

        changeHandler: function() {
            //console.log("UITextView::changeHandler");
            this.text = $("input", this.$el).attr("value");
            //console.log(this.text);
        },

        focus: function() {
            console.log("UITextView::focus");
            $("textarea", this.$el).focus();
        }

    });

});