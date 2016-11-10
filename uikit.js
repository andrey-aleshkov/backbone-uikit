/**
 * The main module that defines the public interface for uikit.
 */
define(function(require) {
  'use strict';

  return {
    version: '1.0.0',
    UIView: require('./uikit/UIView'),
    UIButton: require('./uikit/UIButton'),
    // UISegmentedControl: require('./uikit/UISegmentedControl'),
    UIStepper: require('./uikit/UIStepper'),
    UILabel: require('./uikit/UILabel'),
    UITextField: require('./uikit/UITextField'),
    UITextView: require('./uikit/UITextView'),
    UIImageView: require('./uikit/UIImageView'),
    UINavigationBar: require('./uikit/UINavigationBar'),
    UITabBarItem: require('./uikit/UITabBarItem'),
    UITabBar: require('./uikit/UITabBar'),
    // UITableViewCell: require('./uikit/UITableViewCell'),
    // UITableView: require('./uikit/UITableView'),
    UIScrollView: require('./uikit/UIScrollView'),
    UIActivityIndicatorView: require('./uikit/UIActivityIndicatorView'),
    UIAccordion: require('./uikit/UIAccordion'),
    UISelect: require('./uikit/UISelect'),
    UICheckbox: require('./uikit/UICheckbox'),
    alert: require('./uikit/alertView'),
    confirm: require('./uikit/confirmView'),
    modal: require('./uikit/modalView'),
    prompt: require('./uikit/promptView'), // UIAlertViewStylePlainTextInput
    actionSheet: require('./uikit/actionSheet') // UIActionSheet
    // login: require('./uikit/UILoginView') // UIAlertViewStyleLoginAndPasswordInput
  };
});
