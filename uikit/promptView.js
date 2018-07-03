define([
  'jquery',
  'underscore',
  'backbone',
  './UIView',
  './UIButton',
  './UILabel',
  './UITextField'
], function($, _, Backbone,
            UIView,
            UIButton,
            UILabel,
            UITextField
) {
  // UIPromptView
  return function(options) {
    var UIPromptView;
    var promptView;
    var deferred = $.Deferred();

    UIPromptView = UIView.extend({
      className: 'ui-prompt-view',
      template: `
        <div class="ui-prompt-content">
          <div class="text-place"></div>
          <div class="input-place"></div>
          <div class="buttons-place"></div>
        </div>`,
      $textPlace: null,
      $buttonsPlace: null,
      title: '&nbsp;',
      message: '',
      placeholder: '',
      value: '',
      okButtonLabel: 'OK',
      cancelButtonLabel: 'Cancel',
      textField: null,

      render: function() {
        this.$el.empty();
        this.$el.html(this.template);

        this.$textPlace = $('.text-place', this.$el);
        this.$inputPlace = $('.input-place', this.$el);
        this.$buttonsPlace = $('.buttons-place', this.$el);

        // text

        this.addSubview(new UILabel({
          class: 'prompt-title-label',
          text: this.title
        }), this.$textPlace);

        this.addSubview(new UILabel({
          class: 'prompt-message-label',
          text: this.message
        }), this.$textPlace);

        // input

        this.textField = new UITextField({
          class: 'prompt-input',
          autofocus: true,
          placeholder: this.placeholder,
          value: this.value
        });

        this.addSubview(this.textField, this.$inputPlace);

        // buttons

        this.addSubview(new UIButton({
          class: 'prompt-cancel-btn',
          label: this.cancelButtonLabel,
          action: this.reject
        }), this.$buttonsPlace);

        this.addSubview(new UIButton({
          class: 'prompt-ok-btn',
          label: this.okButtonLabel,
          action: this.resolveWithData
        }), this.$buttonsPlace);

        return this;
      },

      show: function() {
        $('body').append(this.render().el);
      },

      resolveWithData: function() {
        this.resolve(this.textField.value);
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

    promptView = new UIPromptView(options);
    promptView.show();

    Backbone.trigger('uikit-modal', promptView);

    // set the view as a promise – attach the methods (then, done, fail, always, pipe, progress, state and promise)
    return deferred.promise(promptView);
  };
});
