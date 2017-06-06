define([
  'jquery',
  'underscore',
  'backbone',
  '../uikit/UIView',
  '../uikit/UINavigationBar',
  '../uikit/UIButton',
  '../uikit/UILabel',
  '../uikit/UIScrollView',
  '../uikit/UITextField',
  '../uikit/UITextView',
  '../uikit/UIStepper',
  '../uikit/actionSheet',
  '../uikit/alertView',
  '../uikit/confirmView',
  '../uikit/promptView',
  '../uikit/modalView',
  'InModalView'
], function($, _, Backbone,
            UIView,
            UINavigationBar,
            UIButton,
            UILabel,
            UIScrollView,
            UITextField,
            UITextView,
            UIStepper,
            actionSheet,
            alert,
            confirm,
            prompt,
            modal,
            InModalView
) {
  // ModalsTabView
  return UIView.extend({
    id: 'modals-tab-view',
    render: function() {
      var actionSheetBtn;
      var signInBtn;
      var showModalBtn;
      var showAlertBtn;
      var showConfirmBtn;
      var showPromptBtn;

      this.$el.empty();

      // NavigationBar
      actionSheetBtn = new UIButton({
        label: 'ActionSheet',
        action: function() {
          actionSheet('Message', [{
            label: 'Action 00',
            action: function() {
              console.log('Action 00');
            }
          }, {
            label: 'Action 01'
          }], 'Отмена')
            .done(function(data) {
              console.log('ok, index = ', data);
            })
            .fail(function() {
              console.log('cancel');
            });
        }
      });

      signInBtn = new UIButton({
        label: 'Login',
        action: function() {
          console.log('signInBtn');
        }
      });

      showModalBtn = new UIButton({
        label: 'Modal',
        action: function() {
          var thisModal = modal(new InModalView());
          thisModal
            .progress(function() {
              console.log('modal overlay');
            })
            .done(function() {
              console.log('modal ok');
            })
            .fail(function() {
              console.log('modal cancel');
            });
        }
      });

      showAlertBtn = new UIButton({
        label: 'Alert',
        action: function() {
          alert('Title', 'This is a message.', 'Хорошо')
            .done(function() {
              console.log('ok');
            });
        }
      });

      showConfirmBtn = new UIButton({
        label: 'Confirm',
        action: function() {
          /*
          confirm('Title', 'This is a message.')
            .then(
              function() {
                console.log('ok');
              }, function() {
                console.log('cancel');
              }
            );
          */

          confirm('Title', 'This is a message.', null, 'Хорошо')
            .done(function() {
              console.log('ok');
            })
            .done(function() {
              console.log('ok 2');
            })
            .fail(function() {
              console.log('cancel');
            })
            .fail(function() {
              console.log('cancel 2');
            });
        }
      });

      showPromptBtn = new UIButton({
        label: 'Prompt',
        action: function() {
          /*
           confirm('Title', 'This is a message.')
           .then(
           function() {
           console.log('ok');
           }, function() {
           console.log('cancel');
           }
           );
           */

          prompt(
            'Title',
            'This is a message.',
            'This is a placeholder',
            'This is a default value',
            'Отмена',
            'Хорошо'
          )
            .done(function(data) {
              console.log('ok, data = ', data);
            })
            .fail(function() {
              console.log('cancel');
            });
        }
      });

      this.addSubview(new UINavigationBar({
        leftBarItems: [],
        centerBarItems: [new UILabel({text: this.title})],
        rightBarItems: [actionSheetBtn, signInBtn, showModalBtn, showAlertBtn, showConfirmBtn, showPromptBtn]
      }));

      return this;
    }
  });
});
