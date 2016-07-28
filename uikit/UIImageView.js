define([
    "jquery",
    "underscore",
    "backbone",
    "./UIView"
], function($, _, Backbone, UIView){

    // UIImageView
    return UIView.extend({
        className: "ui-image-view",
        //template: _.template('<a href="javascript:void(0);"><%= label %></a>'),
        imageUrl: null,
        frameWidth: null,
        frameHeight: null,
        imageWidth: 0,
        imageHeight: 0,

        status: null, // loaded, error

        image: null,

        initialize: function(options) {
            //console.log("UIImageView::initialize");

            UIView.prototype.initialize.apply(this, [options]);

            this.image = new Image();
        },

        render: function() {
            //console.log("UIImageView::render");

            this.$el.empty();
            // set additional CSS-class
            this.setClass(this.class);

            var styleAttrLine = "";
            if (this.frameWidth !== null) styleAttrLine += "width:" + this.frameWidth + "; ";
            if (this.frameHeight !== null) styleAttrLine += "height:" + this.frameHeight + "; ";
            if (this.status == "loaded") {
                styleAttrLine += "background-image: url(" + this.imageUrl +");";
            }
            styleAttrLine += "background-size: " + this.imageWidth + " " + this.imageHeight + ";";

            this.$el.attr("style", styleAttrLine);

            return this;
        },

        load: function() {
            console.log("UIImageView::load");
            this.beforeLoad();

            //var thisImageView = this;

            $(this.image)
                .one('load', function() {
                    this.complete();
                    this.success();
                })
                .one('error', function() {
                    this.complete();
                    this.error();
                })
                .attr('src', this.imageUrl).each(function() {
                    // fail-safe for cached images which sometimes don't trigger "load" events
                    if(this.complete){  //cached image
                        $(this).trigger('load');
                    }
                });
        },

        beforeLoad : function () {
            console.log("UIImageView::beforeLoad");
            // show indicator
        },
        complete : function () {
            console.log("UIImageView::complete");
            // remove indicator
        },
        success : function() {
            console.log("UIImageView::success");
            console.log("@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!");
            alert("UIImageView::success");
            // show the image
            this.status = "loaded";
            this.render();
        },
        error : function() {
            console.log("UIImageView::error");
            // TODO: show error sign
            this.status = "error";
            this.render();
        }

    });

});