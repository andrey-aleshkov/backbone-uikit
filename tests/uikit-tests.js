/*global require, define, test, expect, strictEqual, location */

if (typeof require === 'function' && require.config) {
    require.config({
        baseUrl: '../lib',
        paths: {
            //Path relative to baseUrl
            'uikit': '../uikit'
        },
        shim: {
            'underscore': {
                exports: '_'
            },
            'backbone': {
                deps: ['underscore', 'jquery'],
                exports: 'Backbone'
            }
        }
    });

    //Override if in "dist" mode
    if (location.href.indexOf('-dist') !== -1) {
        //Set location of uikit to the dist location
        require.config({
            paths: {
                'uikit': '../dist/uikit'
            }
        });
    }
}

(function (root, factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        // AMD.
        define(['uikit', 'jquery'], factory);
    } else {
        // Browser globals
        factory(root.uikit, root.jQuery);
    }
}(this, function (uikit, $) {
    'use strict';

    test('version test', function () {
        expect(1);
        strictEqual(uikit.version,
            '0.0.1, jQuery version is: ' + $.fn.jquery,
            'Version concatenated');
    });

    /*
    test('conversion test', function () {
        expect(1);
        strictEqual(uikit.convert('Harry & Sally'),
            'Harry &amp; Sally',
            'Ampersand converted');
    });
    */
}));
