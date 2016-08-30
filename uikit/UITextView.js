define([
  'jquery',
  'underscore',
  'backbone',
  './UIView'
], function($, _, Backbone,
            UIView
) {
  // UITextView
  return UIView.extend({
    className: 'ui-text-view',
    templateTextarea: _.template('<textarea class="input-text" name="<%= name %>" placeholder="<%= placeholder %>" rows="" cols=""><%= text %></textarea>'),
    templateData: _.template('<div class="data-text"><%= text %></div>'),
    $textarea: null,
    name: '',
    text: '',
    placeholder: '',
    editable: true,

    render: function() {
      var json = {
        name: this.name,
        text: this.text,
        placeholder: this.placeholder
      };
      this.$el.empty();
      this.setClass(this.class);
      if (this.editable) {
        // textarea
        this.$el.html(this.templateTextarea(json));
        this.$textarea = this.$el.find('textarea');
      } else {
        // just text data
        this.$el.html(this.templateData(json));
      }
      // apply disabled
      if (this.disabled) {
        this.$el.addClass('ui-dis');
      }
      // apply hidden
      if (this.hidden) {
        this.$el.addClass('ui-hid');
      }
      // class
      if (this.class) this.setClass(this.class);
      // events
      this.$textarea.on('change keyup paste', this.changeHandler);
      return this;
    },

    setText: function(newText) {
      this.text = newText;
      this.$el.html(this.text);
    },

    changeHandler: function() {
      this.text = this.$textarea.val();
    },

    focus: function() {
      this.$textarea.focus();
    }
  });
});
