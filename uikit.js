/*global define */

/**
 * The main module that defines the public interface for uikit.
 */
define(function (require) {
    'use strict';

    //Return the module value.
    return {
        version: '1.0.0, jQuery version is: ' + require('jquery').fn.jquery,
        // UIView - Base View
        UIView: require('./uikit/UIView'),
        // UI
        UIButton: require('./uikit/UIButton'),
        UISegmentedControl: require('./uikit/UISegmentedControl'),
        UILabel: require('./uikit/UILabel'),
        UITextField: require('./uikit/UITextField'),
        UITextView: require('./uikit/UITextView'),
        UIImageView: require('./uikit/UIImageView'),

        UIModalView: require('./uikit/UIModalView'),
        UINavigationBar: require('./uikit/UINavigationBar'),

        UITabBarItem: require('./uikit/UITabBarItem'),
        UITabBar: require('./uikit/UITabBar'),

        UITableViewCell: require('./uikit/UITableViewCell'),
        UITableView: require('./uikit/UITableView'),

        UIScrollView: require('./uikit/UIScrollView'),
        UIActivityIndicatorView: require('./uikit/UIActivityIndicatorView')
    };
});
