define([
  'jquery',
  'underscore',
  'backbone',
  'Model'
], function($, _, Backbone, Model) {
  return Backbone.Collection.extend({
    model: Model
  });
});
