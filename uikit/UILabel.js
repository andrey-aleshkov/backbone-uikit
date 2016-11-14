define([
  'jquery',
  'underscore',
  'backbone',
  './UIView'
], function($, _, Backbone,
            UIView
) {
  // UILabel
  return UIView.extend({
    className: 'ui-label',
    tagName: 'label',
    model: null,
    attribute: '',
    text: '',

    initialize: function(options) {
      UIView.prototype.initialize.apply(this, [options]);

      if (this.model) {
        this.listenTo(this.model, 'change', this.update);
      }
    },

    render: function() {
      this.$el.empty();
      // set additional CSS-class
      this.setClass(this.class);
      // apply hidden
      if (this.hidden) {
        this.$el.addClass('ui-hid');
      }
      // set text
      if (this.model) {
        this.setText(this.model.get(this.attribute));
      } else {
        this.$el.html(this.text);
      }

      return this;
    },

    update: function() {
      if (this.model) {
        this.setText(this.model.get(this.attribute));
      }
    },

    setText: function(newText) {
      this.text = newText;
      // redraw
      this.$el.html(this.text);
    }
  });
});
