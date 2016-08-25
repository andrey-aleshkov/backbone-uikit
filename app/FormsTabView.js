define([
    "jquery",
    "underscore",
    "backbone",
    // ui
    "../uikit/UIView",
    "../uikit/UINavigationBar",

    "../uikit/UIButton",
    "../uikit/UILabel",
     "../uikit/UITextField",
    "../uikit/UITextView",
    "../uikit/UIStepper"

], function($, _, Backbone,
            // ui
            UIView,
            UINavigationBar,
            UIButton,
            UILabel,
            UITextField,
            UITextView,
            UIStepper
){
    // FormsTabView
    return UIView.extend({
        id: "forms-tab-view",
        render: function() {
            console.log("FormsTabView::render");
            this.$el.empty();

            var dataModel;
            var submitBtn;

            dataModel = new Backbone.Model({
                number: 2
            });

            this.addSubview(new UITextField({
                //value: 123,
                model: dataModel,
                attribute: 'number',
                placeholder: 'One line ...',
                class: 'my-text-field'
            }));

            this.addSubview(new UITextView({
                text: '',
                placeholder: 'Let us know more ...',
                class: 'my-text-view'
            }));


            this.addSubview(new UILabel({
                model: dataModel,
                attribute: 'number'
            }));

            this.addSubview(new UIStepper({
                model: dataModel,
                attribute: 'number',
                //value: 0,
                minimumValue: 0,
                maximumValue: 10
            }));

            // NavigationBar
            submitBtn = new UIButton({
                label: "Submit",
                action: function() {}
            });

            var uiNavigationBar = new UINavigationBar({
                leftBarItems: [],
                centerBarItems: [new UILabel({text: this.title})],
                rightBarItems: [submitBtn]
            });
            this.addSubview(uiNavigationBar);

            return this;
        }

    });
});
