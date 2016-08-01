define([
    "jquery",
    "underscore",
    "backbone",
    "./UIView",
    "./UIButton",
    "./UITextField"
], function($, _, Backbone, UIView, UIButton, UITextField) {

    // UIModalView
    return UIView.extend({
        className: "ui-modal-view",

        activityTemplate:
            _.template('<div class="ui-spinner"></div>'),
        alertTemplate:
            _.template('<div class="modal-win"><div class="ui-dialog-content"><div class="ui-dialog-title"><%= title %></div><div class="ui-dialog-txt"></div><div class="ui-dialog-other-btns"></div></div></div>'),
        confirmTemplate:
            _.template('<div class="modal-win"><div class="ui-dialog-content"><div class="ui-dialog-title"><%= title %></div><div class="ui-dialog-txt"></div><div class="ui-dialog-other-btns"><div class="ui-box box-pack-justify"><div class="ui-box box-pack-start ui-dialog-confirm-cancel"></div><div class="ui-box box-pack-end ui-dialog-confirm-ok"></div></div></div></div></div>'),
        promptTemplate:
            _.template('<div class="modal-win"><div class="ui-dialog-content"><div class="ui-dialog-title"><%= title %></div><div class="ui-dialog-field"></div><div class="ui-dialog-other-btns"><div class="ui-box box-pack-justify"><div class="ui-box box-pack-start ui-dialog-prompt-cancel"></div><div class="ui-box box-pack-end ui-dialog-prompt-ok"></div></div></div></div></div>'),

        listTemplate:
            _.template('<div class="modal-win"><div class="ui-dialog-content"><div class="ui-dialog-title"><%= title %></div><ul class="dialog-list"></ul><div class="ui-dialog-other-btns"></div></div></div>'),

        hidden: true,
        onOpen: null,
        onClose: null,

        $popupTxt: null,

        // alert
        $popupAlertOkBtn: null,

        // confirm
        $popupConfirmCancelBtn: null,
        $popupConfirmOkBtn: null,

        // prompt
        $popupPromptCancelBtn: null,
        $popupPromptOkBtn: null,

        promptValue: null,


        render: function () {
            //console.log("UIModalView::render");
            this.$el.empty();

            // set additional CSS-class
            this.setClass(this.class);

            var scope = this;
            var json = {};

            console.log("this.content.type = " + this.content.type);

            switch (this.content.type) {
                case "activity":
                    // use template
                    json.title = this.title;
                    json.message = this.content.name;
                    this.$el.html(this.activityTemplate(json));

                    break;

                case "alert":
                    // use template
                    json.title = this.title;
                    this.$el.html(this.alertTemplate(json));

                    // message
                    this.$popupTxt = $(".ui-dialog-txt", this.$el);
                    this.$popupTxt.append("<p>" + this.content.name + "</p>");

                    // create button
                    this.$popupAlertOkBtn = $(".ui-dialog-other-btns", this.$el);
                    var alertOkBtn = new UIButton({
                        class: "btn-dial btn-dial-dark",
                        label: "Ok",
                        action: function(){
                            scope.hide();
                            scope.actionHandler();
                            scope.destroy();
                        }
                    });
                    this.$popupAlertOkBtn.append(alertOkBtn.render().el);

                    break;

                case "confirm":

                    // use template
                    json.title = this.title;
                    this.$el.html(this.confirmTemplate(json));

                    // message
                    this.$popupTxt = $(".ui-dialog-txt", this.$el);
                    this.$popupTxt.append("<p>" + this.content.name + "</p>");

                    // create buttons
                    this.$popupConfirmCancelBtn = $(".ui-dialog-confirm-cancel", this.$el);
                    this.$popupConfirmOkBtn = $(".ui-dialog-confirm-ok", this.$el);
                    var confirmCancelBtn = new UIButton({
                        class: "btn-dial btn-dial-light w-half",
                        label: "Отмена",
                        action: function () {
                            scope.destroy();
                        }
                    });
                    this.$popupConfirmCancelBtn.append(confirmCancelBtn.render().el);

                    var confirmOkBtn = new UIButton({
                        class: "btn-dial btn-dial-dark w-half",
                        label: "Ok",
                        action: function () {
                            scope.hide();
                            scope.actionHandler();
                            scope.destroy();
                        }
                    });
                    this.$popupConfirmOkBtn.append(confirmOkBtn.render().el);

                    break;

                case "prompt":

                    // use template
                    json.title = this.title;
                    this.$el.html(this.promptTemplate(json));

                    // create textField
                    var valueTextField = new UITextField({
                        name: "promptValue",
                        placeholder: this.content.name
                    });

                    this.$popupField = $(".ui-dialog-field", this.$el);
                    this.$popupField.append(valueTextField.render().el);

                    // create buttons
                    this.$popupPromptCancelBtn = $(".ui-dialog-prompt-cancel", this.$el);
                    this.$popupPromptOkBtn = $(".ui-dialog-prompt-ok", this.$el);
                    var promptCancelBtn = new UIButton({
                        class: "btn-dial btn-dial-light w-half",
                        label: "Отмена",
                        action: function () {
                            scope.destroy();
                        }
                    });
                    this.$popupPromptCancelBtn.append(promptCancelBtn.render().el);

                    var promptOkBtn = new UIButton({
                        class: "btn-dial btn-dial-dark w-half",
                        label: "Ok",
                        action: function () {
                            scope.promptValue = valueTextField.text;
                            scope.hide();
                            scope.actionHandler();
                            scope.destroy();
                        }
                    });
                    this.$popupPromptOkBtn.append(promptOkBtn.render().el);

                    break;

                case "list":

                    // use template
                    json.title = this.title;
                    this.$el.html(this.listTemplate(json));

                    // message
                    //this.$popupTxt = $(".ui-dialog-txt", this.$el);
                    //this.$popupTxt.append("<p>" + this.content.name + "</p>");

                    // create buttons
                    this.$popupAlertOkBtn = $(".ui-dialog-other-btns", this.$el);
                    var alertOkBtn = new UIButton({
                        class: "btn-dial btn-dial-dark",
                        label: "Ok",
                        action: function(){
                            scope.hide();
                            scope.actionHandler();
                            scope.destroy();
                        }
                    });
                    this.$popupAlertOkBtn.append(alertOkBtn.render().el);

                    // create list
                    this.$dialogList = $(".dialog-list", this.$el);

                    for (var key in this.content.name) {
                        //console.log("key = " + key);
                        //console.log("this.content.name[key] = " + this.content.name[key]);

                        /*
                         var subscribeBtn = new UIButton({
                         class: "btn-dial btn-dial-light",
                         label: this.content.name[key]
                         });
                         scope.$popupList.append(subscribeBtn.render().el);
                         */
                        scope.$dialogList.append("<li>" + this.content.name[key] + "</li>");
                    }

                    /*
                     _.each(this.content.name, function(error){
                     console.log("error = " + error);

                     var subscribeBtn = new UIButton({
                     class: "btn-dial btn-dial-light",
                     label: error
                     });
                     scope.$popupList.append(subscribeBtn.render().el);
                     });
                     */

                    break;

                case "none":
                    // TODO: WTF?
                    // apply hidden
                    if (this.hidden) {
                        this.$el.addClass("ui-hid");
                    }
                    break;

                default:
                    console.log("Sorry, unknown content type");
            }

            return this;
        },

        actionHandler: function () {
            console.log("UIModalView::actionHandler");

            switch (this.action.type) {
                case "link":
                    console.log("link");
                    window.open(this.action.name,'_blank');
                    break;
                case "itunes":
                    console.log("itunes");
                    location.href = this.action.name;
                    break;
                case "none":
                    console.log("none");
                    break;
                default:
                    console.log("Sorry, unknown action type");
            }
        },

        activity: function () {
            console.log("UIModalView::activity");
            this.title = "";
            this.content = {
                type: "activity",
                name: "activity"
            };
            this.render();
            this.show();
        },

        alert: function (title, message) {
            console.log("UIModalView::alert");
            this.title = title;
            this.content = {
                type: "alert",
                name: message
            };
            this.actionHandler = function(){};
            this.render();
            this.show();
        },

        confirm: function (title, message, actionHandler) {
            console.log("UIModalView::confirm");
            this.title = title;
            this.content = {
                type: "confirm",
                name: message
            };
            this.actionHandler = actionHandler;
            this.render();
            this.show();
        },

        prompt: function (title, message, actionHandler) {
            console.log("UIModalView::prompt");
            this.title = title;
            this.content = {
                type: "prompt",
                name: message
            };
            this.actionHandler = actionHandler;
            this.render();
            this.show();
        },

        list: function (title, list) {
            console.log("UIModalView::list");
            this.title = title;
            this.content = {
                type: "list",
                name: list
            };
            this.render();
            this.show();
        }

    });

});