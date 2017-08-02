define([
  'jquery',
  'underscore',
  'backbone',
  './UIView'
], function($, _, Backbone,
            UIView
) {
  // UIButton
  return UIView.extend({
    className: 'ui-btn',
    template: `
      <span class="btn-icon"></span><span class="btn-label"></span>`,
    $icon: null,
    $label: null,
    action: null,
    label: '',
    icon: '',
    iconOrder: 0,
    align: 'center', // center | justify | left | right
    events: {
      'tapone': 'taponeHandler',
      'touchstart': 'touchstartHandler',
      'touchend': 'touchendHandler'
    },

    render: function() {
      this.$el.empty();
      this.$el.html(this.template);
      this.$icon = this.$el.find('.btn-icon');
      this.$label = this.$el.find('.btn-label');
      // label
      if (this.label) {
        this.$label.html(this.label);
      }
      // icon
      if (this.icon) {
        this.$icon.addClass('icon--' + this.icon);
      }
      // icon order
      if (this.iconOrder) {
        this.$icon.addClass('btn-icon--order');
      }
      // align
      if (this.align !== 'center') {
        this.$el.addClass('ui-btn--align-' + this.align);
      }
      // class
      this.$el.addClass(this.class);
      // apply disabled
      if (this.disabled) {
        this.$el.addClass('ui-dis');
      }
      // apply hidden
      if (this.hidden) {
        this.$el.addClass('ui-hid');
      }
      return this;
    },

    setLabel: function(newLabel) {
      this.label = newLabel;
      this.$label.html(this.label);
    },

    setIcon: function(newIcon) {
      this.icon = newIcon;
      this.$icon.addClass('icon--' + newIcon);
    },

    touchstartHandler: function(event) {
      if (this.userInteractionEnabled && !this.disabled) {
        event.stopPropagation();
        this.select();
      }
    },

    touchendHandler: function(event) {
      if (this.userInteractionEnabled && !this.disabled) {
        event.stopPropagation();
        this.deselect();
      }
    },

    taponeHandler: function(event, details) {
      details.originalEvent.stopPropagation();
      if (this.action && !this.disabled) {
        this.action(this);
      } else {
        // disabled or there is no action
      }
    }
  });
});
