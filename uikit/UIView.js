define([
    "jquery",
    "underscore",
    "backbone"
], function($, _, Backbone){

    // UIView
    return Backbone.View.extend({
        className: "ui-view",

        // Rectangle
        overflow: null, // hidden | scroll | ...
        display: "block",
        position: null,
        top: null,
        left: null,
        bottom: null,
        right: null,

        minWidth: null,
        width: null,
        maxWidth: null,

        minHeight: null,
        height: null,
        maxHeight: null,

        margin: null,
        padding: null,

        backgroundColor: null,
        backgroundImage: null,
        backgroundSize: "100% 100%",    // auto | xWidth yHeight |  width% height% | cover | contain | initial | inherit
        backgroundPosition: "0% 0%",    // xPos yPos | x% y%

        transformStyle: null,           // flat | preserve-3d
        perspective: null,              // none | length

        translateX: null,
        translateY: null,
        translateZ: null,

        transformOriginX: null,
        transformOriginY: null,
        transformOriginZ: null,

        // Flex
        // specifies whether the children of a box should be laid out horizontally or vertically.
        //-webkit-box-orient: horizontal;
        orient: null, // horizontal | vertical |inline-axis | block-axis | inherit;

        // specifies the horizontal position in horizontal boxes, and the vertical position in vertical boxes
        //-webkit-box-pack: center;
        pack: null, // start | end | center | justify;

        // specifies how to align the child elements of a box
        //-webkit-box-align: center;
        align: null, // start | end | center | baseline | stretch

        flex: null, // 0..N

        // Animation
        animation: null,
        /*
        animation: {
            on: "none",
            keyframes: {
                current: {}
            }
        },
        */
        /*
         end: {
         // translate3d(x,y,z)
         translateX: null,
         translateY: null,
         translateZ: null,
         // scale3d(x,y,z)
         scaleX: null, // changes the element's width
         scaleY: null, // changes the element's height
         scaleZ: null, // http://stackoverflow.com/questions/7819802/what-does-the-scalez-css-transform-function-do
         // rotate3d(x,y,z,angle)
         rotateX: null,
         rotateY: null,
         rotateZ: null,
         // visual
         opacity: null,
         backgroundColor: null
         }
         */

        /*
         transition: {
         duration: null,
         timingFunction: null,
         delay: null
         },
         */

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
                            x: 1, // changes the element's width
                            y: 1, // changes the element's height
                            z: 1 // http://stackoverflow.com/questions/7819802/what-does-the-scalez-css-transform-function-do
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
            // http://stackoverflow.com/questions/9522845/backbone-js-remove-all-sub-views
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

            // image
            //this.imageWatch();
            // rect
            this.rect();
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

        imageWatch: function() {
            //console.log("UIView::image");
            if (this.backgroundImage !== null) {

                var thisImageView = this;

                // or just $('<img>')
                this.image = new Image();
                $(this.image)
                    .one('load', function() {
                        thisImageView.complete();
                        thisImageView.success();
                    })
                    .one('error', function() {
                        thisImageView.complete();
                        thisImageView.error();
                    })
                    .attr('src', this.backgroundImage);

                /*
                 .each(function() {
                 // fail-safe for cached images which sometimes don't trigger "load" events
                 if(this.complete){  //cached image
                 $(this).trigger('load');
                 }
                 // if(this.complete) $(this).load();
                 });
                 */
            }
        },

        beforeLoad : function () {
            //console.log("UIView::beforeLoad");
            // show indicator
        },
        complete : function () {
            console.log("UIView::complete");
            // remove indicator
        },
        success : function() {
            //console.log("UIView::success");
            //console.log("@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!");
            //alert("UIImageView::success");
            // show the image
            this.status = "loaded";
            //this.render();
        },
        error : function() {
            //console.log("UIView::error");
            // TODO: show error sign
            this.status = "error";
            //this.render();
        },

        rect: function() {
            //console.log("UIView::rect, this.className = " + this.className);

            // style
            /*
            var styleAttrLine = "";

            if (this.overflow !== null) styleAttrLine += "overflow:" + this.overflow + "; ";

            if (this.top !== null || this.left !== null || this.bottom !== null || this.right !== null) this.position = "absolute";

            if (this.position != null) styleAttrLine += "position:" + this.position + "; ";

            if (this.top !== null) styleAttrLine += "top:" + this.top + "; ";
            if (this.left !== null) styleAttrLine += "left:" + this.left + "; ";
            if (this.bottom !== null) styleAttrLine += "bottom:" + this.bottom + "; ";
            if (this.right !== null) styleAttrLine += "right:" + this.right + "; ";

            if (this.minWidth !== null) styleAttrLine += "min-width:" + this.minWidth + "; ";
            if (this.width !== null) styleAttrLine += "width:" + this.width + "; ";
            if (this.maxWidth !== null) styleAttrLine += "max-width:" + this.maxWidth + "; ";

            if (this.minHeight !== null) styleAttrLine += "min-height:" + this.minHeight + "; ";
            if (this.height !== null) styleAttrLine += "height:" + this.height + "; ";
            if (this.maxHeight !== null) styleAttrLine += "max-height:" + this.maxHeight + "; ";

            if (this.margin !== null) styleAttrLine += "margin:" + this.margin + "; ";
            if (this.padding !== null) styleAttrLine += "padding:" + this.padding + "; ";

            if (this.backgroundColor !== null) styleAttrLine += "background-color:" + this.backgroundColor + "; ";
            if (this.backgroundImage !== null) {
                styleAttrLine += "background-image: url(" + this.backgroundImage +");";
                styleAttrLine += "background-size: " + this.backgroundSize + ";";
                styleAttrLine += "background-position: " + this.backgroundPosition + ";";
            }

            if (this.transformStyle !== null) {
                styleAttrLine += "-webkit-transform-style:" + this.transformStyle +";";
            }

            if (this.perspective !== null) {
                styleAttrLine += "-webkit-perspective:" + this.perspective +";";
            }

            if (this.translateX !== null) {
                styleAttrLine += "-webkit-transform:";

                // translate3d(x,y,z)
                styleAttrLine += "translate3d(" + this.translateX + "px, " + "0, " + this.translateZ + "px) ";

                styleAttrLine += "; ";
            }

            if (this.orient !== null || this.pack !== null || this.align !== null || this.flex !== null) {
                this.display = "-webkit-box";
                styleAttrLine += "display:" + this.display + "; ";
            }

            if (this.orient !== null) styleAttrLine += "-webkit-box-orient:" + this.orient + "; ";
            if (this.pack !== null) styleAttrLine += "-webkit-box-pack:" + this.pack + "; ";
            if (this.align !== null) styleAttrLine += "-webkit-box-align:" + this.align + "; ";
            if (this.flex !== null) styleAttrLine += "-webkit-box-flex:" + this.flex + "; ";

            if (styleAttrLine) this.$el.attr("style", styleAttrLine);
            */
        },

        /*
         Event handlers for touch events
         */

        touchstartHandler: function(event) {
            //console.log("UIView::touchstartHandler");
            //console.log(this.events);
            //console.log("this.userInteractionEnabled = " + this.userInteractionEnabled);

            if (this.userInteractionEnabled) {
                event.stopPropagation();
                this.select();
            }
            //return false;
        },

        touchendHandler: function(event) {
            //console.log("UIView::touchendHandler");
            if (this.userInteractionEnabled) {
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

        addSubview: function(view, selector) {
            //console.log("UIView::addSubview");

            (selector ? $(selector, this.$el) : this.$el).append(view.render().el);

            view.superview = this;
            this.subviews.push(view);
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