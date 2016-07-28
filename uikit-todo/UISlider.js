define([
    "jquery",
    "underscore",
    "backbone",
    "./UIView"
], function($, _, Backbone, UIView){

    // UISlider
    return UIView.extend({
        className: "ui-slider",
        template: _.template('<input type="range" class="input-range" id="<%= name %>" name="<%= name %>" value="<%= value %>" min="0" max="100">'),

        name: "",
        value: 0,

        userInteractionEnabled: true,

        render: function() {
            //console.log("UISlider::render");
            this.$el.empty();

            var json = {};
            json.name = this.name;
            json.value = this.value;

            this.$el.html(this.template(json));

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
            $(this.$el).on("input", "input", this.inputHandler);

            this.inputHandler();

            return this;
        },

        changeHandler: function() {
            //console.log("UISlider::changeHandler");
            this.text = $("input", this.$el).val();
            console.log(this.text);
        },

        inputHandler: function() {
            //console.log("UISlider::inputHandler");
            this.text = $("input", this.$el).val();
            console.log(this.text);
        }

    });

});