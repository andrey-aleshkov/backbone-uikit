define([
    "jquery",
    "underscore",
    "backbone",
    "./UIView"
], function($, _, Backbone, UIView){

    // UITableView
    return UIView.extend({
        className: "ui-table-view",
        template: _.template('<div class="table-view-content"></div>'),

        cellsContent: null,

        render: function() {
            //console.log("UITableView::render");
            this.$el.empty();
            this.$el.html(this.template());

            //this.cellsContent = [];

            var $thisContent = $(".table-view-content", this.$el);

            if (this.cellsContent) {
                this.cellsContent.forEach(function(cellContent, index){
                    cellContent["index"] = index;
                    /*
                     if (cellContent.action !== undefined) {
                     cellContent["userInteractionEnabled"] = true;
                     }
                     */

                    var uiTableViewCell = new app.UITableViewCell(cellContent);
                    $thisContent.append(uiTableViewCell.render().el);
                });
            }

            return this;
        }

    });

});