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
  return function(title, message) {
    var UIAlertView;
    var alertView;

    UIAlertView = UIView.extend({
      className: 'ui-alert-view',
      template: `
        <div class="ui-alert-content"></div>`,
      $content: null,
      title: '',
      message: '',

      render: function() {
        var thisView = this;

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
          label: 'OK',
          action: function() {
            thisView.hide();
          }
        }), this.$content);

        return this;
      },
      show: function() {
        $('body').append(this.render().el);
      },
      hide: function() {
        this.destroy();
      }
    });

    alertView = new UIAlertView({
      title: title,
      message: message
    });

    alertView.show();
  };
});
