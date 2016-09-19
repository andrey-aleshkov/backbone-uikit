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
      var signInBtn;
      var showModalBtn;
      var showAlertBtn;
      var showConfirmBtn;
      var showPromptBtn;

      this.$el.empty();

      // NavigationBar
      signInBtn = new UIButton({
        label: 'Login',
        action: function() {
          console.log('signInBtn');
        }
      });

      showModalBtn = new UIButton({
        label: 'Modal',
        action: function() {
          modal(new InModalView())
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
          alert('Title', 'This is a message.')
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

          confirm('Title', 'This is a message.')
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

          prompt('Title', 'This is a message.', 'This is a placeholder')
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
        rightBarItems: [signInBtn, showModalBtn, showAlertBtn, showConfirmBtn, showPromptBtn]
      }));

      return this;
    }
  });
});
