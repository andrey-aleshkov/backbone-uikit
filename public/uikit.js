//Copyright 2012, etc.

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD.
        define(['jquery', 'underscore', 'backbone'], factory);
    } else {
        // Browser globals
        root.uikit = factory(root.$, root._, root.Backbone);
    }
}(this, function ($, _) {


/**
 * @license almond 0.3.2 Copyright jQuery Foundation and other contributors.
 * Released under MIT license, http://github.com/requirejs/almond/LICENSE
 */
//Going sloppy to avoid 'use strict' string cost, but strict practices should
//be followed.
/*global setTimeout: false */

var requirejs, require, define;
(function (undef) {
    var main, req, makeMap, handlers,
        defined = {},
        waiting = {},
        config = {},
        defining = {},
        hasOwn = Object.prototype.hasOwnProperty,
        aps = [].slice,
        jsSuffixRegExp = /\.js$/;

    function hasProp(obj, prop) {
        return hasOwn.call(obj, prop);
    }

    /**
     * Given a relative module name, like ./something, normalize it to
     * a real name that can be mapped to a path.
     * @param {String} name the relative name
     * @param {String} baseName a real name that the name arg is relative
     * to.
     * @returns {String} normalized name
     */
    function normalize(name, baseName) {
        var nameParts, nameSegment, mapValue, foundMap, lastIndex,
            foundI, foundStarMap, starI, i, j, part, normalizedBaseParts,
            baseParts = baseName && baseName.split("/"),
            map = config.map,
            starMap = (map && map['*']) || {};

        //Adjust any relative paths.
        if (name) {
            name = name.split('/');
            lastIndex = name.length - 1;

            // If wanting node ID compatibility, strip .js from end
            // of IDs. Have to do this here, and not in nameToUrl
            // because node allows either .js or non .js to map
            // to same file.
            if (config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex])) {
                name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, '');
            }

            // Starts with a '.' so need the baseName
            if (name[0].charAt(0) === '.' && baseParts) {
                //Convert baseName to array, and lop off the last part,
                //so that . matches that 'directory' and not name of the baseName's
                //module. For instance, baseName of 'one/two/three', maps to
                //'one/two/three.js', but we want the directory, 'one/two' for
                //this normalization.
                normalizedBaseParts = baseParts.slice(0, baseParts.length - 1);
                name = normalizedBaseParts.concat(name);
            }

            //start trimDots
            for (i = 0; i < name.length; i++) {
                part = name[i];
                if (part === '.') {
                    name.splice(i, 1);
                    i -= 1;
                } else if (part === '..') {
                    // If at the start, or previous value is still ..,
                    // keep them so that when converted to a path it may
                    // still work when converted to a path, even though
                    // as an ID it is less than ideal. In larger point
                    // releases, may be better to just kick out an error.
                    if (i === 0 || (i === 1 && name[2] === '..') || name[i - 1] === '..') {
                        continue;
                    } else if (i > 0) {
                        name.splice(i - 1, 2);
                        i -= 2;
                    }
                }
            }
            //end trimDots

            name = name.join('/');
        }

        //Apply map config if available.
        if ((baseParts || starMap) && map) {
            nameParts = name.split('/');

            for (i = nameParts.length; i > 0; i -= 1) {
                nameSegment = nameParts.slice(0, i).join("/");

                if (baseParts) {
                    //Find the longest baseName segment match in the config.
                    //So, do joins on the biggest to smallest lengths of baseParts.
                    for (j = baseParts.length; j > 0; j -= 1) {
                        mapValue = map[baseParts.slice(0, j).join('/')];

                        //baseName segment has  config, find if it has one for
                        //this name.
                        if (mapValue) {
                            mapValue = mapValue[nameSegment];
                            if (mapValue) {
                                //Match, update name to the new value.
                                foundMap = mapValue;
                                foundI = i;
                                break;
                            }
                        }
                    }
                }

                if (foundMap) {
                    break;
                }

                //Check for a star map match, but just hold on to it,
                //if there is a shorter segment match later in a matching
                //config, then favor over this star map.
                if (!foundStarMap && starMap && starMap[nameSegment]) {
                    foundStarMap = starMap[nameSegment];
                    starI = i;
                }
            }

            if (!foundMap && foundStarMap) {
                foundMap = foundStarMap;
                foundI = starI;
            }

            if (foundMap) {
                nameParts.splice(0, foundI, foundMap);
                name = nameParts.join('/');
            }
        }

        return name;
    }

    function makeRequire(relName, forceSync) {
        return function () {
            //A version of a require function that passes a moduleName
            //value for items that may need to
            //look up paths relative to the moduleName
            var args = aps.call(arguments, 0);

            //If first arg is not require('string'), and there is only
            //one arg, it is the array form without a callback. Insert
            //a null so that the following concat is correct.
            if (typeof args[0] !== 'string' && args.length === 1) {
                args.push(null);
            }
            return req.apply(undef, args.concat([relName, forceSync]));
        };
    }

    function makeNormalize(relName) {
        return function (name) {
            return normalize(name, relName);
        };
    }

    function makeLoad(depName) {
        return function (value) {
            defined[depName] = value;
        };
    }

    function callDep(name) {
        if (hasProp(waiting, name)) {
            var args = waiting[name];
            delete waiting[name];
            defining[name] = true;
            main.apply(undef, args);
        }

        if (!hasProp(defined, name) && !hasProp(defining, name)) {
            throw new Error('No ' + name);
        }
        return defined[name];
    }

    //Turns a plugin!resource to [plugin, resource]
    //with the plugin being undefined if the name
    //did not have a plugin prefix.
    function splitPrefix(name) {
        var prefix,
            index = name ? name.indexOf('!') : -1;
        if (index > -1) {
            prefix = name.substring(0, index);
            name = name.substring(index + 1, name.length);
        }
        return [prefix, name];
    }

    /**
     * Makes a name map, normalizing the name, and using a plugin
     * for normalization if necessary. Grabs a ref to plugin
     * too, as an optimization.
     */
    makeMap = function (name, relName) {
        var plugin,
            parts = splitPrefix(name),
            prefix = parts[0];

        name = parts[1];

        if (prefix) {
            prefix = normalize(prefix, relName);
            plugin = callDep(prefix);
        }

        //Normalize according
        if (prefix) {
            if (plugin && plugin.normalize) {
                name = plugin.normalize(name, makeNormalize(relName));
            } else {
                name = normalize(name, relName);
            }
        } else {
            name = normalize(name, relName);
            parts = splitPrefix(name);
            prefix = parts[0];
            name = parts[1];
            if (prefix) {
                plugin = callDep(prefix);
            }
        }

        //Using ridiculous property names for space reasons
        return {
            f: prefix ? prefix + '!' + name : name, //fullName
            n: name,
            pr: prefix,
            p: plugin
        };
    };

    function makeConfig(name) {
        return function () {
            return (config && config.config && config.config[name]) || {};
        };
    }

    handlers = {
        require: function (name) {
            return makeRequire(name);
        },
        exports: function (name) {
            var e = defined[name];
            if (typeof e !== 'undefined') {
                return e;
            } else {
                return (defined[name] = {});
            }
        },
        module: function (name) {
            return {
                id: name,
                uri: '',
                exports: defined[name],
                config: makeConfig(name)
            };
        }
    };

    main = function (name, deps, callback, relName) {
        var cjsModule, depName, ret, map, i,
            args = [],
            callbackType = typeof callback,
            usingExports;

        //Use name if no relName
        relName = relName || name;

        //Call the callback to define the module, if necessary.
        if (callbackType === 'undefined' || callbackType === 'function') {
            //Pull out the defined dependencies and pass the ordered
            //values to the callback.
            //Default to [require, exports, module] if no deps
            deps = !deps.length && callback.length ? ['require', 'exports', 'module'] : deps;
            for (i = 0; i < deps.length; i += 1) {
                map = makeMap(deps[i], relName);
                depName = map.f;

                //Fast path CommonJS standard dependencies.
                if (depName === "require") {
                    args[i] = handlers.require(name);
                } else if (depName === "exports") {
                    //CommonJS module spec 1.1
                    args[i] = handlers.exports(name);
                    usingExports = true;
                } else if (depName === "module") {
                    //CommonJS module spec 1.1
                    cjsModule = args[i] = handlers.module(name);
                } else if (hasProp(defined, depName) ||
                           hasProp(waiting, depName) ||
                           hasProp(defining, depName)) {
                    args[i] = callDep(depName);
                } else if (map.p) {
                    map.p.load(map.n, makeRequire(relName, true), makeLoad(depName), {});
                    args[i] = defined[depName];
                } else {
                    throw new Error(name + ' missing ' + depName);
                }
            }

            ret = callback ? callback.apply(defined[name], args) : undefined;

            if (name) {
                //If setting exports via "module" is in play,
                //favor that over return value and exports. After that,
                //favor a non-undefined return value over exports use.
                if (cjsModule && cjsModule.exports !== undef &&
                        cjsModule.exports !== defined[name]) {
                    defined[name] = cjsModule.exports;
                } else if (ret !== undef || !usingExports) {
                    //Use the return value from the function.
                    defined[name] = ret;
                }
            }
        } else if (name) {
            //May just be an object definition for the module. Only
            //worry about defining if have a module name.
            defined[name] = callback;
        }
    };

    requirejs = require = req = function (deps, callback, relName, forceSync, alt) {
        if (typeof deps === "string") {
            if (handlers[deps]) {
                //callback in this case is really relName
                return handlers[deps](callback);
            }
            //Just return the module wanted. In this scenario, the
            //deps arg is the module name, and second arg (if passed)
            //is just the relName.
            //Normalize module name, if it contains . or ..
            return callDep(makeMap(deps, callback).f);
        } else if (!deps.splice) {
            //deps is a config object, not an array.
            config = deps;
            if (config.deps) {
                req(config.deps, config.callback);
            }
            if (!callback) {
                return;
            }

            if (callback.splice) {
                //callback is an array, which means it is a dependency list.
                //Adjust args if there are dependencies
                deps = callback;
                callback = relName;
                relName = null;
            } else {
                deps = undef;
            }
        }

        //Support require(['a'])
        callback = callback || function () {};

        //If relName is a function, it is an errback handler,
        //so remove it.
        if (typeof relName === 'function') {
            relName = forceSync;
            forceSync = alt;
        }

        //Simulate async callback;
        if (forceSync) {
            main(undef, deps, callback, relName);
        } else {
            //Using a non-zero value because of concern for what old browsers
            //do, and latest browsers "upgrade" to 4 if lower value is used:
            //http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html#dom-windowtimers-settimeout:
            //If want a value immediately, use require('id') instead -- something
            //that works in almond on the global level, but not guaranteed and
            //unlikely to work in other AMD implementations.
            setTimeout(function () {
                main(undef, deps, callback, relName);
            }, 4);
        }

        return req;
    };

    /**
     * Just drops the config on the floor, but returns req in case
     * the config return value is used.
     */
    req.config = function (cfg) {
        return req(cfg);
    };

    /**
     * Expose module registry for debugging and tooling
     */
    requirejs._defined = defined;

    define = function (name, deps, callback) {
        if (typeof name !== 'string') {
            throw new Error('See almond README: incorrect module build, no module name');
        }

        //This module may not have dependencies
        if (!deps.splice) {
            //deps is not an array, so probably means
            //an object literal or factory function for
            //the value. Adjust args.
            callback = deps;
            deps = [];
        }

        if (!hasProp(defined, name) && !hasProp(waiting, name)) {
            waiting[name] = [name, deps, callback];
        }
    };

    define.amd = {
        jQuery: true
    };
}());

