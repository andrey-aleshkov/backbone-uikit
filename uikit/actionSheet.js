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
  return function(options) {
    var UIActionSheet;
    var actionSheetView;
    var deferred = $.Deferred();

    UIActionSheet = UIView.extend({
      className: 'ui-action-sheet-view',
      template: `
        <div class="ui-action-sheet-content">
          <div class="ui-action-sheet-ok">
            <div class="ui-action-title-place"></div>
            <div class="ui-action-sheet-actions-scroll">
              <div class="ui-action-sheet-actions"></div>
            </div>
          </div>
          <div class="ui-action-cancel-place"></div>
        </div>`,
      $content: null,
      $titlePlace: null,
      $actions: null,
      $cancelPlace: null,
      title: '&nbsp;',
      actions: null,
      cancelButtonLabel: 'Cancel',
      events: {
        'touchstart': 'touchstartHandler',
        'touchend': 'touchendHandler'
      },

      touchstartHandler: function(event) {
        event.preventDefault();
      },

      touchendHandler: function(event) {
        event.preventDefault();
      },

      render: function() {
        this.$el.empty();
        this.$el.html(this.template);
        this.$content = this.$el.find('.ui-action-sheet-content');
        this.$titlePlace = this.$el.find('.ui-action-title-place');
        this.$actionsScroll = this.$el.find('.ui-action-sheet-actions-scroll');
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

        if (this.actions && this.actions.length) {
          this.actions.forEach((action, index) => {
            this.addSubview(new UIButton({
              class: 'action-sheet-action-btn',
              label: action.label,
              action: () => {
                this.resolve(index);
                if (action.action) {
                  action.action();
                }
              }
            }), this.$actions);
          });
        }

        this.addSubview(new UIButton({
          class: 'action-sheet-cancel-btn',
          label: this.cancelButtonLabel,
          action: this.reject
        }), this.$cancelPlace);

        setTimeout(() => {
          this.layout();
        }, 0);

        return this;
      },

      layout: function() {
        var maxHeight = this.$el.height() - 200;
        var actionsHeight = this.$actions.height();

        console.log('maxHeight = ', maxHeight);
        console.log('actionsHeight = ', actionsHeight);

        if (actionsHeight > maxHeight) {
          this.$actionsScroll.attr('style', `height: ${maxHeight}px; -webkit-overflow-scrolling: touch;`);
        }
      },

      show: function() {
        $('body').append(this.render().el);
      },

      resolve: function(data) {
        deferred.resolve(data);
        this.destroy();
      },

      reject: function(data) {
        deferred.reject(data);
        this.destroy();
      }
    });

    actionSheetView = new UIActionSheet(options);
    actionSheetView.show();

    Backbone.trigger('uikit-modal', actionSheetView);

    // set the view as a promise – attach the methods (then, done, fail, always, pipe, progress, state and promise)
    return deferred.promise(actionSheetView);
  };
});
