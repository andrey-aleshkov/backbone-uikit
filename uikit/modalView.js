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
      obj: null,

      events: {
        tapone: 'notify'
      },

      render: function() {
        this.$el.empty();

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
      },

      notify: function(data) {
        deferred.notify(data);
      }
    });

    modalView = new UIModalView({
      contentView: contentView
    });

    modalView.show();

    return deferred.promise();
  };
});
