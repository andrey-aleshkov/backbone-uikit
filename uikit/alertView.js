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
  // UIAlertView
  return function(options) {
    var UIAlertView;
    var alertView;
    var deferred = $.Deferred();

    UIAlertView = UIView.extend({
      className: 'ui-alert-view',
      template: `
        <div class="ui-alert-content"></div>`,
      $content: null,
      title: '&nbsp;',
      message: '',
      okButtonLabel: 'OK',

      render: function() {
        this.$el.empty();
        this.$el.html(this.template);
        this.$content = this.$el.find('.ui-alert-content');

        this.addSubview(new UILabel({
          class: 'alert-title-label',
          text: this.title
        }), this.$content);

        this.addSubview(new UILabel({
          class: 'alert-message-label',
          text: this.message
        }), this.$content);

        this.addSubview(new UIButton({
          class: 'alert-ok-btn',
          label: this.okButtonLabel,
          action: this.resolve
        }), this.$content);

        return this;
      },

      show: function() {
        $('body').append(this.render().el);
      },

      resolve: function(data) {
        deferred.resolve(data);
        this.destroy();
      }
    });

    alertView = new UIAlertView(options);
    alertView.show();

    Backbone.trigger('uikit-modal', alertView);

    // set the view as a promise – attach the methods (then, done, fail, always, pipe, progress, state and promise)
    return deferred.promise(alertView);
  };
});
