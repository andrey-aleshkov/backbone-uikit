# backbone-uikit

This is a set of UI components inspired by the iOS UIKit Framework.
The UIKit provides crucial infrastructure to construct and manage web apps.

## Classes

* UIView
* UIButton
* UILabel
* UITextField
* UITextView
* UISegmentedControl
* UIStepper
* UIImageView
* UINavigationBar
* UITabBarItem
* UITabBar
* UITableViewCell
* UITableView
* UIScrollView
* UIActivityIndicatorView
* UIAccordion
* UISelect
* UICheckbox

## UIView

The UIView class defines a rectangular area on the screen and interfaces for content in that area.
Because view objects are the main way your application interacts with the user, they have a number of responsibilities. Here are just a few:

* Layout
    * by CSS
* Subview management
    * A view may contain zero or more subviews.
* Animation
    * To achieve the highest frame rate separate animated inline styles with the static ones from the CSS files.
* Event handling
    * A view can handle touch events by jGestures and other events defined by jQuery.

Views can embed other views and create sophisticated visual hierarchies. 
This creates a parent-child relationship between the view being embedded (known as the subview) and 
the parent view doing the embedding (known as the superview). 
Normally, a subview’s visible area is not clipped to the bounds of its superview, 
but you can use the overflow CSS property to alter that behavior. 
A parent view may contain any number of subviews but each subview has only one superview.

### Creating a View

To create a view, you can use code like the following:

    var view = new UIKit.UIView();

To add a subview to another view, you use the addSubview:
    
    render: function() {
        this.addSubview(new UIKit.UIView() [, '.element' | $element]);
        return this;
    }

To remove a view with all the subviews use the destroy method:

    view.destroy();

### Methods to Override

#### Initialization:

    initialize: function(options) {
        UIView.prototype.initialize.apply(this, [options]);
    },
       
#### Event Handling:
    
    events: {
        touchstart: 'touchstartHandler',
        touchend: 'touchendHandler',
        tapone: 'taponeHandler',
        pinch: 'pinchHandler',
        swipemove: 'swipemoveHandler'
    },
    
#### Subview management

    addSubview: function(view [, '.element' | $element]) {},
    
#### Animation
        
    transitionEndHandler: function(event) {
        event.stopPropagation();
    },

#### Layout:

    viewDidAppear: function() {},
    viewDidDisappear: function() {},


### All Methods

#### Initializing a View Object

    initialize: function(options) {},

#### Configuring the Event-Related Behavior

    userInteractionEnabled: false,

#### Managing the View Hierarchy

    superview: null,
    subviews: [],
    items: [],
    addSubview: function(view) {},
    bringSubviewToFront: function() {},
    sendSubviewToBack: function() {},

#### Drawing and Updating the View

    render: function() {},

#### Managing Touches and Gestures

    touchstartHandler: function(event) {},
    touchendHandler: function(event) {},
    taponeHandler: function(event) {},
    pinchHandler: function(event) {},
    swipemoveHandler: function(event, obj) {},

#### Animating Views
    
    calculateAnimatedStyles: function(animated) {},
    applyAnimatedStyles: function(animated) {},

#### Configuring the Bounds and Frame Rectangles

    size: function() {
        var rect = this.$el[0].getBoundingClientRect();
        return {
            width: rect.width,
            height: rect.height
        }
    },
                
More sophisticated content present by subclassing UIView and implementing the necessary drawing and event-handling.

## UIButton

    render: function() { 
        this.addSubview(new UIKit.UIButton());
        return this;
    }
  
## UILabel

    render: function() {
        this.addSubview(new UIKit.UILabel());
        return this;
    }
    
## UITextField

    render: function() {
        this.addSubview(new UIKit.UITextField());
        return this;
    }
    
## UITextView

    render: function() {
        this.addSubview(new UIKit.UITextView());
        return this;
    }

## UIStepper

    render: function() {
        this.addSubview(new UIKit.UIStepper({
            class: 'my-stepper',
            value: 0,
            minimumValue: 0,
            maximumValue: 1000,
            stepValue: 1,
            autorepeat: false
        }));
        return this;
    }

css:

    .my-stepper {
        border-color: #0d76ff;
        color: #0d76ff;
    }


## UISegmentedControl

    render: function() {
        this.addSubview(new UIKit.UISegmentedControl());
        return this;
    }

## UIImageView

    render: function() {
        this.addSubview(new UIKit.UIImageView());
        return this;
    }
      
## UINavigationBar

    render: function() {
        this.addSubview(new UIKit.UINavigationBar());
        return this;
    }
    
## UITabBarItem

    render: function() {
        this.addSubview(new UIKit.UITabBarItem());
        return this;
    }
    
## UITabBar

    render: function() {
        this.addSubview(new UIKit.UITabBar());
        return this;
    }
    
