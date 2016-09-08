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
    var deferred = $.Deferred();

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

    modalView = new UIModalView({
      contentView: contentView
    });

    modalView.show();

    return deferred.promise();
  };
});
