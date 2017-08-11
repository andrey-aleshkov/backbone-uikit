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
  // UIConfirmView
  return function(options) {
    var UIConfirmView;
    var confirmView;
    var deferred = $.Deferred();

    UIConfirmView = UIView.extend({
      className: 'ui-confirm-view',
      template: `
        <div class="ui-confirm-content">
          <div class="text-place"></div>
          <div class="buttons-place"></div>
        </div>`,
      $textPlace: null,
      $buttonsPlace: null,
      title: '&nbsp;',
      message: '',
      okButtonLabel: 'OK',
      cancelButtonLabel: 'Cancel',

      render: function() {
        this.$el.empty();
        this.$el.html(this.template);

        this.$textPlace = $('.text-place', this.$el);
        this.$buttonsPlace = $('.buttons-place', this.$el);

        this.addSubview(new UILabel({
          class: 'confirm-title-label',
          text: this.title
        }), this.$textPlace);

        this.addSubview(new UILabel({
          class: 'confirm-message-label',
          text: this.message
        }), this.$textPlace);

        this.addSubview(new UIButton({
          class: 'confirm-cancel-btn',
          label: this.cancelButtonLabel,
          action: this.reject
        }), this.$buttonsPlace);

        this.addSubview(new UIButton({
          class: 'confirm-ok-btn',
          label: this.okButtonLabel,
          action: this.resolve
        }), this.$buttonsPlace);

        return this;
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

    confirmView = new UIConfirmView(options);
    confirmView.show();

    Backbone.trigger('uikit-modal', confirmView);

    // set the view as a promise – attach the methods (then, done, fail, always, pipe, progress, state and promise)
    return deferred.promise(confirmView);
  };
});