## UITableViewCell

    render: function() {
        this.addSubview(new UIKit.UITableViewCell());
        return this;
    }
    
## UITableView

    render: function() {
        this.addSubview(new UIKit.UITableView());
        return this;
    }
    
## UIScrollView

    render: function() {
        this.addSubview(new UIKit.UIScrollView());
        return this;
    }
    
## UIActivityIndicatorView

    render: function() {
        this.addSubview(new UIKit.UIActivityIndicatorView());
        return this;
    }

## UIAccordion

    render: function() {
        this.addSubview(new UIKit.UIAccordion({
            class: 'my-accordion',
            items: [
            new UIView({
                class: 'first-acc-view',
                title: 'First'
            }),
            new UIView({
                class: 'second-acc-view',
                title: 'Second'
            }),
            new UIView({
                class: 'third-acc-view',
                title: 'Third'
            })
            ]
        }));
        return this;
    }

## UISelect

    render: function() {
        var collection = new Collection();
        collection.add([{
            title: 'First',
            description: 'First model'
        }, {
            title: 'Second',
            description: 'Second model'
        }, {
            title: 'Third',
            description: 'Third model'
        }]);
        this.addSubview(new UISelect({
            class: 'my-select',
            ItemView: MySelectItemView,
            collection: collection
            }));
        return this;
    }
    
## UICheckbox

    render: function() {
        this.addSubview(new UICheckbox({
            name: 'my-checkbox',
            checked: false
        }));
        return this;
    }


## Modality

## Alert

    UIKit.alert({
      title: 'Title',
      message: 'This is a message.',
      okButtonLabel: 'OK'
    });

## Confirm

    UIKit.confirm({
      title: 'Title',
      message: 'This is a message.',
      cancelButtonLabel: 'Cancel',
      okButtonLabel: 'OK'
    })
      .done(function() {})
      .fail(function() {});
    
## Prompt

    UIKit.prompt({
      title: 'Title',
      message: 'This is a message.',
      placeholder: 'This is a placeholder',
      value: '',
      cancelButtonLabel: 'Cancel',
      okButtonLabel: 'OK'
    })
      .done(function(data) {})
      .fail(function() {});

## Modal

    UIKit.modal({
      contentView: new someView()
    });
    
## ActionSheet

    actionSheet({
        title: 'Title',
        actions: actions,
        cancelButtonLabel: 'Cancel'
    })
      .done(function(data) {
        console.log('ok, index = ', data);
      })
      .fail(function() {
        console.log('cancel');
      });
                
How to close the modal view from the content view:

    this.superview.hide();

## Dependencies

* jQuery (2.1.1).
* Underscore (1.3.3).
* Backbone (1.1.2).
* jGestures (0.90).

When the library is built, it **excludes** jQuery, Underscore, Backbone and jGestures from the
built library. Consumers of the built library will  provide all the dependencies for the library. 
If the consumer uses an AMD loader, then the built
file will ask for 'jquery', 'underscore', 'backbone' and 'jgestures' as AMD dependencies. If the consumer
just uses browser globals and script tags, the library will grab the `$`, `_`, `Backbone` and `jGestures` 
global variables and use them for the dependencies.

The built library also does not include require.js in the file, but instead
uses [almond](https://github.com/jrburke/almond), a small AMD API
implementation, that allows the built file's internal modules to work. These
internal modules and this version of almond are not visible outside the built
file, just used internally by the built file for code organization and
referencing.

## File structure

This project creates a library called **uikit.js** and a file **uikit.css** in the dist folder.

* **dist**: the built library suitable for distribution.
* **lib**: contains lib scripts used during dev and testing.
* **uikit**: holds the sub-modules used by the main `uikit.js` module
to help implement the library's functionality.
* **uikit.js**: the main module entry point for the source-form of the
library.
* **css**: common styles.
* **img**: all images.
* **app**: a simple web application I use to build and test new components.
* **tests**: the QUnit-based tests.

## How to do development

    $ gulp dev

* Modify `uikit.js` and its submodules in the `uikit` directory.
* Create tests for the functionality in the `tests` directory.
* Load `tests/index.html` to run the tests.

## How to build the library

    $ NODE_ENV=production gulp build

This will generate the built files `dist/uikit.js` and `dist/uikit.css`.

**Test** the built file by running these files:

* **tests/index-dist-amd.html**: For testing the dist version of the library
with an AMD loader.
* **tests/index-dist-global.html**: For testing the dist version of the library
in a "browser globals and script tags" environment.

## What to tell developers of your built library

You can tell them this library can be used with other AMD modules, or it can be
used in a project that uses browser globals and HTML script tags.

## License

Copyright (C) 2016 [Andrey Aleshkov](mailto: aleshkov.andrey@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
