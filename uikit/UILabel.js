define([
    "jquery",
    "underscore",
    "backbone",
    "./UIView"
], function($, _, Backbone, UIView){

    // UILabel
    return UIView.extend({
        className: "ui-label",
        tagName: "label",

        text: "",
        width: null,
        textAlignment: null,

        render: function() {
            //console.log("UILabel::render");
            this.$el.empty();
            // set additional CSS-class
            this.setClass(this.class);
            // set text
            this.$el.html(this.text);
            // style
            var styleAttrLine = "";
            if (this.width !== null) styleAttrLine += "width:" + this.width + "; ";
            if (this.textAlignment !== null) styleAttrLine += "text-align:" + this.textAlignment + "; ";

            if (styleAttrLine) this.$el.attr("style", styleAttrLine);
            return this;
        },

        setText: function(newText) {
            this.text = newText;
            // redraw
            this.$el.html(this.text);
        }

    });

});