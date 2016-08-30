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
          modal(new InModalView());
        }
      });

      showAlertBtn = new UIButton({
        label: 'Alert',
        action: function() {
          alert('Title', 'This is a message.');
        }
      });

      showConfirmBtn = new UIButton({
        label: 'Confirm',
        action: function() {
          confirm('Title', 'This is a message.');
        }
      });

      this.addSubview(new UINavigationBar({
        leftBarItems: [],
        centerBarItems: [new UILabel({text: this.title})],
        rightBarItems: [signInBtn, showModalBtn, showAlertBtn, showConfirmBtn]
      }));

      return this;
    }
  });
});
