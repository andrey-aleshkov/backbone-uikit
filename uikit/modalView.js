define([
  'jquery',
  'underscore',
  'backbone',
  './UIView'
], function($, _, Backbone,
            UIView
) {
  // UIModalView
  return function(contentView) {
    var UIModalView;
    var modalView;

    UIModalView = UIView.extend({
      className: 'ui-modal-view',
      contentView: null,

      render: function() {
        this.$el.empty();
        this.$el.html(this.template);

        if (this.contentView) {
          this.addSubview(this.contentView);
        } else {
          console.error('contentView is needed');
        }
        return this;
      },
      show: function() {
        $('body').append(this.render().el);
      },
      hide: function() {
        this.destroy();
      }
    });

    modalView = new UIModalView({
      contentView: contentView
    });

    modalView.show();
  };
});
