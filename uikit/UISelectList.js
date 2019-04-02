define([
  'jquery',
  'underscore',
  'backbone',
  './UIView'
], function($, _, Backbone,
            UIView
) {
  // UISelectList
  return UIView.extend({
    className: 'ui-view ui-selectlist',

    collection: null,
    attribute: 'id',
    model: null,

    oldSelectedIndex: null,
    selectedIndex: -1,
    selectedId: null,
    listContentView: null,
    ItemView: null,
    itemViews: null, // TODO: replace with subviews?
    multiSelect: false,

    initialize: function(options) {
      UIView.prototype.initialize.apply(this, [options]);

      this.itemViews = [];

      if (this.collection.length) {
        if (this.selectedIndex > -1) {
          this.selectedId = this.collection.at(this.selectedIndex).get(this.attribute);
        } else if (this.selectedId) {
          if (!this.multiSelect) {
            this.model = this.collection.findWhere({
              [this.attribute]: this.selectedId
            });
            this.selectedIndex = this.collection.indexOf(this.model);
          } else {
            // multiSelect
            // console.log('this.collection = ', this.collection);
            this.selectedIndex = []; // selectedIndexes
            // console.log('this.selectedId = ', this.selectedId);
            this.selectedId.forEach((selectedId) => {
              // console.log('selectedId = ', selectedId);
              this.model = this.collection.findWhere({
                [this.attribute]: selectedId
              });
              // console.log(this.model);
              this.selectedIndex.push(this.collection.indexOf(this.model));
            });
          }
        }
      }

      this.oldSelectedIndex = this.selectedIndex;

      this.listenTo(this.collection, 'update reset sort', () => {
        this.model = this.collection.findWhere({
          [this.attribute]: this.selectedId
        });

        if (this.model) {
          this.selectedIndex = this.collection.indexOf(this.model);
        } else {
          this.selectedIndex = 0;
          if (this.collection.length && this.selectedIndex > -1) {
            this.selectedId = this.collection.at(this.selectedIndex).get(this.attribute);
          }
        }

        this.render();
      });
    },

    render: function() {
      if (this.listContentView) {
        this.listContentView.destroy();
      }
      if (this.itemViews.length) {
        this.itemViews = [];
      }
      // just in case
      this.$el.empty();
      // class
      this.$el.addClass(this.class);

      // apply disabled
      if (this.disabled) {
        this.$el.addClass('ui-dis');
      }

      // collection
      this.listContentView = new UIView({
        class: 'ui-selectlist-content'
      });
      this.addSubview(this.listContentView);

      this.collection.each((model, index) => {
        let scope = this;
        let isSelected = function() {
          let result = false;

          if (scope.multiSelect) {
            // console.log('if in the array !!!!!!!!!!!!!!!!!!!!!!!!!!!!');
            // console.log(scope.selectedIndex);
            // console.log(index);
            // TODO: result = this.selectedIndex.includes(index);
            result = (scope.selectedIndex.indexOf(index) > -1);
            // console.log('result = ', result);
          } else {
            result = (index === scope.selectedIndex);
          }

          return result;
        };

        let thisSelectList = this;
        let itemView = new this.ItemView({
          model: model,
          selected: isSelected(),
          events: {
            tapone: function() {
              if (!thisSelectList.disabled && !this.disabled) {
                thisSelectList.toggle(index);
              }
            }
          }
        });
        this.listContentView.addSubview(itemView);
        this.itemViews.push(itemView);
      });

      return this;
    },

    toggle: function(newIndex) {
      if (this.multiSelect) {
        let indexInSelectedIndexes = this.selectedIndex.indexOf(newIndex);
        if (indexInSelectedIndexes > -1) {
          // remove
          this.selectedIndex.splice(indexInSelectedIndexes, 1); // The second parameter of splice is the number of elements to remove
        } else {
          // add
          this.selectedIndex.push(newIndex);
        }
        // console.log(this.selectedIndex);
        // update selectedId's
        let selectedIds = [];
        this.selectedIndex.forEach((selectedIndex) => {
          selectedIds.push(this.collection.at(selectedIndex).get(this.attribute));
        });
        // console.log(selectedIds);
        this.selectedId = selectedIds;
        // update visuals
        this.itemViews.forEach((itemView, index) => {
          if (this.selectedIndex.indexOf(index) > -1) {
            itemView.select();
          } else {
            itemView.deselect();
          }
        });
        // changeHandler
        this.changeHandler(this.selectedId);
      } else {
        this.oldSelectedIndex = this.selectedIndex;
        this.selectedIndex = newIndex;
        this.selectedId = this.collection.at(this.selectedIndex).get(this.attribute);

        if (this.selectedIndex > -1) {
          if (this.oldSelectedIndex !== this.selectedIndex) {
            // update visuals
            this.itemViews.forEach((itemView, index) => {
              if (index === this.selectedIndex) {
                itemView.select();
              } else {
                itemView.deselect();
              }
            });
            // changeHandler
            this.changeHandler(this.selectedId);
          }
        }
      }
    },

    changeHandler: function() {}
  });
});
