define([
  'jquery',
  'underscore',
  'backbone',
  './UIView',
  './UIButton',
  './UILabel'
], function($, _, Backbone,
            UIView,
            UIButton,
            UILabel
) {
  // UIActionSheet
  return function(title, actions) {
    var UIActionSheet;
    var actionSheetView;
    var deferred = $.Deferred();

    UIActionSheet = UIView.extend({
      className: 'ui-action-sheet-view',
      template: `
        <div class="ui-action-sheet-content">
          <div class="ui-action-title-place"></div>
          <div class="ui-action-sheet-actions"></div>
          <div class="ui-action-cancel-place"></div>
        </div>`,
      $content: null,
      $titlePlace: null,
      $actions: null,
      $cancelPlace: null,
      title: '',
      actions: '',

      render: function() {
        this.$el.empty();
        this.$el.html(this.template);
        this.$content = this.$el.find('.ui-action-sheet-content');
        this.$titlePlace = this.$el.find('.ui-action-title-place');
        this.$actions = this.$el.find('.ui-action-sheet-actions');
        this.$cancelPlace = this.$el.find('.ui-action-cancel-place');

        //this.addSubview(new UILabel({
        //  class: 'action-sheet-title-label',
        //  text: this.title
        //}), this.$titlePlace);

        this.addSubview(new UILabel({
          class: 'action-sheet-message-label',
          text: this.title
        }), this.$titlePlace);

        this.actions.forEach((action) => {
          this.addSubview(new UIButton({
            class: 'action-sheet-action-btn',
            label: action.label,
            action: action.action
          }), this.$actions);
        });

        this.addSubview(new UIButton({
          class: 'action-sheet-cancel-btn',
          label: 'Cancel',
          action: this.resolve
        }), this.$cancelPlace);

        return this;
      },

      show: function() {
        $('body').append(this.render().el);
      },

      hide: function() {
        this.destroy();
      },

      resolve: function(data) {
        deferred.resolve(data);
        this.hide();
      }
    });

    actionSheetView = new UIActionSheet({
      title: title,
      actions: actions
    });

    actionSheetView.show();

    return deferred.promise();
  };
});
