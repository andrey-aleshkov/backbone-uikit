/*global define */

/**
 * The main module that defines the public interface for uikit.
 */
define(function (require) {
    'use strict';

    //Return the module value.
    return {
        version: '1.0.0',
        UIView: require('./uikit/UIView'),
        UIButton: require('./uikit/UIButton'),
        //UISegmentedControl: require('./uikit/UISegmentedControl'),
        UILabel: require('./uikit/UILabel'),
        UITextField: require('./uikit/UITextField'),
        UITextView: require('./uikit/UITextView'),
        UIImageView: require('./uikit/UIImageView'),
        //UIModalView: require('./uikit/UIModalView'),
        UINavigationBar: require('./uikit/UINavigationBar'),
        UITabBarItem: require('./uikit/UITabBarItem'),
        UITabBar: require('./uikit/UITabBar'),
        //UITableViewCell: require('./uikit/UITableViewCell'),
        //UITableView: require('./uikit/UITableView'),
        UIScrollView: require('./uikit/UIScrollView'),
        UIActivityIndicatorView: require('./uikit/UIActivityIndicatorView'),
        alert: require('./uikit/UIAlertView'),
        confirm: require('./uikit/UIConfirmView'),
        modal: require('./uikit/UIModalView')
        //prompt: require('./uikit/UIPromptView'), // UIAlertViewStylePlainTextInput
        //login: require('./uikit/UILoginView') // UIAlertViewStyleLoginAndPasswordInput
    };
});
