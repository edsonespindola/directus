//  global.js
//  Directus 6.0

//  (c) RANGER
//  Directus may be freely distributed under the GNU license.
//  For all details and documentation:
//  http://www.getdirectus.com

define([
  'app',
  'backbone',
  'core/directus',
  'core/BasePageView',
  'core/widgets/widgets',
  'core/t',
],

function(app, Backbone, Directus, BasePageView, Widgets, __t) {

  'use strict';

  var Global = BasePageView.extend({
    headerOptions: {
      route: {
        title: __t('settings'),
        breadcrumbs: [{ title: __t('settings'), anchor: '#settings'}]
      },
    },

    leftToolbar: function() {
      var self = this;
      this.saveWidget = new Widgets.SaveWidget({
        widgetOptions: {
          basicSave: true
        },
        onClick: function(event) {
          var data = self.editView.data();
          var model = self.model;
          var success = function() {
            app.router.go('settings');
          };

          // @TODO: Only save when there's a change in the model
          model.save(model.diff(data), {success: success, patch: true});
        }
      });

      this.saveWidget.disable();

      return [
        this.saveWidget
      ];
    },

    events: {
      'change select': 'checkDiff',
      'keyup input, textarea': 'checkDiff'
    },

    checkDiff: function(e) {
      this.saveWidget.enable()
    },

    beforeRender: function() {
      this.setView('#page-content', this.editView);
      BasePageView.prototype.beforeRender.call(this);
    },

    initialize: function(options) {
      this.editView = new Directus.EditView({model: this.model, structure: options.structure});
      this.headerOptions.route.title = this.options.title;
    }

  });

  return Global;

});