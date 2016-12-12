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
  return function(title, message, cancelButtonLabel, okButtonLabel) {
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
      title: '',
      message: '',
      cancelButtonLabel: null,
      okButtonLabel: null,

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
          label: cancelButtonLabel ? cancelButtonLabel : 'Cancel',
          action: this.reject
        }), this.$buttonsPlace);

        this.addSubview(new UIButton({
          class: 'confirm-ok-btn',
          label: okButtonLabel ? okButtonLabel : 'OK',
          action: this.resolve
        }), this.$buttonsPlace);

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
      },

      reject: function(data) {
        deferred.reject(data);
        this.hide();
      }
    });

    confirmView = new UIConfirmView({
      title: title,
      message: message,
      cancelButtonLabel: cancelButtonLabel,
      okButtonLabel: okButtonLabel
    });

    confirmView.show();

    return deferred.promise();
  };
});
