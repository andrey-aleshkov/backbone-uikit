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
    width: null,
    textAlignment: null,

    initialize: function(options) {
      UIView.prototype.initialize.apply(this, [options]);

      if (this.model) {
        this.listenTo(this.model, 'change', this.update);
      }
    },

    render: function() {
      var styleAttrLine = '';
      this.$el.empty();
      // set additional CSS-class
      this.setClass(this.class);
      // set text
      this.$el.html(this.text);
      // style
      if (this.width !== null) styleAttrLine += 'width:' + this.width + '; ';
      if (this.textAlignment !== null) styleAttrLine += 'text-align:' + this.textAlignment + '; ';
      if (styleAttrLine) this.$el.attr('style', styleAttrLine);
      this.update();

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