define("lib/almond/almond-0.3.2", function(){});

define('uikit/UIView',[
    "jquery",
    "underscore",
    "backbone"
], function($, _, Backbone){

    // UIView
    return Backbone.View.extend({
        className: "ui-view",

        animation: null,

        // Common
        title: "",
        icon: "",
        class: "",
        oldClass: "",

        name: "",
        oldName: "",

        disabled: false,
        hidden: false,
        selected: false,

        superview: null,
        subviews: null,
        items: null,

        userInteractionEnabled: false,
        events: {},

        initialize: function(options) {
            //console.log("UIView::initialize, className = " + this.className);

            var events = {},
                eventСounter = 0;

            this.subviews = [];

            if (options){
                for (var key in options) {
                    //copy all the fields
                    this[key] = options[key];
                }
            }

            var isTouchSupported = "ontouchend" in document;

            // Convert target events.

            for (var key in this.events) {
                //copy all the fields
                
                //console.log("key = " + key);
                //console.log("this.events[key] = " + this.events[key]);

                switch (key) {
                    case "touchstart":
                        if (!isTouchSupported) {
                            // convert
                            events["mousedown"] = this.events[key];
                        } else {
                            // just copy
                            events["touchstart"] = this.events[key];
                        }
                        eventСounter++;
                        break;
                    case "touchend":
                        if (!isTouchSupported) {
                            // convert
                            events["mouseup"] = this.events[key];
                        } else {
                            // just copy
                            events["touchend"] = this.events[key];
                        }
                        eventСounter++;
                        break;
                    case "mousedown":
                        if (isTouchSupported) {
                            // convert
                            events["touchstart"] = this.events[key];
                        } else {
                            // just copy
                            events["mousedown"] = this.events[key];
                        }
                        eventСounter++;
                        break;
                    case "mouseup":
                        if (isTouchSupported) {
                            // convert
                            events["touchend"] = this.events[key];
                        } else {
                            // just copy
                            events["mouseup"] = this.events[key];
                        }
                        eventСounter++;
                        break;
                    case "swipemove":
                        // just copy
                        events[key] = this.events[key];
                        eventСounter++;
                        break;
                    case "pinch":
                        // just copy
                        events[key] = this.events[key];
                        eventСounter++;
                        break;
                    case "tapone":
                        // just copy
                        events[key] = this.events[key];
                        eventСounter++;
                        break;
                    default:
                        console.error("Sorry, unknown key");
                }
            }

            //console.log('className = ', this.className);
            //console.log('eventСounter = ', eventСounter);

            if (eventСounter) {
                this.events = events;
                this.userInteractionEnabled = true;
            }

            //console.log("events = ", events);

            // Animations
            if (this.animation && this.animation.keyframes) {
                // copy '0%' to 'current%'
                this.animation.keyframes['current'] = JSON.parse(JSON.stringify(this.animation.keyframes['0%']));
            }
            /*
            if (this.animation && this.animation.keyframes) {
                this.animation.keyframes.current = {
                    transform: {
                        // translate3d(x,y,z)
                        translate: {
                            x: 0,
                            y: 0,
                            z: 0
                        },
                        // scale3d(x,y,z)
                        scale: {
                            x: 1, //
                            y: 1, //
                            z: 1 //
                        },
                        // rotate3d(x,y,z,angle)
                        rotate: {
                            x: 0,
                            y: 0,
                            z: 0
                        }
                    },
                    // opacity
                    opacity: 1
                };
            }
            */

            _.bindAll(this);

            this.$el.on("webkitTransitionEnd", this.transitionEndHandler);
        },

        transitionEndHandler: function(event) {
            //console.log("UIView::transitionEndHandler");
            event.stopPropagation();
        },

        destroy: function() {
            //console.log("UIView::destroy");
            // v1
            /*
            // COMPLETELY UNBIND THE VIEW
            this.undelegateEvents();

            this.$el.removeData().unbind();

            // Removes a view and its el from the DOM, and calls stopListening to remove any bound events that the view has listenTo'd.
            this.remove();
            Backbone.View.prototype.remove.call(this);
            */

            // v2
            this.remove();
            this.unbind();

            _.each(this.subviews, function(subview){
                if (subview.destroy){
                    subview.destroy();
                }
            });

        },

        render: function() {
            //console.log("UIView::render, this.id = " + this.id);
            this.$el.empty();

            // animate
            //this.calculateAnimatedStyles(0);
            //this.applyAnimatedStyles(false);

            // name
            if (this.name) this.setName(this.name);

            // class
            if (this.class) this.setClass(this.class);

            // TODO: Think about it
            // items -> subviews
            this.addItems();

            return this;
        },

        size: function() {
            //console.log('UIView::size');
            var rect = this.$el[0].getBoundingClientRect();

            return {
                width: rect.width,
                height: rect.height
            }
        },

        /*
         Event handlers for touch events
         */

        touchstartHandler: function(event) {
            //console.log("UIView::touchstartHandler");
            //console.log(this.events);
            //console.log("this.userInteractionEnabled = " + this.userInteractionEnabled);

            if (this.userInteractionEnabled && !this.disabled) {
                event.stopPropagation();
                this.select();
            }
            //return false;
        },

        touchendHandler: function(event) {
            //console.log("UIView::touchendHandler");
            if (this.userInteractionEnabled && !this.disabled) {
                event.stopPropagation();
                this.deselect();
            }
            //return false;
        },

        taponeHandler: function(event) {
            //console.log("UIView::taponeHandler");
            //console.log("UIView::taponeHandler, id = " + this.id + " className = " + this.className);
            //console.log("this.userInteractionEnabled = " + this.userInteractionEnabled);

            if (this.userInteractionEnabled) {
                event.stopPropagation();
            }
        },

        swipemoveHandler: function(event, obj) {
            //console.log("UIView::swipemoveHandler, id = " + this.id + " className = " + this.className);
            event.stopPropagation();
        },

        setName: function(newName) {
            // save old class
            this.oldName = this.name;
            // save new one
            this.name = newName;
            this.$el.removeClass(this.oldName).addClass(this.name);
        },

        setClass: function(newClass) {
            // save old class
            this.oldClass = this.class;
            // save new one
            this.class = newClass;
            // redraw
            //this.render();
            // NB!: this order is crucial.
            this.$el.removeClass(this.oldClass).addClass(this.class);
        },

        /*
         unsetClass: function(classToRemove){
         //
         this.$el.removeClass(this.oldClass).addClass(this.class);
         },
         */

        disable: function() {
            this.disabled = true;
            // redraw
            this.$el.addClass("ui-dis");
        },

        enable: function() {
            this.disabled = false;
            // redraw
            this.$el.removeClass("ui-dis");
        },

        hide: function() {
            this.hidden = true;
            this.$el.addClass("ui-hid");
            // call handler
            this.viewDidDisappear();
        },

        show: function() {
            this.hidden = false;
            this.$el.removeClass("ui-hid");
            // call handler
            this.viewDidAppear();
        },

        deselect: function() {
            this.selected = false;
            this.$el.removeClass("ui-sel");
        },
        select: function() {
            this.selected = true;
            this.$el.addClass("ui-sel");
        },

        addSubview: function(view, jqueryObjectOrSelector) {
            //console.log("UIView::addSubview ");

            var element = this.$el,
                error = false;

            if (jqueryObjectOrSelector) {
                if (jqueryObjectOrSelector instanceof jQuery) {
                    // jquery element
                    if (jqueryObjectOrSelector.length) {
                        element = jqueryObjectOrSelector;
                    } else {
                        console.error('empty jquery object');
                        error = true;
                    }
                } else if (typeof jqueryObjectOrSelector === 'string') {
                    // string
                    element = $(jqueryObjectOrSelector, this.$el);
                    if (!element.length) {
                        console.error('wrong selector ', jqueryObjectOrSelector);
                        error = true;
                    }
                }
            }

            if (!error) {
                element.append(view.render().el);
                view.superview = this;
                this.subviews.push(view);
            }
        },

        addItems: function() {
            //console.log("UIView::addItems");
            var thisView = this;
            _.each(this.items, function(item){
                thisView.addSubview(item);
            });
        },

        bringSubviewToFront: function(subview) {
            //console.log("UIView::bringSubviewToFront");
            //console.log("bringSubviewToFront " + subview.id);

            // 1) hide all
            var thisView = this;
            _.each(this.subviews, function(thisSubview){
                if (thisSubview != subview) thisSubview.hide();
            });

            // 2) show the view
            subview.show();
        },

        sendSubviewToBack: function(subview) {
            //console.log("UIView::sendSubviewToBack");
        },

        addTabBar: function(tabBar) {
            //console.log("UIView::addTabBar");
            tabBar.superview = this;
            this.$el.append(tabBar.render().el);
            //
            this.$el.addClass("view-has-tab-bar");
        },

        viewDidAppear: function() {
            //console.log("UIView::viewDidAppear, id = " + this.id);
            //console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        },

        viewDidDisappear: function() {
            //console.log("UIView::viewDidDisappear, id = " + this.id);
            //console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        },

        goBack: function(subview) {
            //console.log("UIView::goBack from " + subview.id);
            // remove subview
            subview.remove();
            this.subviews.pop();
            //console.log(this.subviews);
        },

        /*
         Animation
         */

        calculateAnimatedStyles: function(percent) {
            //console.log("UIView::calculateAnimatedStyles(" + percent + ")", this.class);

            var key,
                innerKey;

            //calculate all the fields in this.animation

            if (percent <= 1) {
                //console.log("percent <= 100");
                for (key in this.animation.keyframes['100%']) {
                    if (this.animation.keyframes['100%'].hasOwnProperty(key)) {
                        //console.log('key = ', key);
                        switch(key) {
                            case 'transform':

                                /*
                                 "translate": {
                                     "x": 75,
                                     "y": 0,
                                     "z": -75
                                 },
                                 "rotate": {
                                     "x": 45,
                                     "y": 90,
                                     "z": -45
                                 },
                                 "scale": {
                                     "x": 1,
                                     "y": 0.5,
                                     "z": 1
                                 }
                                 */

                                for (innerKey in this.animation.keyframes['100%'].transform) {
                                    if (this.animation.keyframes['100%'].transform.hasOwnProperty(innerKey)) {
                                        //console.log('innerKey = ', innerKey);
                                        switch(innerKey) {
                                            case 'translate':
                                            case 'rotate':
                                            case 'scale':
                                                //console.log('key = ', key);
                                                //console.log('innerKey = ', innerKey);
                                                //console.log("this.animation.keyframes['0'][key][innerKey] = ", this.animation.keyframes['0%'][key][innerKey]);
                                                //console.log("this.animation.keyframes['100'][key][innerKey] = ", this.animation.keyframes['100%'][key][innerKey]);

                                                if (this.animation.keyframes['100%'][key][innerKey].hasOwnProperty('x')) {
                                                    //console.log('x = ', this.animation.keyframes['100%'][key][innerKey].x);
                                                    this.animation.keyframes['current'][key][innerKey].x = this.animation.keyframes['0%'][key][innerKey].x + (this.animation.keyframes['100%'][key][innerKey].x - this.animation.keyframes['0%'][key][innerKey].x) * percent;
                                                }
                                                if (this.animation.keyframes['100%'][key][innerKey].hasOwnProperty('y')) {
                                                    this.animation.keyframes['current'][key][innerKey].y = this.animation.keyframes['0%'][key][innerKey].y + (this.animation.keyframes['100%'][key][innerKey].y - this.animation.keyframes['0%'][key][innerKey].y) * percent;
                                                }
                                                if (this.animation.keyframes['100%'][key][innerKey].hasOwnProperty('z')) {
                                                    this.animation.keyframes['current'][key][innerKey].z = this.animation.keyframes['0%'][key][innerKey].z + (this.animation.keyframes['100%'][key][innerKey].z - this.animation.keyframes['0%'][key][innerKey].z) * percent;
                                                }

                                                //console.log("this.animation.keyframes['current'][key][innerKey] = ", this.animation.keyframes['current'][key][innerKey]);

                                                break;
                                        }

                                        /*
                                        if (innerKey == 'rotate') {
                                            console.log(this.animation.keyframes['current'][key][innerKey].z);
                                        }
                                        */
                                    }
                                }

                                break;
                            case 'opacity':
                                this.animation.keyframes['current'][key] = this.animation.keyframes['0%'][key] + (this.animation.keyframes['100%'][key] - this.animation.keyframes['0%'][key]) * percent;
                                break;
                        }
                    }
                }
            } else {
                //console.log("percent > 100");
                if(this.animation.keyframes.hasOwnProperty('200%')) {
                    var percent2 = percent - 1;

                    for (key in this.animation.keyframes['100%']) {
                        if (this.animation.keyframes['100%'].hasOwnProperty(key)) {
                            //console.log('key = ', key);
                            switch(key) {
                                case 'transform':

                                    for (innerKey in this.animation.keyframes['100%'].transform) {
                                        if (this.animation.keyframes['100%'].transform.hasOwnProperty(innerKey)) {
                                            //console.log('innerKey = ', innerKey);
                                            switch(innerKey) {
                                                case 'translate':
                                                case 'rotate':
                                                case 'scale':
                                                    //console.log('key = ', key);
                                                    //console.log('innerKey = ', innerKey);
                                                    //console.log("this.animation.keyframes['0'][key][innerKey] = ", this.animation.keyframes['0%'][key][innerKey]);
                                                    //console.log("this.animation.keyframes['100'][key][innerKey] = ", this.animation.keyframes['100%'][key][innerKey]);


                                                    if (this.animation.keyframes['100%'][key][innerKey].hasOwnProperty('x')) {
                                                        //console.log('x = ', this.animation.keyframes['100%'][key][innerKey].x);
                                                        this.animation.keyframes['current'][key][innerKey].x = this.animation.keyframes['100%'][key][innerKey].x + (this.animation.keyframes['200%'][key][innerKey].x - this.animation.keyframes['100%'][key][innerKey].x) * percent2;
                                                    }
                                                    if (this.animation.keyframes['100%'][key][innerKey].hasOwnProperty('y')) {
                                                        this.animation.keyframes['current'][key][innerKey].y = this.animation.keyframes['100%'][key][innerKey].y + (this.animation.keyframes['200%'][key][innerKey].y - this.animation.keyframes['100%'][key][innerKey].y) * percent2;
                                                    }
                                                    if (this.animation.keyframes['100%'][key][innerKey].hasOwnProperty('z')) {
                                                        this.animation.keyframes['current'][key][innerKey].z = this.animation.keyframes['100%'][key][innerKey].z + (this.animation.keyframes['200%'][key][innerKey].z - this.animation.keyframes['100%'][key][innerKey].z) * percent2;
                                                    }

                                                    //console.log("this.animation.keyframes['current'][key][innerKey] = ", this.animation.keyframes['current'][key][innerKey]);

                                                    break;
                                            }
                                        }
                                    }

                                    break;
                                case 'opacity':
                                    this.animation.keyframes['current'][key] = this.animation.keyframes['100%'][key] + (this.animation.keyframes['200%'][key] - this.animation.keyframes['100%'][key]) * percent2;
                                    break;
                            }
                        }
                    }
                }

            }

        },

        applyAnimatedStyles: function(animated) {
            //console.log("UIView::applyAnimatedStyles");

            //console.log("this.animation.keyframes['current'] = ", this.animation.keyframes['current']);

            var styleAttribute = '',
                translateX, translateY, translateZ,
                //rotateX, rotateY, rotateZ,
                scaleX, scaleY, scaleZ;

            if (animated){
                styleAttribute += "transition: transform 0.6s cubic-bezier(0, 0, 0, 1), opacity 0.6s cubic-bezier(0, 0, 0, 1); ";
            }

            if (this.animation.keyframes['current'].transform) {
                styleAttribute += "transform:";

                if (this.animation.keyframes['current'].transform.translate) {
                    // translate3d(x,y,z)
                    translateX = this.animation.keyframes['current'].transform.translate.x ? this.animation.keyframes['current'].transform.translate.x + 'px' : 0;
                    translateY = this.animation.keyframes['current'].transform.translate.y ? this.animation.keyframes['current'].transform.translate.y + 'px' : 0;
                    translateZ = this.animation.keyframes['current'].transform.translate.z ? this.animation.keyframes['current'].transform.translate.z + 'px' : 0;

                    styleAttribute += "translate3d(" + translateX + ", " + translateY + ", " + translateZ + ") ";
                }

                if (this.animation.keyframes['current'].transform.rotate) {
                    // rotate3d(x,y,z,deg)
                    // TODO: Decide to check value of rotation or not.

                    if (this.animation.keyframes['current'].transform.rotate.hasOwnProperty('x')) styleAttribute += "rotate3d(1, 0, 0, " + this.animation.keyframes['current'].transform.rotate.x + "deg) ";
                    if (this.animation.keyframes['current'].transform.rotate.hasOwnProperty('y')) styleAttribute += "rotate3d(0, 1, 0, " + this.animation.keyframes['current'].transform.rotate.y + "deg) ";
                    if (this.animation.keyframes['current'].transform.rotate.hasOwnProperty('z')) styleAttribute += "rotate3d(0, 0, 1, " + this.animation.keyframes['current'].transform.rotate.z + "deg) ";
                }

                if (this.animation.keyframes['current'].transform.scale) {
                    // scale3d(x,y,z)
                    scaleX = this.animation.keyframes['current'].transform.scale.x ? this.animation.keyframes['current'].transform.scale.x : 1;
                    scaleY = this.animation.keyframes['current'].transform.scale.y ? this.animation.keyframes['current'].transform.scale.y : 1;
                    scaleZ = this.animation.keyframes['current'].transform.scale.z ? this.animation.keyframes['current'].transform.scale.z : 1;

                    styleAttribute += "scale3d(" + scaleX + ", " + scaleY + ", " + scaleZ + ")";
                }

                styleAttribute += "; ";
            }

            if (this.animation.keyframes['current'].hasOwnProperty('opacity')) {
                styleAttribute += "opacity:" + this.animation.keyframes['current'].opacity + "; ";
            }

            //console.log("styleAttribute = ", styleAttribute);

            if (styleAttribute) this.$el.attr("style", styleAttribute);
        },

        onSwipe: function(percent) {
            //console.log("UIView::onSwipe");
            //console.log("this.id = " + this.id + " " + percent);

            if (this.animation && this.animation.on == "swipe") {
                this.calculateAnimatedStyles(percent);
                this.applyAnimatedStyles(false);
            }
        },

        onBound: function(percent) {
            //console.log("UIView::onBound");
            //console.log("this.animation.on = " + this.animation.on);

            if (this.animation && this.animation.on == "swipe") {
                //console.log("yes onSwipe");
                this.calculateAnimatedStyles(percent);
                this.applyAnimatedStyles(true);
            }
        },

        onAppear: function() {
            //console.log("UIView::onAppear");
            //console.log(this.id);

            // TODO: check undefined
            if (this.animation && this.animation.on == "appear") {
                this.calculateAnimatedStyles(1);
                this.applyAnimatedStyles(true);
            }

        },

        onDisappear: function() {
            //console.log("UIView::onDisappear");

            this.calculateAnimatedStyles(0);
            this.applyAnimatedStyles(false);
        }

    });

});
define('uikit/UIButton',[
    "jquery",
    "underscore",
    "backbone",
    "./UIView"
], function($, _, Backbone, UIView){

    // UIButton
    return UIView.extend({
        className: "ui-btn",
        template: _.template('<span class="btn-text"><%= label %></span>'),
        templateIcon: _.template('<span class="btn-icon <%= icon %>"></span><span class="btn-text"><%= label %></span>'),

        action: null,

        label: "",
        icon: null,

        events: {
            "tapone": "taponeHandler",

            "touchstart": "touchstartHandler",
            "touchend": "touchendHandler",
            "swipemove": "swipemoveHandler"
        },

        render: function() {
            //console.log("UIButton::render");
            this.$el.empty();

            // set class
            this.setClass(this.class);

            // apply label
            var json = {};
            json.label = this.label;

            if (this.icon) {
                json.icon = this.icon;
                this.$el.html(this.templateIcon(json));
            } else {
                this.$el.html(this.template(json));
            }

            // apply disabled
            if (this.disabled) {
                this.$el.addClass("ui-dis");
            }
            // apply hidden
            if (this.hidden) {
                this.$el.addClass("ui-hid");
            }

            return this;
        },

        setLabel: function(newLabel) {
            this.label = newLabel;
            // redraw
            //this.render();
            $("a", this.$el).html(this.label);
        },

        taponeHandler: function(event) {
            //console.log("UIButton::taponeHandler");

            if (this.action && this.disabled == false) {
                this.action();
                //event.stopPropagation();
            } else {
                console.log("disabled or there is no action");
            }
        }

    });

});
define('uikit/UIStepper',[
    "jquery",
    "underscore",
    "backbone",
    "./UIView",
    "./UIButton"
], function($, _, Backbone, UIView,
            UIButton
){

    // UIStepper
    return UIView.extend({
        className: "ui-stepper",

        value: 0,
        minimumValue: 0,
        maximumValue: 1000,
        stepValue: 1,
        autorepeat: false,
        //wraps: false,

        decButton: null,
        incButton: null,

        render: function() {
            //console.log("UIStepper::render");

            var thisView = this;

            this.$el.empty();

            // set class
            this.setClass(this.class);

            // apply disabled
            if (this.disabled) {
                this.$el.addClass("ui-dis");
            }
            // apply hidden
            if (this.hidden) {
                this.$el.addClass("ui-hid");
            }

            // UI
            this.decButton = new UIButton({
                class: 'ui-stepper-dec-btn',
                label: '–',
                action: function () {
                    thisView.decreaseValue();
                }
            });
            this.addSubview(this.decButton);

            this.incButton = new UIButton({
                class: 'ui-stepper-inc-btn',
                label: '+',
                action: function () {
                    thisView.increaseValue();
                }
            });
            this.addSubview(this.incButton);

            this.update();

            return this;
        },

        update: function () {
            //console.log("UIStepper::update");

            console.log(this.value);

            if (this.value <= this.minimumValue) {
                this.decButton.disable();
                this.incButton.enable();
            } else if (this.value > this.minimumValue && this.value < this.maximumValue) {
                this.decButton.enable();
                this.incButton.enable();
            } else if (this.value >= this.maximumValue) {
                this.decButton.enable();
                this.incButton.disable();
            }
        },

        decreaseValue: function () {
            //console.log("UIStepper::decreaseValue");

            var newValue = this.value - this.stepValue;
            if (newValue <= this.minimumValue) {
                newValue = this.minimumValue;
            }
            this.value = newValue;
            this.update();
        },

        increaseValue: function () {
            //console.log("UIStepper::increaseValue");

            var newValue = this.value + this.stepValue;
            if (newValue >= this.maximumValue) {
                newValue = this.maximumValue;
            }
            this.value = newValue;
            this.update();
        }

    });

});
define('uikit/UILabel',[
    "jquery",
    "underscore",
    "backbone",
    "./UIView"
], function($, _, Backbone, UIView){

    // UILabel
    return UIView.extend({
        className: "ui-label",
        tagName: "label",

        text: "",
        width: null,
        textAlignment: null,

        render: function() {
            //console.log("UILabel::render");
            this.$el.empty();
            // set additional CSS-class
            this.setClass(this.class);
            // set text
            this.$el.html(this.text);
            // style
            var styleAttrLine = "";
            if (this.width !== null) styleAttrLine += "width:" + this.width + "; ";
            if (this.textAlignment !== null) styleAttrLine += "text-align:" + this.textAlignment + "; ";

            if (styleAttrLine) this.$el.attr("style", styleAttrLine);
            return this;
        },

        setText: function(newText) {
            this.text = newText;
            // redraw
            this.$el.html(this.text);
        }

    });

});
define('uikit/UITextField',[
    "jquery",
    "underscore",
    "backbone",
    "./UIView"
], function($, _, Backbone, UIView){

    // UITextField
    return UIView.extend({
        className: "ui-text-field",
        templateInput: _.template('<input type="<%= type %>" class="input-text" id="<%= name %>" name="<%= name %>" placeholder="<%= placeholder %>" value="<%= text %>">'),
        templateData: _.template('<div class="data-text" id="<%= name %>"><%= text %></div>'),
        templatePhoneNumber: _.template('<div class="data-text"><a href="tel:+<%= text %>">+<%= text %></a></div>'),
        // TODO: add hidden input

        type: "text",
        name: "",
        text: "",
        placeholder: "",
        editable: true,
        textAlignment: "left",
        phoneNumber: false,

        render: function() {
            //console.log("UITextField::render");
            this.$el.empty();

            var json = {};
            json.type = this.type;
            json.name = this.name;
            json.text = this.text;
            json.placeholder = this.placeholder;
            if (this.editable) {
                // input
                this.$el.html(this.templateInput(json));
            } else {
                if (!this.phoneNumber) {
                    // just text data
                    this.$el.html(this.templateData(json));
                } else {
                    // phone number - click to call
                    this.$el.html(this.templatePhoneNumber(json));
                }
            }

            // apply disabled
            if (this.disabled) {
                this.$el.addClass("ui-dis");
            }
            // apply hidden
            if (this.hidden) {
                this.$el.addClass("ui-hid");
            }
            // class
            if (this.class) this.setClass(this.class);
            // events
            $(this.$el).on("change keyup paste", "input", this.changeHandler);

            // set text alignment
            switch(this.textAlignment) {
                case "left":
                    break;
                case "center":
                    this.setClass("text-align-center");
                    break;
                case "right":
                    break;
            }

            return this;
        },

        setText: function(newText) {
            //console.log("UITextField::setText");
            this.text = newText;
            this.render();
        },

        changeHandler: function() {
            //console.log("UITextField::changeHandler");
            this.text = $("input", this.$el).val();
            //console.log(this.text);
        },

        focus: function() {
            console.log("UITextField::focus");
            $("input", this.$el).focus();
        }

    });

});
define('uikit/UITextView',[
    "jquery",
    "underscore",
    "backbone",
    "./UIView"
], function($, _, Backbone, UIView){

    // UITextView
    return UIView.extend({
        className: "ui-text-view",
        // <textarea rows="10" cols="45" name="text"></textarea>
        templateTextarea: _.template('<textarea class="input-text" name="<%= name %>" placeholder="<%= placeholder %>" rows="" cols=""><%= text %></textarea>'),
        templateData: _.template('<div class="data-text"><%= text %></div>'),
        // TODO: add hidden input

        name: "",
        text: "",
        placeholder: "",
        editable: true,
        textAlignment: "left",

        render: function() {
            //console.log("UITextView::render");
            this.$el.empty();

            // set additional CSS-class
            this.setClass(this.class);

            var json = {};
            json.name = this.name;
            json.text = this.text;
            json.placeholder = this.placeholder;
            if (this.editable) {
                // input
                this.$el.html(this.templateTextarea(json));
            } else {
                // just text data
                this.$el.html(this.templateData(json));
            }

            // apply disabled
            if (this.disabled) {
                this.$el.addClass("ui-dis");
            }
            // apply hidden
            if (this.hidden) {
                this.$el.addClass("ui-hid");
            }
            // class
            if (this.class) this.setClass(this.class);
            // events
            $("input", this.$el).on('change keyup paste', this.changeHandler);

            // set text alignment
            switch(this.textAlignment) {
                case "left":
                    break;
                case "center":
                    this.setClass("text-align-center");
                    break;
                case "right":
                    break;
            }

            return this;
        },

        setText: function(newText) {
            this.text = newText;
            this.$el.html(this.text);
        },

        changeHandler: function() {
            //console.log("UITextView::changeHandler");
            this.text = $("input", this.$el).attr("value");
            //console.log(this.text);
        },

        focus: function() {
            console.log("UITextView::focus");
            $("textarea", this.$el).focus();
        }

    });

});
define('uikit/UIImageView',[
    "jquery",
    "underscore",
    "backbone",
    "./UIView"
], function($, _, Backbone, UIView){

    // UIImageView
    return UIView.extend({
        className: "ui-image-view",
        //template: _.template('<a href="javascript:void(0);"><%= label %></a>'),
        imageUrl: null,
        frameWidth: null,
        frameHeight: null,
        imageWidth: 0,
        imageHeight: 0,

        status: null, // loaded, error

        image: null,

        initialize: function(options) {
            //console.log("UIImageView::initialize");

            UIView.prototype.initialize.apply(this, [options]);

            this.image = new Image();
        },

        render: function() {
            //console.log("UIImageView::render");

            this.$el.empty();
            // set additional CSS-class
            this.setClass(this.class);

            var styleAttrLine = "";
            if (this.frameWidth !== null) styleAttrLine += "width:" + this.frameWidth + "; ";
            if (this.frameHeight !== null) styleAttrLine += "height:" + this.frameHeight + "; ";
            if (this.status == "loaded") {
                styleAttrLine += "background-image: url(" + this.imageUrl +");";
            }
            styleAttrLine += "background-size: " + this.imageWidth + " " + this.imageHeight + ";";

            this.$el.attr("style", styleAttrLine);

            return this;
        },

        load: function() {
            console.log("UIImageView::load");
            this.beforeLoad();

            //var thisImageView = this;

            $(this.image)
                .one('load', function() {
                    this.complete();
                    this.success();
                })
                .one('error', function() {
                    this.complete();
                    this.error();
                })
                .attr('src', this.imageUrl).each(function() {
                    // fail-safe for cached images which sometimes don't trigger "load" events
                    if(this.complete){  //cached image
                        $(this).trigger('load');
                    }
                });
        },

        beforeLoad : function () {
            console.log("UIImageView::beforeLoad");
            // show indicator
        },
        complete : function () {
            console.log("UIImageView::complete");
            // remove indicator
        },
        success : function() {
            console.log("UIImageView::success");
            console.log("@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!");
            alert("UIImageView::success");
            // show the image
            this.status = "loaded";
            this.render();
        },
        error : function() {
            console.log("UIImageView::error");
            // TODO: show error sign
            this.status = "error";
            this.render();
        }

    });

});
define('uikit/UINavigationBar',[
    "jquery",
    "underscore",
    "backbone",
    "./UIView"
], function($, _, Backbone, UIView){

    // UINavigationBar
    return UIView.extend({
        className: "ui-view ui-navigation-bar",

        template: `
            <div class="left-place"></div>
            <div class="center-place"></div>
            <div class="right-place"></div>
        `,

        leftBarItems: null,
        centerBarItems: null,
        rightBarItems: null,

        events: {
            "touchstart": "touchstartHandler",
            "touchend": "touchendHandler",
            "tapone": "taponeHandler",
            "swipemove": "swipemoveHandler"
        },

        render: function() {
            //console.log("UINavigationBar::render");

            var thisView = this,
                $leftPlace,
                $centerPlace,
                $rightPlace;

            this.$el.empty();
            this.$el.html(this.template);

            $leftPlace = $('.left-place', this.$el);
            $centerPlace = $('.center-place', this.$el);
            $rightPlace = $('.right-place', this.$el);

            _.each(this.leftBarItems, function(item) {
                thisView.addSubview(item, $leftPlace)
            });

            _.each(this.centerBarItems, function(item) {
                thisView.addSubview(item, $centerPlace)
            });

            _.each(this.rightBarItems, function(item) {
                thisView.addSubview(item, $rightPlace)
            });

            return this;
        }

    });

});
define('uikit/UITabBarItem',[
    "jquery",
    "underscore",
    "backbone",
    "./UIView"
], function($, _, Backbone, UIView){

    // UITabBarItem
    return UIView.extend({
        className: "ui-tab-bar-item",
        template: _.template('<span class="tab-bar-item-icon icon-<%= icon %>"></span><span class="tab-bar-item-text"><%= title %></span>'),

        events: {
            "tapone": "taponeHandler"
        },

        icon: "",
        title: "",
        index: null,

        selected: false,

        render: function() {
            //console.log("UITabBarItem::render");
            this.$el.empty();

            var json = {};
            json.icon = this.icon;
            json.title = this.title;
            this.$el.html(this.template(json));

            return this;
        },

        taponeHandler: function() {
            console.log("UITabBarItem::action");
            this.superview.selectItem(this.index);
        },

        select: function() {
            //console.log("UITabBarItem::select");
            this.$el.addClass("selected");
        },

        deselect: function() {
            //console.log("UITabBarItem::deselect");
            this.$el.removeClass("selected");
        }

    });

});

define('uikit/UITabBar',[
    "jquery",
    "underscore",
    "backbone",
    "./UIView",
    "./UITabBarItem"
], function($, _, Backbone, UIView, UITabBarItem){

    // UITabBar
    return UIView.extend({
        className: "ui-tab-bar",

        items: null,
        selectedIndex: 0,

        render: function() {
            //console.log("UITabBar::render");
            this.$el.empty();

            this.items = [];
            var thisView = this;

            _.each(this.superview.subviews, function(superSubview, index){
                var uiTabBarItem = new UITabBarItem({
                    icon: superSubview.icon,
                    title: superSubview.title,
                    index: index,
                    superview: thisView
                });
                thisView.items.push(uiTabBarItem);
                thisView.$el.append(uiTabBarItem.render().el);
            });

            this.selectItem(this.selectedIndex);

            return this;
        },

        selectItem: function(index) {
            console.log("UITabBar::selectItem");
            console.log("index = " + index);

            // 1) save index
            this.selectedIndex = index;

            // 2) items
            var thisView = this;
            _.each(this.items, function(item){
                item.deselect();
            });
            this.items[this.selectedIndex].select();

            // 3) views
            //console.log("this.superview.subviews[this.selectedIndex].id = " + this.superview.subviews[this.selectedIndex].id);
            this.superview.bringSubviewToFront(this.superview.subviews[this.selectedIndex]);
        }

    });

});
define('uikit/UIScrollView',[
    "jquery",
    "underscore",
    "backbone",
    "./UIView"
], function($, _, Backbone, UIView){

    // UIScrollView
    return UIView.extend({
        className: "ui-view ui-scroll-view",

        $content: null,

        scale: 1,
        currentScale: 1,
        maximumScale: 1000,
        minimumScale: 0.0000001,

        firstPinch: true,
        pinch: {
            x: 0,
            y: 0
        },

        translate: {
            x: 0,
            y: 0
        },
        pinchRelativeTranslate: {
            x: 0,
            y: 0
        },

        events: {
            touchstart: 'touchstartHandler',
            touchend: 'touchendHandler',
            //pinch: 'pinchHandler',
            //swipemove: 'swipemoveHandler',
            pinch: 'gestureHandler',
            swipemove: 'gestureHandler'
        },

        /*
        initialize: function (options) {
            //console.log("UIScrollView::initialize");
            UIView.prototype.initialize.apply(this, [options]);
        },
        */

        render: function() {
            //console.log('UIScrollView::render');
            this.$el.empty();

            // class
            if (this.class) this.setClass(this.class);

            this.$el.append('<div class="scroll-content"></div>');

            this.$content = $('.scroll-content', this.$el);

            this.applyTransforms();

            return this;
        },

        addSubview: function(view) {
            //console.log('UIScrollView::addSubview);

            this.$content.append(view.render().el);

            view.superview = this;
            this.subviews.push(view);
        },

        setOffset: function(translate) {
            //console.log('UIScrollView::setOffset);
            this.translate = translate;

            this.applyTransforms();
        },

        setScale: function(scale) {
            //console.log('UIScrollView::setScale);

            if (scale < this.minimumScale) {
                scale = this.minimumScale;
            } else if (scale > this.maximumScale) {
                scale = this.maximumScale;
            }

            this.scale = scale;
            this.currentScale = scale;

            this.applyTransforms();
        },

        setScaleRelativeToPoint: function(scale, point) {
            console.log('UIScrollView::setScaleRelativeToPoint(' + scale + ', {' + point.x + ':' + point.y + '}' + ')');

            var pinchRelativeTranslate = {
                x: 0,
                y: 0
            };

            // 0) calc scale
            /*
            if (scale < this.minimumScale) {
                scale = this.minimumScale;
            } else if (scale > this.maximumScale) {
                scale = this.maximumScale;
            }
            */

            //console.log('scale = ', scale);
            //this.scale = scale;
            //this.currentScale = scale;

            // 1) calc coordinates of real origin point for the new coordinate system (point.x, point.y)
            console.log('this.translate.x, = ' + this.translate.x);
            console.log('this.translate.y, = ' + this.translate.y);
            console.log('point.x, = ' + point.x);
            console.log('point.y, = ' + point.y);

            pinchRelativeTranslate.x = this.translate.x - point.x;
            pinchRelativeTranslate.y = this.translate.y - point.y;

            console.log('pinchRelativeTranslate = ', pinchRelativeTranslate);

            // 2) calc scale
            this.currentScale = this.scale * scale;

            // 3) calc translates (x, y) to compensate scale in the new coordinate system
            this.translate.x = pinchRelativeTranslate.x * scale + point.x;
            this.translate.y = pinchRelativeTranslate.y * scale + point.y;

            /*

             // 2) calc scale
             this.currentScale = this.scale * obj.scale;

             // 3) calc translates (x, y) to compensate scale in the new coordinate system

             this.translate.x = this.pinchRelativeTranslate.x * obj.scale + this.pinch.x;

             */

            this.applyTransforms();
            this.scale = this.currentScale;
        },

        contentSize: function() {
            //console.log('UIScrollView::contentSize);
            var rect = {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                width: 0,
                height: 0
            };

            if (this.$content) {
                rect = this.$content[0].getBoundingClientRect();
            }

            return {
                width: rect.width,
                height: rect.height
            }
        },

        applyTransforms: function() {
            console.log('UIScrollView::applyTransforms');
            var style = '';
            style += 'transform: ';
            style += 'translate3d(' + this.translate.x + 'px, ' + this.translate.y +'px, 0px) ';
            style += 'scaleX(' + this.currentScale +') scaleY(' + this.currentScale +') ';
            style += ';';
            this.$content.attr('style', style);
        },

        touchstartHandler: function(event) {
            console.log('UIScrollView::touchstartHandler');
            //event.stopPropagation();
            //return false;
        },

        touchendHandler: function(event) {
            console.log('UIScrollView::touchendHandler');

            this.scale = this.currentScale;
            this.firstPinch = true;

            //event.stopPropagation();
            //return false;
        },

        gestureHandler: function(event, obj) {
            //console.log('UIScrollView::gestureHandler');

            event.preventDefault();
            obj.originalEvent.preventDefault();

            var description = obj.description.split(':'), // 'swipemove:1:left:up' => ['swipemove','1','left','up']
                // swipe
                deltaX = 0,
                deltaY = 0,
                scale;


            switch (description[0]) {
                case 'pinch':
                    console.log('pinch');

                    scale = this.scale * obj.scale;

                    if (scale < this.minimumScale || scale > this.maximumScale) {
                        console.log('< minimumScale ||  > maximumScale');
                    } else {

                        if (this.firstPinch) {
                            // 1) (0,0) for the new coordinate system
                            this.pinch.x = obj.originalEvent.layerX;
                            this.pinch.y = obj.originalEvent.layerY;

                            console.log(this.pinch.x + ' : ' + this.pinch.y);

                            // calc coordinates of real origin point for the new coordinate system (this.pinch.x, this.pinch.y)
                            this.pinchRelativeTranslate.x = this.translate.x - this.pinch.x;
                            this.pinchRelativeTranslate.y = this.translate.y - this.pinch.y;

                        }

                        this.firstPinch = false;

                        // 2) calc scale
                        this.currentScale = this.scale * obj.scale;

                        // 3) calc translates (x, y) to compensate scale in the new coordinate system

                        this.translate.x = this.pinchRelativeTranslate.x * obj.scale + this.pinch.x;
                        this.translate.y = this.pinchRelativeTranslate.y * obj.scale + this.pinch.y;

                    }

                    // '-webkit-transform','scale('+ ( obj.direction * obj.delta[0].moved ) +')');
                    break;
                case  'rotate':
                    console.log('rotate');
                    // '-webkit-transform','rotate('+ ( obj.delta[0].moved ) +'deg)');
                    break;

                case  'swipemove':
                    // handle swipemove only with 1 finger
                    if (description[1] == 1) {
                        console.log('swipemove with 1 finger');

                        deltaX= obj.delta[0].startX;
                        deltaY = obj.delta[0].startY;

                        this.translate.x = deltaX + this.translate.x;
                        this.translate.y = deltaY + this.translate.y;

                        //this.firstPinch = true;

                        // css('left')) + obj.delta[0].startX );
                        // css('top')) + obj.delta[0].startY );
                        // $(obj.originalEvent.currentTarget).data('moving',true)
                    }
                    break;

                case 'swipe' :
                    console.log('swipe');
                    // if(_a[1] != 1 || jQuery(obj.originalEvent.currentTarget).data('moving') } {break;}
                    // css('left', parseInt(jQuery(obj.originalEvent.currentTarget).css('left')) + obj.delta[0].startX );
                    // css('top', parseInt(jQuery(obj.originalEvent.currentTarget).css('top')) + obj.delta[0].startY );
                    break;
            }

            this.applyTransforms();
        }

    });

});
define('uikit/UIActivityIndicatorView',[
    "jquery",
    "underscore",
    "backbone",
    "./UIView"
], function($, _, Backbone, UIView){

    // UIActivityIndicatorView
    return UIView.extend({
        className: "ui-activity-indicator-view",

        isAnimating: true,

        render: function() {
            //console.log("UIActivityIndicatorView::render");
            this.$el.empty();

            if (this.isAnimating) {
                this.startAnimating();
            }

            return this;
        },

        startAnimating: function() {
            //console.log("UIActivityIndicatorView::render");

            this.isAnimating = true;
            this.$el.addClass('animating');
        },

        stopAnimating: function() {
            //console.log("UIActivityIndicatorView::render");

            this.isAnimating = false;
            this.$el.removeClass('animating');
        }


});

});
define('uikit/alertView',[
    "jquery",
    "underscore",
    "backbone",
    "./UIView",
    "./UIButton",
    "./UILabel"
], function($, _, Backbone,
            UIView,
            UIButton,
            UILabel
){

    // UIAlertView
    return function (title, message) {

        var UIAlertView = UIView.extend({
                className: "ui-alert-view",
                template: `<div class="ui-alert-content"></div>`,

                title: '',
                message: '',

                render: function() {
                    //console.log("UIAlertView::render");
                    var thisView = this,
                        $content;

                    this.$el.empty();
                    this.$el.html(this.template);

                    $content = $('.ui-alert-content', this.$el);

                    this.addSubview(new UILabel({
                        class: 'alert-title-label',
                        text: this.title
                    }), $content);

                    this.addSubview(new UILabel({
                        class: 'alert-message-label',
                        text: this.message
                    }), $content);

                    this.addSubview(new UIButton({
                        class: 'alert-ok-btn',
                        label: 'OK',
                        action: function () {
                            thisView.hide();
                        }
                    }), $content);

                    return this;
                },

                show: function () {
                    //console.log("UIAlertView::show");
                    $('body').append(this.render().el);
                },

                hide: function () {
                    //console.log("UIAlertView::hide");
                    this.destroy();
                }
            }),
            alertView = new UIAlertView({
                title: title,
                message: message
            });

        alertView.show();

    }

});
define('uikit/confirmView',[
    "jquery",
    "underscore",
    "backbone",
    "./UIView",
    "./UIButton",
    "./UILabel"
], function($, _, Backbone,
            UIView,
            UIButton,
            UILabel
){

    // UIConfirmView
    return function (title, message) {

        var UIConfirmView = UIView.extend({
                className: "ui-confirm-view",
                template: `
                    <div class="ui-confirm-content">
                        <div class="text-place"></div>
                        <div class="buttons-place"></div>
                    </div>`
                ,

                title: '',
                message: '',

                render: function() {
                    //console.log("UIConfirmView::render");
                    var thisView = this,
                        $textPlace,
                        $buttonsPlace;

                    this.$el.empty();
                    this.$el.html(this.template);

                    $textPlace = $('.text-place', this.$el);
                    $buttonsPlace = $('.buttons-place', this.$el);

                    this.addSubview(new UILabel({
                        class: 'confirm-title-label',
                        text: this.title
                    }), $textPlace);

                    this.addSubview(new UILabel({
                        class: 'confirm-message-label',
                        text: this.message
                    }), $textPlace);

                    this.addSubview(new UIButton({
                        class: 'confirm-cancel-btn',
                        label: 'Cancel',
                        action: function () {
                            thisView.hide();
                        }
                    }), $buttonsPlace);

                    this.addSubview(new UIButton({
                        class: 'confirm-ok-btn',
                        label: 'OK',
                        action: function () {
                            thisView.hide();
                        }
                    }), $buttonsPlace);

                    return this;
                },

                show: function () {
                    //console.log("UIConfirmView::show");
                    $('body').append(this.render().el);
                },

                hide: function () {
                    //console.log("UIConfirmView::hide");
                    this.destroy();
                }
            }),
            confirmView = new UIConfirmView({
                title: title,
                message: message
            });

        confirmView.show();

    }

});
define('uikit/modalView',[
    "jquery",
    "underscore",
    "backbone",
    "./UIView"
], function($, _, Backbone, UIView) {

    // UIModalView
    return function (contentView) {

        var UIModalView = UIView.extend({
                className: "ui-modal-view",

                contentView: null,

                render: function () {
                    //console.log("UIModalView::render");

                    this.$el.empty();
                    this.$el.html(this.template);

                    if (this.contentView) {
                        this.addSubview(this.contentView);
                    } else {
                        console.error('contentView is needed')
                    }

                    return this;
                },

                show: function () {
                    //console.log("UIModalView::show");
                    $('body').append(this.render().el);
                },

                hide: function () {
                    //console.log("UIModalView::hide");
                    this.destroy();
                }

            }),
            modalView = new UIModalView({
                contentView: contentView
            });

        modalView.show();

    }

});
/*global define */

/**
 * The main module that defines the public interface for uikit.
 */
define('uikit',['require','./uikit/UIView','./uikit/UIButton','./uikit/UIStepper','./uikit/UILabel','./uikit/UITextField','./uikit/UITextView','./uikit/UIImageView','./uikit/UINavigationBar','./uikit/UITabBarItem','./uikit/UITabBar','./uikit/UIScrollView','./uikit/UIActivityIndicatorView','./uikit/alertView','./uikit/confirmView','./uikit/modalView'],function (require) {
    'use strict';

    //Return the module value.
    return {
        version: '1.0.0',
        UIView: require('./uikit/UIView'),
        UIButton: require('./uikit/UIButton'),
        //UISegmentedControl: require('./uikit/UISegmentedControl'),
        UIStepper: require('./uikit/UIStepper'),
        UILabel: require('./uikit/UILabel'),
        UITextField: require('./uikit/UITextField'),
        UITextView: require('./uikit/UITextView'),
        UIImageView: require('./uikit/UIImageView'),
        UINavigationBar: require('./uikit/UINavigationBar'),
        UITabBarItem: require('./uikit/UITabBarItem'),
        UITabBar: require('./uikit/UITabBar'),
        //UITableViewCell: require('./uikit/UITableViewCell'),
        //UITableView: require('./uikit/UITableView'),
        UIScrollView: require('./uikit/UIScrollView'),
        UIActivityIndicatorView: require('./uikit/UIActivityIndicatorView'),
        alert: require('./uikit/alertView'),
        confirm: require('./uikit/confirmView'),
        modal: require('./uikit/modalView')
        //prompt: require('./uikit/UIPromptView'), // UIAlertViewStylePlainTextInput
        //login: require('./uikit/UILoginView') // UIAlertViewStyleLoginAndPasswordInput
    };
});

    //Register in the values from the outer closure for common dependencies
    //as local almond modules
    define('jquery', function () {
        return $;
    });
    define('underscore', function () {
        return _;
    });
    define('backbone', function () {
        return Backbone;
    });

    //Use almond's special top-level, synchronous require to trigger factory
    //functions, get the final module value, and export it as the public
    //value.
    return require('uikit');
}));
