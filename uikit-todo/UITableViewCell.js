define([
    "jquery",
    "underscore",
    "backbone",
    "./UIView"
], function($, _, Backbone, UIView){

    // UITableViewCell
    return UIView.extend({
        className: "ui-table-view-cell",
        template: _.template('<div class="table-view-cell-content"></div>'),
        $content: null,

        type: null, // header | form-top | form | form-bottom | btn | map | image
        items: null,
        index: null,

        userInteractionEnabled: true,

        accessoryType: null,

        render: function() {
            //console.log("UITableViewCell::render");
            this.$el.empty();
            this.$el.html(this.template());
            this.$content = $(".table-view-cell-content", this.$el);

            // 1) type
            var additionalClass = "table-view-cell-";
            // TODO: change to additionalClass += this.type;
            switch (this.type) {
                case "empty":
                    additionalClass += "empty";
                    break;
                case "header":
                    additionalClass += "header";
                    break;
                case "form-top":
                    additionalClass += "form-top";
                    break;
                case "form":
                    additionalClass += "form";
                    break;
                case "form-bottom":
                    additionalClass += "form-bottom";
                    //form-top-bottom
                    break;
                case "form-top-bottom":
                    additionalClass += "form-top-bottom";
                    break;
                case "btn":
                    additionalClass += "btn";
                    break;
                case "btn-qiwi":
                    additionalClass += "btn btn-qiwi";
                    break;
                case "map":
                    additionalClass += "map";
                    break;
                case "img":
                    additionalClass += "img";
                    break;
                case "order-header":
                    additionalClass += "order-header";
                    break;
                case "order":
                    additionalClass += "order";
                    break;
                default:
                    console.error("UITableViewCell::render - invalid type");
            }
            this.$el.addClass(additionalClass);

            // 2) items
            this.addItems();

            // 3) accessory
            if (this.accessoryType !== null){
                this.addAccessory();
            }

            return this;
        },

        addItems: function() {
            //console.log("UITableViewCell::addItems");
            // TODO: fix this for multiple items
            //this.$content.append(this.items[0].render().el);

            var $thisContent = this.$content;
            /*
             this.items.forEach(function(item){
             $thisContent.append(item.render().el);
             });
             */

            _.each(this.items, function(item){
                $thisContent.append(item.render().el);
            });
        },

        addAccessory: function() {
            //console.log("UITableViewCell::addAccessory");

            var accessory = $(document.createElement('div'));
            accessory.addClass("table-view-cell-accessory");
            accessory.addClass(this.accessoryType);
            this.$content.append(accessory);
        },

        taponeHandler: function(event) {
            console.log("UITableViewCell::taponeHandler, index = " + this.index);

            if (this.action && !this.disabled) {
                this.action();
            } else if (!this.disabled) {
                console.log("there is no action");
                this.focus();
            } else {
                console.log("disabled");
            }

            return false;
        },

        focus: function() {
            console.log("UITableViewCell::focus");

            console.log("this.type = " + this.type);

            _.each(this.items, function(item){
                if (item.focus && !item.disabled) {
                    item.focus();
                }
            });
        }

    });

});