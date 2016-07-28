define([
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