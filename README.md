# backbone-uikit

This is set of UI components inspired by the iOS UIKit Framework.
The UIKit provides the crucial infrastructure needed to construct and manage web apps.

## Classes

* UIView
* UIButton
* UISegmentedControl
* UILabel
* UITextField
* UITextView
* UIImageView
* UIModalView
* UINavigationBar
* UITabBarItem
* UITabBar
* UITableViewCell
* UITableView
* UIScrollView
* UIActivityIndicatorView

## UIView

The UIView class defines a rectangular area on the screen and the interfaces for managing the content in that area.
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
    
        this.addSubview(new UIKit.UIView());
    
        return this;
    }

To remove a view with all the subviews use the destroy method:

    view.destroy();

### Methods to Override

#### Initialization:

    initialize: function (options) {
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

    addSubview: function(view, selector) {
        (selector ? $(selector, this.$el) : this.$el).append(view.render().el);

        view.superview = this;
        this.subviews.push(view);
    },
    
#### Animation
        
    transitionEndHandler: function(event) {
        event.stopPropagation();
    },

#### Layout:

    viewDidAppear: function() {
        
    },

    viewDidDisappear: function() {
        
    },
                
                
More sophisticated content present by subclassing UIView and implementing the necessary drawing and event-handling.

## UIButton

    render: function() {
    
        this.addSubview(new UIKit.UIButton());
    
        return this;
    }
    
## UISegmentedControl

    render: function() {
    
        this.addSubview(new UIKit.UISegmentedControl());
    
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
    
## UIImageView

    render: function() {
    
        this.addSubview(new UIKit.UIImageView());
    
        return this;
    }
    
## UIModalView

    render: function() {
    
        this.addSubview(new UIKit.UIModalView());
    
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




This is an example of building a JavaScript library with AMD modules and using
requirejs while in dev, but then building a file for distribution that does
not require an AMD loader. The built file will work either with browser globals
or with an AMD loader.

The library also depends on two other libraries:

* jQuery, which registers as an AMD library.
* underscore, which does not register as an AMD library. So the
[requirejs shim config](http://requirejs.org/docs/api.html#config-shim) is used
when loading underscore in an AMD setting.

When the library is built, it **excludes** jQuery and underscore from the
built library. Consumers of the built library will  provide a jQuery and
underscore for the library. If the consumer uses an AMD loader, then the built
file will ask for 'jquery' and 'underscore' as AMD dependencies. If the consumer
just uses browser globals and script tags, the library will grab the `$` and
`_` global variables and use them for the jQuery and underscore dependencies.

The built library also does not include require.js in the file, but instead
uses [almond](https://github.com/jrburke/almond), a small AMD API
implementation, that allows the built file's internal modules to work. These
internal modules and this version of almond are not visible outside the built
file, just used internally by the built file for code organization and
referencing.

## File structure

This project creates a library called **principium.js**. This is just a made
up name that hopefully is easy to search and replace if you use this as a
template to create your own library.

* **dist/principium.js**: the built library suitable for distribution.
* **lib**: contains lib scripts used during dev and testing.
* **tests**: the QUnit-based tests.
* **tools**: the helper tools/scripts used to build the output file.
* **principium**: holds the sub-modules used by the main `principium.js` module
to help implement the library's functionality.
* **principium.js**: the main module entry point for the source-form of the
library.

## How to do development

* Modify `principium.js` and its submodules in the `principium` directory.
* Create tests for the functionality in the `tests` directory.
* Load `tests/index.html` to run the tests.

## How to build the library

The r.js optimizer can be run in Node or Rhino. See the
[r.js README](https://github.com/jrburke/r.js) for instructions on how to run
the optimizer in Rhino. For running in Node, run this command in the
same directory as this README:

    node tools/r.js -o tools/build.js

This will generate the built file in `dist/principium.js`.

**Test** the built file by running these files:

* **tests/index-dist-amd.html**: For testing the dist version of the library
with an AMD loader.
* **tests/index-dist-global.html**: For testing the dist version of the library
in a "browser globals and script tags" environment.

## What to tell developers of your built library

You can tell them this library can be used with other AMD modules, or it can be
used in a project that uses browser globals and HTML script tags.

If the library depends on scripts that are not AMD modules (like this example,
which uses underscore), then you may need to inform developers who use your
libary what shim config you used if they want to use this library in an AMD
project.
