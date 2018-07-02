!function(e,t){"function"==typeof define&&define.amd?define(["jquery","underscore","backbone"],t):e.uikit=t(e.$,e._,e.Backbone)}(this,function(e,t){var i,n,s;return function(e){function t(e,t){return x.call(e,t)}function a(e,t){var i,n,s,a,l,o,c,h,u,r,d,p,m=t&&t.split("/"),f=w.map,b=f&&f["*"]||{};if(e){for(e=e.split("/"),l=e.length-1,w.nodeIdCompat&&$.test(e[l])&&(e[l]=e[l].replace($,"")),"."===e[0].charAt(0)&&m&&(p=m.slice(0,m.length-1),e=p.concat(e)),u=0;u<e.length;u++)if(d=e[u],"."===d)e.splice(u,1),u-=1;else if(".."===d){if(0===u||1===u&&".."===e[2]||".."===e[u-1])continue;u>0&&(e.splice(u-1,2),u-=2)}e=e.join("/")}if((m||b)&&f){for(i=e.split("/"),u=i.length;u>0;u-=1){if(n=i.slice(0,u).join("/"),m)for(r=m.length;r>0;r-=1)if(s=f[m.slice(0,r).join("/")],s&&(s=s[n])){a=s,o=u;break}if(a)break;!c&&b&&b[n]&&(c=b[n],h=u)}!a&&c&&(a=c,o=h),a&&(i.splice(0,o,a),e=i.join("/"))}return e}function l(t,i){return function(){var n=I.call(arguments,0);return"string"!=typeof n[0]&&1===n.length&&n.push(null),p.apply(e,n.concat([t,i]))}}function o(e){return function(t){return a(t,e)}}function c(e){return function(t){b[e]=t}}function h(i){if(t(v,i)){var n=v[i];delete v[i],g[i]=!0,d.apply(e,n)}if(!t(b,i)&&!t(g,i))throw new Error("No "+i);return b[i]}function u(e){var t,i=e?e.indexOf("!"):-1;return i>-1&&(t=e.substring(0,i),e=e.substring(i+1,e.length)),[t,e]}function r(e){return function(){return w&&w.config&&w.config[e]||{}}}var d,p,m,f,b={},v={},w={},g={},x=Object.prototype.hasOwnProperty,I=[].slice,$=/\.js$/;m=function(e,t){var i,n=u(e),s=n[0];return e=n[1],s&&(s=a(s,t),i=h(s)),s?e=i&&i.normalize?i.normalize(e,o(t)):a(e,t):(e=a(e,t),n=u(e),s=n[0],e=n[1],s&&(i=h(s))),{f:s?s+"!"+e:e,n:e,pr:s,p:i}},f={require:function(e){return l(e)},exports:function(e){var t=b[e];return"undefined"!=typeof t?t:b[e]={}},module:function(e){return{id:e,uri:"",exports:b[e],config:r(e)}}},d=function(i,n,s,a){var o,u,r,d,p,w,x=[],I=typeof s;if(a=a||i,"undefined"===I||"function"===I){for(n=!n.length&&s.length?["require","exports","module"]:n,p=0;p<n.length;p+=1)if(d=m(n[p],a),u=d.f,"require"===u)x[p]=f.require(i);else if("exports"===u)x[p]=f.exports(i),w=!0;else if("module"===u)o=x[p]=f.module(i);else if(t(b,u)||t(v,u)||t(g,u))x[p]=h(u);else{if(!d.p)throw new Error(i+" missing "+u);d.p.load(d.n,l(a,!0),c(u),{}),x[p]=b[u]}r=s?s.apply(b[i],x):void 0,i&&(o&&o.exports!==e&&o.exports!==b[i]?b[i]=o.exports:r===e&&w||(b[i]=r))}else i&&(b[i]=s)},i=n=p=function(t,i,n,s,a){if("string"==typeof t)return f[t]?f[t](i):h(m(t,i).f);if(!t.splice){if(w=t,w.deps&&p(w.deps,w.callback),!i)return;i.splice?(t=i,i=n,n=null):t=e}return i=i||function(){},"function"==typeof n&&(n=s,s=a),s?d(e,t,i,n):setTimeout(function(){d(e,t,i,n)},4),p},p.config=function(e){return p(e)},i._defined=b,s=function(e,i,n){if("string"!=typeof e)throw new Error("See almond README: incorrect module build, no module name");i.splice||(n=i,i=[]),t(b,e)||t(v,e)||(v[e]=[e,i,n])},s.amd={jQuery:!0}}(),s("libs/almond/almond-0.3.2",function(){}),s("uikit/UIView",["jquery","underscore","backbone"],function(e,t,i){return i.View.extend({className:"ui-view",animation:null,title:"",icon:"",class:"",oldClass:"",name:"",oldName:"",disabled:!1,hidden:!1,selected:!1,superview:null,subviews:null,items:null,userInteractionEnabled:!1,events:{},initialize:function(e){var i,n={},s=0,a="ontouchend"in document;if(this.subviews=[],e)for(i in e)e.hasOwnProperty(i)&&(this[i]=e[i]);for(i in this.events)if(this.events.hasOwnProperty(i))switch(i){case"touchstart":a?n.touchstart=this.events[i]:n.mousedown=this.events[i],s++;break;case"touchend":a?n.touchend=this.events[i]:n.mouseup=this.events[i],s++;break;case"mousedown":a?n.touchstart=this.events[i]:n.mousedown=this.events[i],s++;break;case"mouseup":a?n.touchend=this.events[i]:n.mouseup=this.events[i],s++;break;case"swipemove":case"pinch":case"tapone":case"mouseenter":case"mouseover":case"mouseleave":case"mousemove":case"mouseout":n[i]=this.events[i],s++;break;default:console.error("UIView: Sorry, unknown event name")}s&&(this.events=n,this.userInteractionEnabled=!0),this.delegateEvents(),t.bindAll.apply(t,[this].concat(t.functions(this))),this.$el.on("webkitTransitionEnd",this.transitionEndHandler)},transitionEndHandler:function(e){e.stopPropagation()},destroy:function(){this.remove(),this.unbind(),t.each(this.subviews,function(e){e.destroy&&e.destroy()})},render:function(){return this.$el.empty(),this.name&&this.setName(this.name),this.class&&this.setClass(this.class),this.addItems(),this},size:function(){var e=this.$el[0].getBoundingClientRect();return{width:e.width,height:e.height}},touchstartHandler:function(e){e.preventDefault(),this.userInteractionEnabled&&!this.disabled&&this.select()},touchendHandler:function(e){e.preventDefault(),this.userInteractionEnabled&&!this.disabled&&this.deselect()},taponeHandler:function(e){this.userInteractionEnabled&&e.stopPropagation()},swipemoveHandler:function(e){e.stopPropagation()},setName:function(e){this.oldName=this.name,this.name=e,this.$el.removeClass(this.oldName).addClass(this.name)},setClass:function(e){this.oldClass=this.class,this.class=e,this.$el.removeClass(this.oldClass).addClass(this.class)},disable:function(){this.disabled=!0,this.$el.addClass("ui-dis")},enable:function(){this.disabled=!1,this.$el.removeClass("ui-dis")},hide:function(){this.hidden=!0,this.$el.addClass("ui-hid"),this.viewDidDisappear()},show:function(){this.hidden=!1,this.$el.removeClass("ui-hid"),this.viewDidAppear()},deselect:function(){this.selected=!1,this.$el.removeClass("ui-sel")},select:function(){this.selected=!0,this.$el.addClass("ui-sel")},addSubview:function(t,i){var n=this.$el,s=!1;i&&(i instanceof jQuery?i.length?n=i:(console.error("empty jquery object"),s=!0):"string"==typeof i&&(n=e(i,this.$el),n.length||(console.error("wrong selector ",i),s=!0))),s||(n.append(t.render().el),t.superview=this,this.subviews.push(t))},addItems:function(){var e=this;t.each(this.items,function(t){e.addSubview(t)})},bringSubviewToFront:function(e){t.each(this.subviews,function(t){t!==e&&t.hide()}),e.show()},addTabBar:function(e){e.superview=this,this.$el.append(e.render().el),this.$el.addClass("view-has-tab-bar")},viewDidAppear:function(){},viewDidDisappear:function(){},goBack:function(e){e.remove(),this.subviews.pop()}})}),s("uikit/UIButton",["jquery","underscore","backbone","./UIView"],function(e,t,i,n){return n.extend({className:"ui-btn",template:'\n      <span class="btn-icon"></span><span class="btn-label"></span>',$icon:null,$label:null,action:null,label:"",icon:"",iconOrder:0,align:"center",events:{tapone:"taponeHandler",touchstart:"touchstartHandler",touchend:"touchendHandler",swipemove:"swipemoveHandler"},render:function(){return this.$el.empty(),this.$el.html(this.template),this.$icon=this.$el.find(".btn-icon"),this.$label=this.$el.find(".btn-label"),this.label&&this.$label.html(this.label),this.icon&&this.$icon.addClass("icon--"+this.icon),this.iconOrder&&this.$icon.addClass("btn-icon--order"),"center"!==this.align&&this.$el.addClass("ui-btn--align-"+this.align),this.$el.addClass(this.class),this.disabled&&this.$el.addClass("ui-dis"),this.hidden&&this.$el.addClass("ui-hid"),this},setLabel:function(e){this.label=e,this.$label.html(this.label)},setIcon:function(e){this.icon=e,this.$icon.addClass("icon--"+e)},touchstartHandler:function(e){this.userInteractionEnabled&&!this.disabled&&(e.stopPropagation(),this.select())},touchendHandler:function(e){this.userInteractionEnabled&&!this.disabled&&(e.stopPropagation(),this.deselect())},taponeHandler:function(e,t){t.originalEvent.stopPropagation(),this.action&&!this.disabled&&this.action(this)}})}),s("uikit/UISegmentedControl",["jquery","underscore","backbone","./UIView","./UIButton"],function(e,t,i,n,s){return n.extend({className:"ui-view ui-segmented-control",selectedIndex:0,items:null,buttons:null,initialize:function(e){n.prototype.initialize.apply(this,[e]),this.buttons=[]},render:function(){var e=this;return this.$el.empty(),this.$el.addClass(this.class),this.disabled&&this.$el.addClass("ui-dis"),this.hidden&&this.$el.addClass("ui-hid"),this.items.forEach(function(t,i){var n=new s({label:t.label,action:function(t){e.buttons.forEach(function(e){e.$el.removeClass("selected")}),t.$el.addClass("selected"),i!==e.selectedIndex&&(e.selectedIndex=i,e.changeHandler(e.selectedIndex))}});e.buttons.push(n),e.addSubview(n),i===e.selectedIndex&&n.$el.addClass("selected")}),this},changeHandler:function(e){}})}),s("uikit/UIStepper",["jquery","underscore","backbone","./UIView","./UIButton"],function(e,t,i,n,s){return n.extend({className:"ui-stepper",model:null,attribute:"",value:0,minimumValue:0,maximumValue:1e3,stepValue:1,autorepeat:!1,decButton:null,incButton:null,changeHandler:null,initialize:function(e){n.prototype.initialize.apply(this,[e]),this.model&&(this.value=this.model.get(this.attribute),(this.value<this.minimumValue||this.value>this.maximumValue)&&console.error("The value ("+this.value+") must be between the minimum ("+this.minimumValue+") and maximum ("+this.maximumValue+") values."))},render:function(){var e=this;return this.$el.empty(),this.setClass(this.class),this.disabled&&this.$el.addClass("ui-dis"),this.hidden&&this.$el.addClass("ui-hid"),this.decButton=new s({class:"ui-stepper-dec-btn",label:"–",action:function(){e.decreaseValue()}}),this.addSubview(this.decButton),this.incButton=new s({class:"ui-stepper-inc-btn",label:"+",action:function(){e.increaseValue()}}),this.addSubview(this.incButton),this.updateUI(),this},updateUI:function(){this.value<=this.minimumValue?(this.decButton.disable(),this.incButton.enable()):this.value>this.minimumValue&&this.value<this.maximumValue?(this.decButton.enable(),this.incButton.enable()):this.value>=this.maximumValue&&(this.decButton.enable(),this.incButton.disable())},updateModel:function(){this.model&&this.model.set(this.attribute,this.value)},decreaseValue:function(){var e=this.value-this.stepValue;e<=this.minimumValue&&(e=this.minimumValue),this.value=e,this.updateUI(),this.updateModel(),this.changeHandler&&this.changeHandler(this.value)},increaseValue:function(){var e=this.value+this.stepValue;e>=this.maximumValue&&(e=this.maximumValue),this.value=e,this.updateUI(),this.updateModel(),this.changeHandler&&this.changeHandler(this.value)}})}),s("uikit/UILabel",["jquery","underscore","backbone","./UIView"],function(e,t,i,n){return n.extend({className:"ui-label",tagName:"label",model:null,attribute:"",text:"",initialize:function(e){n.prototype.initialize.apply(this,[e]),this.model&&this.listenTo(this.model,"change",this.update)},render:function(){return this.$el.empty(),this.setClass(this.class),this.hidden&&this.$el.addClass("ui-hid"),this.model?this.setText(this.model.get(this.attribute)):this.$el.html(this.text),this},update:function(){this.model&&this.setText(this.model.get(this.attribute))},setText:function(e){this.text=e,this.$el.html(this.text)}})}),s("uikit/UITextField",["jquery","underscore","backbone","./UIView"],function(e,t,i,n){return n.extend({className:"ui-text-field",templateInput:t.template('<input type="<%= type %>" class="input-text" id="<%= name %>" name="<%= name %>" placeholder="<%= placeholder %>" value="<%= value %>" <%= autofocus %>>'),templateData:t.template('<div class="data-text" id="<%= name %>"><%= value %></div>'),templatePhoneNumber:t.template('<div class="data-text"><a href="tel:+<%= value %>">+<%= value %></a></div>'),model:null,attribute:"",value:"",valid:!0,$input:null,type:"text",autocomplete:"",name:"",placeholder:"",autofocus:!1,editable:!0,phoneNumber:!1,delay:0,timeout:null,initialize:function(e){n.prototype.initialize.apply(this,[e]),this.model&&(this.value=this.model.get(this.attribute))},render:function(){var e=this,t={type:this.type,name:this.name,value:this.value,placeholder:this.placeholder,autofocus:this.autofocus?"autofocus":""};return this.$el.empty(),this.editable?(this.$el.html(this.templateInput(t)),this.$input=this.$el.find("input"),this.autocomplete&&this.$input.attr("autocomplete",this.autocomplete),this.$input.on("focus",this.focusHandler),this.$input.on("input",function(t){e.value=e.$input.val(),t.data||(t.data={}),t.data.value=e.value,t.data.view=e,e.delay?(e.timeout&&clearTimeout(e.timeout),e.timeout=setTimeout(function(){e.changeHandler(t)},e.delay)):e.changeHandler(t)}),this.$input.on("keypress",this.keypressHandler),this.$input.on("keydown",this.keydownHandler),this.$input.on("blur",this.blurHandler)):this.phoneNumber?this.$el.html(this.templatePhoneNumber(t)):this.$el.html(this.templateData(t)),this.disabled&&this.$el.addClass("ui-dis"),this.hidden&&this.$el.addClass("ui-hid"),this.class&&this.setClass(this.class),this},setValue:function(e){this.value=e,this.render()},setPlaceholder:function(e){this.placeholder=e,this.render()},setValid:function(e){this.valid=e,e?this.$el.removeClass("invalid").addClass("valid"):this.$el.removeClass("valid").addClass("invalid")},focusHandler:function(){},keypressHandler:function(){},keydownHandler:function(){},changeHandler:function(){this.model&&this.model.set(this.attribute,this.value)},blurHandler:function(){},focus:function(){this.$input.focus()}})}),s("uikit/UITextView",["jquery","underscore","backbone","./UIView"],function(e,t,i,n){return n.extend({className:"ui-text-view",templateTextarea:t.template('<textarea class="input-text" name="<%= name %>" placeholder="<%= placeholder %>" rows="" cols=""><%= text %></textarea>'),templateData:t.template('<div class="data-text"><%= text %></div>'),$textarea:null,name:"",text:"",placeholder:"",editable:!0,render:function(){var e={name:this.name,text:this.text,placeholder:this.placeholder};return this.$el.empty(),this.setClass(this.class),this.editable?(this.$el.html(this.templateTextarea(e)),this.$textarea=this.$el.find("textarea")):this.$el.html(this.templateData(e)),this.disabled&&this.$el.addClass("ui-dis"),this.hidden&&this.$el.addClass("ui-hid"),this.class&&this.setClass(this.class),this.$textarea.on("change keyup paste",this.changeHandler),this},setText:function(e){this.text=e,this.$el.html(this.text)},changeHandler:function(){this.text=this.$textarea.val()},focus:function(){this.$textarea.focus()}})}),s("uikit/UIImageView",["jquery","underscore","backbone","./UIView"],function(e,t,i,n){return n.extend({className:"ui-image-view",imageUrl:null,frameWidth:null,frameHeight:null,imageWidth:0,imageHeight:0,status:null,image:null,initialize:function(e){n.prototype.initialize.apply(this,[e]),this.image=new Image},render:function(){var e="";return this.$el.empty(),this.setClass(this.class),null!==this.frameWidth&&(e+="width:"+this.frameWidth+"; "),null!==this.frameHeight&&(e+="height:"+this.frameHeight+"; "),"loaded"===this.status&&(e+="background-image: url("+this.imageUrl+");"),e+="background-size: "+this.imageWidth+" "+this.imageHeight+";",this.$el.attr("style",e),this},load:function(){this.beforeLoad(),e(this.image).one("load",function(){this.complete(),this.success()}).one("error",function(){this.complete(),this.error()}).attr("src",this.imageUrl).each(function(){this.complete&&e(this).trigger("load")})},beforeLoad:function(){},complete:function(){},success:function(){this.status="loaded",this.render()},error:function(){this.status="error",this.render()}})}),s("uikit/UINavigationBar",["jquery","underscore","backbone","./UIView"],function(e,t,i,n){return n.extend({className:"ui-view ui-navigation-bar",template:'\n      <div class="left-place"></div>\n      <div class="center-place"></div>\n      <div class="right-place"></div>',leftBarItems:null,centerBarItems:null,rightBarItems:null,events:{touchstart:"touchstartHandler",touchend:"touchendHandler",tapone:"taponeHandler",swipemove:"swipemoveHandler"},render:function(){var e,i,n,s=this;return this.$el.empty(),this.$el.html(this.template),e=this.$el.find(".left-place"),i=this.$el.find(".center-place"),n=this.$el.find(".right-place"),t.each(this.leftBarItems,function(t){s.addSubview(t,e)}),t.each(this.centerBarItems,function(e){s.addSubview(e,i)}),t.each(this.rightBarItems,function(e){s.addSubview(e,n)}),this}})}),s("uikit/UITabBarItem",["jquery","underscore","backbone","./UIView"],function(e,t,i,n){return n.extend({className:"ui-tab-bar-item",template:t.template('<span class="tab-bar-item-icon icon-<%= icon %>"></span><span class="tab-bar-item-text"><%= title %></span>'),events:{tapone:"taponeHandler"},icon:"",title:"",index:null,selected:!1,render:function(){return this.$el.empty(),this.$el.html(this.template({icon:this.icon,title:this.title})),this},taponeHandler:function(){this.superview.selectItem(this.index)},select:function(){this.$el.addClass("selected")},deselect:function(){this.$el.removeClass("selected")}})}),s("uikit/UITabBar",["jquery","underscore","backbone","./UIView","./UITabBarItem"],function(e,t,i,n,s){return n.extend({className:"ui-tab-bar",items:null,selectedIndex:0,render:function(){var e=this;return this.$el.empty(),this.items=[],t.each(this.superview.subviews,function(t,i){var n=new s({icon:t.icon,title:t.title,index:i,superview:e});e.items.push(n),e.$el.append(n.render().el)}),this.selectItem(this.selectedIndex),this},selectItem:function(e){this.selectedIndex=e,t.each(this.items,function(e){e.deselect()}),this.items[this.selectedIndex].select(),this.superview.bringSubviewToFront(this.superview.subviews[this.selectedIndex])}})}),s("uikit/UIScrollView",["jquery","underscore","backbone","./UIView"],function(e,t,i,n){return n.extend({className:"ui-view ui-scroll-view",$content:null,scale:1,currentScale:1,maximumScale:1e3,minimumScale:1e-7,firstPinch:!0,pinch:{x:0,y:0},translate:{x:0,y:0},pinchRelativeTranslate:{x:0,y:0},events:{touchstart:"touchstartHandler",touchend:"touchendHandler",pinch:"gestureHandler",swipemove:"gestureHandler"},render:function(){return this.$el.empty(),this.$el.append('<div class="scroll-content"></div>'),this.$content=this.$el.find(".scroll-content"),this.class&&this.setClass(this.class),this.applyTransforms(),this},addSubview:function(e){this.$content.append(e.render().el),e.superview=this,this.subviews.push(e)},setOffset:function(e){this.translate=e,this.applyTransforms()},setScale:function(e){var t=e;t<this.minimumScale?t=this.minimumScale:t>this.maximumScale&&(t=this.maximumScale),this.scale=t,this.currentScale=t,this.applyTransforms()},setScaleRelativeToPoint:function(e,t){var i={x:0,y:0};i.x=this.translate.x-t.x,i.y=this.translate.y-t.y,this.currentScale=this.scale*e,this.translate.x=i.x*e+t.x,this.translate.y=i.y*e+t.y,this.applyTransforms(),this.scale=this.currentScale},contentSize:function(){var e={top:0,right:0,bottom:0,left:0,width:0,height:0};return this.$content&&(e=this.$content[0].getBoundingClientRect()),{width:e.width,height:e.height}},applyTransforms:function(){var e="";e+="transform: ",e+="translate3d("+this.translate.x+"px, "+this.translate.y+"px, 0px) ",e+="scaleX("+this.currentScale+") scaleY("+this.currentScale+") ",e+=";",this.$content.attr("style",e)},touchstartHandler:function(){},touchendHandler:function(){this.scale=this.currentScale,this.firstPinch=!0},gestureHandler:function(e,t){var i,n,s=0,a=0;switch(e.preventDefault(),t.originalEvent.preventDefault(),i=t.description.split(":"),i[0]){case"pinch":n=this.scale*t.scale,n>=this.minimumScale&&n<=this.maximumScale&&(this.firstPinch&&(this.pinch.x=t.originalEvent.layerX,this.pinch.y=t.originalEvent.layerY,this.pinchRelativeTranslate.x=this.translate.x-this.pinch.x,this.pinchRelativeTranslate.y=this.translate.y-this.pinch.y),this.firstPinch=!1,this.currentScale=this.scale*t.scale,this.translate.x=this.pinchRelativeTranslate.x*t.scale+this.pinch.x,this.translate.y=this.pinchRelativeTranslate.y*t.scale+this.pinch.y);break;case"rotate":break;case"swipemove":"1"===i[1]&&(s=t.delta[0].startX,a=t.delta[0].startY,this.translate.x=s+this.translate.x,this.translate.y=a+this.translate.y);break;case"swipe":}this.testHandler(),this.applyTransforms()},testHandler:function(){}})}),s("uikit/UIActivityIndicatorView",["jquery","underscore","backbone","./UIView"],function(e,t,i,n){return n.extend({className:"ui-activity-indicator-view",isAnimating:!0,render:function(){return this.$el.empty(),this.isAnimating&&this.startAnimating(),this},startAnimating:function(){this.isAnimating=!0,this.$el.addClass("animating")},stopAnimating:function(){this.isAnimating=!1,this.$el.removeClass("animating")}})}),s("uikit/UIAccordionState",["jquery","underscore","backbone","./UIView","./UIButton"],function(e,t,i,n,s){return n.extend({className:"ui-view ui-accordion-state",index:0,item:null,button:null,opened:!1,$button:null,buttonHeight:40,render:function(){return this.button?(this.addSubview(this.button),this.$button=this.button.$el):(this.button=new s({label:this.item.title,align:"justify",iconOrder:1,action:function(){this.superview.toggle()}}),this.addSubview(this.button),this.$button=this.button.$el),this.addSubview(this.item),setTimeout(this.layout,0),this},layout:function(){this.buttonHeight=this.$button.outerHeight(!0),this.opened?this.open():this.close()},open:function(){this.superview.subviews.forEach(function(e){e.close()}),this.opened=!0,this.$el.removeAttr("style").addClass("state-opened")},close:function(){this.opened=!1,this.$el.attr("style","height: "+this.buttonHeight+"px;").removeClass("state-opened")},toggle:function(){this.opened?this.close():this.open()}})}),s("uikit/UIAccordion",["jquery","underscore","backbone","./UIView","./UIButton","./UIAccordionState"],function(e,t,i,n,s,a){return n.extend({className:"ui-view ui-accordion",items:null,buttons:null,openedIndex:null,addItems:function(){var e,t=this;this.items.forEach(function(i,n){e=new a({opened:n===t.openedIndex,index:n,item:i,button:t.buttons?t.buttons[n]:null}),t.addSubview(e)})}})}),s("uikit/UISelect",["jquery","underscore","backbone","./UIView","./UIButton"],function(e,t,i,n,s){return n.extend({className:"ui-view ui-select",listClass:"",collection:null,model:null,appearance:"down",oldSelectedIndex:null,selectedIndex:-1,selectedId:null,opened:!1,button:null,label:"",rect:null,listView:null,listContentView:null,overlayView:null,ItemView:null,changeHandler:null,initialize:function(e){var t=this;n.prototype.initialize.apply(this,[e]),this.collection.length&&(this.selectedIndex>-1?this.selectedId=this.collection.at(this.selectedIndex).get("id"):this.selectedId&&(this.model=this.collection.findWhere({id:this.selectedId}),this.selectedIndex=this.collection.indexOf(this.model))),this.oldSelectedIndex=this.selectedIndex,this.listenTo(this.collection,"update",function(){t.model=t.collection.findWhere({id:t.selectedId}),t.model?t.selectedIndex=t.collection.indexOf(t.model):(t.selectedIndex=0,t.collection.length&&t.selectedIndex>-1&&(t.selectedId=t.collection.at(t.selectedIndex).get("id"))),t.render()})},render:function(){var e=this,t="";return this.$el.empty(),this.$el.addClass(this.class),this.disabled&&this.$el.addClass("ui-dis"),t=this.collection.length&&this.selectedIndex>-1?this.collection.at(this.selectedIndex).get("title"):this.label,this.button=new s({label:t,disabled:!this.collection.length,align:"justify",iconOrder:1,action:function(){e.toggle()}}),this.addSubview(this.button),this.collection.length&&(this.opened?this.open():this.close()),this},toggle:function(){this.disabled||(this.opened?(this.opened=!1,this.close(),this.selectedIndex>-1&&(this.button.setLabel(this.collection.at(this.selectedIndex).get("title")),this.oldSelectedIndex!==this.selectedIndex&&this.changeHandler&&(this.changeHandler(),this.oldSelectedIndex=this.selectedIndex))):(this.opened=!0,this.open()))},open:function(){var t=this,s=this.$el[0].getBoundingClientRect(),a="";switch(this.rect={top:s.top,bottom:s.bottom,left:s.left,width:s.width,height:s.height},this.$el.addClass("state-opened"),this.overlayView=new n({class:"ui-select-overlay",state:function(){return"pending"},events:{tapone:function(){t.toggle()}}}),e("body").append(this.overlayView.render().el),i.trigger("uikit-modal",this.overlayView),this.listView=new n({class:"ui-select-list "+this.listClass}),this.overlayView.addSubview(this.listView),this.appearance){case"down":a="top: "+(this.rect.top+this.rect.height)+"px; left:"+this.rect.left+"px; width:"+this.rect.width+"px;";break;case"up":a="top: auto; bottom: "+(e(window).height()-this.rect.top)+"px; left:"+this.rect.left+"px; width:"+this.rect.width+"px;"}this.listView.$el.attr("style",a),this.listContentView=new n({class:"ui-select-list-content"}),this.listView.addSubview(this.listContentView),this.collection.each(function(e,i){t.listContentView.addSubview(new t.ItemView({model:e,events:{tapone:function(){t.oldSelectedIndex=t.selectedIndex,t.selectedIndex=i,t.selectedId=t.collection.at(t.selectedIndex).get("id"),console.log("this.selectedId = ",t.selectedId),t.toggle()}}}))}),setTimeout(this.layoutOpen,0)},layoutOpen:function(){var t,i=this.listContentView.$el.outerHeight(!0);switch(this.appearance){case"down":t=e(window).height()-(this.rect.top+this.rect.height);break;case"up":t=this.rect.top}t<i&&this.listContentView.$el.attr("style","height:"+t+"px;")},close:function(){this.$el.removeClass("state-opened"),this.overlayView&&this.overlayView.destroy()}})}),s("uikit/UICheckbox",["jquery","underscore","backbone","./UIView"],function(e,t,i,n){return n.extend({className:"ui-checkbox",name:"",checked:!1,events:{tapone:"taponeHandler",touchstart:"touchstartHandler",touchend:"touchendHandler",swipemove:"swipemoveHandler"},render:function(){return this.$el.empty(),this.checked&&this.$el.addClass("checked"),this.$el.addClass(this.class),this.disabled&&this.$el.addClass("ui-dis"),this.hidden&&this.$el.addClass("ui-hid"),this},taponeHandler:function(){this.checked?(this.$el.removeClass("checked"),this.checked=!1):(this.$el.addClass("checked"),this.checked=!0),this.changeHandler(this.checked)},changeHandler:function(){}})}),s("uikit/alertView",["jquery","underscore","backbone","./UIView","./UIButton","./UILabel"],function(e,t,i,n,s,a){return function(t){var l,o,c=e.Deferred();return l=n.extend({className:"ui-alert-view",template:'\n        <div class="ui-alert-content"></div>',$content:null,title:"&nbsp;",message:"",okButtonLabel:"OK",render:function(){return this.$el.empty(),this.$el.html(this.template),this.$content=this.$el.find(".ui-alert-content"),this.addSubview(new a({class:"alert-title-label",text:this.title}),this.$content),this.addSubview(new a({class:"alert-message-label",text:this.message}),this.$content),this.addSubview(new s({class:"alert-ok-btn",label:this.okButtonLabel,action:this.resolve}),this.$content),this},show:function(){e("body").append(this.render().el)},resolve:function(e){c.resolve(e),this.destroy()}}),o=new l(t),o.show(),i.trigger("uikit-modal",o),c.promise(o)}}),s("uikit/confirmView",["jquery","underscore","backbone","./UIView","./UIButton","./UILabel"],function(e,t,i,n,s,a){return function(t){var l,o,c=e.Deferred();return l=n.extend({className:"ui-confirm-view",template:'\n        <div class="ui-confirm-content">\n          <div class="text-place"></div>\n          <div class="buttons-place"></div>\n        </div>',$textPlace:null,$buttonsPlace:null,title:"&nbsp;",message:"",okButtonLabel:"OK",cancelButtonLabel:"Cancel",render:function(){return this.$el.empty(),this.$el.html(this.template),this.$textPlace=e(".text-place",this.$el),this.$buttonsPlace=e(".buttons-place",this.$el),this.addSubview(new a({class:"confirm-title-label",text:this.title}),this.$textPlace),this.addSubview(new a({class:"confirm-message-label",text:this.message}),this.$textPlace),this.addSubview(new s({class:"confirm-cancel-btn",label:this.cancelButtonLabel,action:this.reject}),this.$buttonsPlace),this.addSubview(new s({class:"confirm-ok-btn",label:this.okButtonLabel,action:this.resolve}),this.$buttonsPlace),this},show:function(){e("body").append(this.render().el)},resolve:function(e){c.resolve(e),this.destroy()},reject:function(e){c.reject(e),this.destroy()}}),o=new l(t),o.show(),i.trigger("uikit-modal",o),c.promise(o)}}),s("uikit/modalView",["jquery","underscore","backbone","./UIView"],function(e,t,i,n){return function(t){var s,a,l=e.Deferred();return s=n.extend({className:"ui-modal-view",contentView:null,obj:null,events:{tapone:"notify"},render:function(){return this.$el.empty(),this.contentView?this.addSubview(this.contentView):console.error("contentView is needed"),this},show:function(){e("body").append(this.render().el)},resolve:function(e){l.resolve(e),this.destroy()},reject:function(e){l.reject(e),this.destroy()},notify:function(e){l.notify(e)}}),a=new s(t),a.show(),i.trigger("uikit-modal",a),l.promise(a)}}),s("uikit/promptView",["jquery","underscore","backbone","./UIView","./UIButton","./UILabel","./UITextField"],function(e,t,i,n,s,a,l){return function(t){var o,c,h=e.Deferred();return o=n.extend({className:"ui-prompt-view",template:'\n        <div class="ui-prompt-content">\n          <div class="text-place"></div>\n          <div class="input-place"></div>\n          <div class="buttons-place"></div>\n        </div>',$textPlace:null,$buttonsPlace:null,title:"&nbsp;",message:"",placeholder:"",value:"",okButtonLabel:"OK",cancelButtonLabel:"Cancel",textField:null,render:function(){return this.$el.empty(),this.$el.html(this.template),this.$textPlace=e(".text-place",this.$el),this.$inputPlace=e(".input-place",this.$el),this.$buttonsPlace=e(".buttons-place",this.$el),this.addSubview(new a({class:"prompt-title-label",text:this.title}),this.$textPlace),this.addSubview(new a({class:"prompt-message-label",text:this.message}),this.$textPlace),this.textField=new l({class:"prompt-input",autofocus:!0,placeholder:this.placeholder,value:this.value}),this.addSubview(this.textField,this.$inputPlace),this.addSubview(new s({class:"prompt-cancel-btn",label:this.cancelButtonLabel,action:this.reject}),this.$buttonsPlace),this.addSubview(new s({class:"prompt-ok-btn",label:this.okButtonLabel,action:this.resolveWithData}),this.$buttonsPlace),this},show:function(){e("body").append(this.render().el)},resolveWithData:function(){this.resolve(this.textField.value)},resolve:function(e){h.resolve(e),this.destroy()},reject:function(e){h.reject(e),this.destroy()}}),c=new o(t),c.show(),i.trigger("uikit-modal",c),h.promise(c)}}),s("uikit/actionSheet",["jquery","underscore","backbone","./UIView","./UIButton","./UILabel"],function(e,t,i,n,s,a){return function(t){var l,o,c=e.Deferred();return l=n.extend({className:"ui-action-sheet-view",template:'\n        <div class="ui-action-sheet-content">\n          <div class="ui-action-sheet-ok">\n            <div class="ui-action-title-place"></div>\n            <div class="ui-action-sheet-actions-scroll">\n              <div class="ui-action-sheet-actions"></div>\n            </div>\n          </div>\n          <div class="ui-action-cancel-place"></div>\n        </div>',$content:null,$titlePlace:null,$actions:null,$cancelPlace:null,title:"&nbsp;",actions:null,cancelButtonLabel:"Cancel",events:{touchstart:"touchstartHandler",touchend:"touchendHandler"},touchstartHandler:function(e){e.preventDefault()},touchendHandler:function(e){e.preventDefault()},render:function(){var e=this;return this.$el.empty(),this.$el.html(this.template),this.$content=this.$el.find(".ui-action-sheet-content"),this.$titlePlace=this.$el.find(".ui-action-title-place"),this.$actionsScroll=this.$el.find(".ui-action-sheet-actions-scroll"),this.$actions=this.$el.find(".ui-action-sheet-actions"),this.$cancelPlace=this.$el.find(".ui-action-cancel-place"),this.addSubview(new a({class:"action-sheet-message-label",text:this.title}),this.$titlePlace),this.actions&&this.actions.length&&this.actions.forEach(function(t,i){e.addSubview(new s({class:"action-sheet-action-btn",label:t.label,action:function(){e.resolve(i),t.action&&t.action()}}),e.$actions)}),this.addSubview(new s({class:"action-sheet-cancel-btn",label:this.cancelButtonLabel,action:this.reject}),this.$cancelPlace),setTimeout(function(){e.layout()},0),this},layout:function(){var e=this.$el.height()-200,t=this.$actions.height();console.log("maxHeight = ",e),console.log("actionsHeight = ",t),t>e&&this.$actionsScroll.attr("style","height: "+e+"px; -webkit-overflow-scrolling: touch;");
},show:function(){e("body").append(this.render().el)},resolve:function(e){c.resolve(e),this.destroy()},reject:function(e){c.reject(e),this.destroy()}}),o=new l(t),o.show(),i.trigger("uikit-modal",o),c.promise(o)}}),s("uikit",["require","./uikit/UIView","./uikit/UIButton","./uikit/UISegmentedControl","./uikit/UIStepper","./uikit/UILabel","./uikit/UITextField","./uikit/UITextView","./uikit/UIImageView","./uikit/UINavigationBar","./uikit/UITabBarItem","./uikit/UITabBar","./uikit/UIScrollView","./uikit/UIActivityIndicatorView","./uikit/UIAccordion","./uikit/UISelect","./uikit/UICheckbox","./uikit/alertView","./uikit/confirmView","./uikit/modalView","./uikit/promptView","./uikit/actionSheet"],function(e){"use strict";return{version:"1.0.0",UIView:e("./uikit/UIView"),UIButton:e("./uikit/UIButton"),UISegmentedControl:e("./uikit/UISegmentedControl"),UIStepper:e("./uikit/UIStepper"),UILabel:e("./uikit/UILabel"),UITextField:e("./uikit/UITextField"),UITextView:e("./uikit/UITextView"),UIImageView:e("./uikit/UIImageView"),UINavigationBar:e("./uikit/UINavigationBar"),UITabBarItem:e("./uikit/UITabBarItem"),UITabBar:e("./uikit/UITabBar"),UIScrollView:e("./uikit/UIScrollView"),UIActivityIndicatorView:e("./uikit/UIActivityIndicatorView"),UIAccordion:e("./uikit/UIAccordion"),UISelect:e("./uikit/UISelect"),UICheckbox:e("./uikit/UICheckbox"),alert:e("./uikit/alertView"),confirm:e("./uikit/confirmView"),modal:e("./uikit/modalView"),prompt:e("./uikit/promptView"),actionSheet:e("./uikit/actionSheet")}}),s("jquery",function(){return e}),s("underscore",function(){return t}),s("backbone",function(){return Backbone}),n("uikit")});