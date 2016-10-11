define([
  'jquery',
  'underscore',
  'backbone',
  '../uikit/UIView',
  '../uikit/UIButton'
], function($, _, Backbone,
            UIView,
            UIButton
) {
  // ButtonsTabView
  return UIButton.extend({
    class: 'my-acc-button-view',
    title: 'Пусто',
    price: '0 руб.',
    template: _.template(`
    <div>
      <div class="my-acc-title"><%= title %></div>
      <div class="my-acc-total"><%= price %></div>
    </div>
    `),

    render: function() {
      this.$el.empty();
      this.$el.html(this.template({
        title: this.title,
        price: this.price
      }));

      return this;
    },

    action: function() {
      // console.log(this.superview.index);
      this.superview.toggle();
    }

  });
});
