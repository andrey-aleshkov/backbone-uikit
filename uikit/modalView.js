define([
  'jquery',
  'underscore',
  'backbone',
  './UIView'
], function($, _, Backbone,
            UIView
) {
  // UIModalView
  return function(options) {
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

      resolve: function(data) {
        this.destroy();
        deferred.resolve(data);
      },

      reject: function(data) {
        this.destroy();
        deferred.reject(data);
      },

      notify: function(data) {
        deferred.notify(data);
      }
    });

    modalView = new UIModalView(options);
    modalView.show();

    Backbone.trigger('uikit-modal', modalView);

    // set the view as a promise – attach the methods (then, done, fail, always, pipe, progress, state and promise)
    return deferred.promise(modalView);
  };
});
