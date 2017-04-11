!function(e,t){"function"==typeof define&&define.amd?define(["jquery","underscore","backbone"],t):e.uikit=t(e.$,e._,e.Backbone)}(this,function(e,t){var i,n,s;return function(e){function t(e,t){return k.call(e,t)}function a(e,t){var i,n,s,a,l,o,r,h,c,u,d,m,f=t&&t.split("/"),p=y.map,b=p&&p["*"]||{};if(e){for(e=e.split("/"),l=e.length-1,y.nodeIdCompat&&I.test(e[l])&&(e[l]=e[l].replace(I,"")),"."===e[0].charAt(0)&&f&&(m=f.slice(0,f.length-1),e=m.concat(e)),c=0;c<e.length;c++)if(d=e[c],"."===d)e.splice(c,1),c-=1;else if(".."===d){if(0===c||1===c&&".."===e[2]||".."===e[c-1])continue;c>0&&(e.splice(c-1,2),c-=2)}e=e.join("/")}if((f||b)&&p){for(i=e.split("/"),c=i.length;c>0;c-=1){if(n=i.slice(0,c).join("/"),f)for(u=f.length;u>0;u-=1)if(s=p[f.slice(0,u).join("/")],s&&(s=s[n])){a=s,o=c;break}if(a)break;!r&&b&&b[n]&&(r=b[n],h=c)}!a&&r&&(a=r,o=h),a&&(i.splice(0,o,a),e=i.join("/"))}return e}function l(t,i){return function(){var n=x.call(arguments,0);return"string"!=typeof n[0]&&1===n.length&&n.push(null),m.apply(e,n.concat([t,i]))}}function o(e){return function(t){return a(t,e)}}function r(e){return function(t){b[e]=t}}function h(i){if(t(v,i)){var n=v[i];delete v[i],w[i]=!0,d.apply(e,n)}if(!t(b,i)&&!t(w,i))throw new Error("No "+i);return b[i]}function c(e){var t,i=e?e.indexOf("!"):-1;return i>-1&&(t=e.substring(0,i),e=e.substring(i+1,e.length)),[t,e]}function u(e){return function(){return y&&y.config&&y.config[e]||{}}}var d,m,f,p,b={},v={},y={},w={},k=Object.prototype.hasOwnProperty,x=[].slice,I=/\.js$/;f=function(e,t){var i,n=c(e),s=n[0];return e=n[1],s&&(s=a(s,t),i=h(s)),s?e=i&&i.normalize?i.normalize(e,o(t)):a(e,t):(e=a(e,t),n=c(e),s=n[0],e=n[1],s&&(i=h(s))),{f:s?s+"!"+e:e,n:e,pr:s,p:i}},p={require:function(e){return l(e)},exports:function(e){var t=b[e];return"undefined"!=typeof t?t:b[e]={}},module:function(e){return{id:e,uri:"",exports:b[e],config:u(e)}}},d=function(i,n,s,a){var o,c,u,d,m,y,k=[],x=typeof s;if(a=a||i,"undefined"===x||"function"===x){for(n=!n.length&&s.length?["require","exports","module"]:n,m=0;m<n.length;m+=1)if(d=f(n[m],a),c=d.f,"require"===c)k[m]=p.require(i);else if("exports"===c)k[m]=p.exports(i),y=!0;else if("module"===c)o=k[m]=p.module(i);else if(t(b,c)||t(v,c)||t(w,c))k[m]=h(c);else{if(!d.p)throw new Error(i+" missing "+c);d.p.load(d.n,l(a,!0),r(c),{}),k[m]=b[c]}u=s?s.apply(b[i],k):void 0,i&&(o&&o.exports!==e&&o.exports!==b[i]?b[i]=o.exports:u===e&&y||(b[i]=u))}else i&&(b[i]=s)},i=n=m=function(t,i,n,s,a){if("string"==typeof t)return p[t]?p[t](i):h(f(t,i).f);if(!t.splice){if(y=t,y.deps&&m(y.deps,y.callback),!i)return;i.splice?(t=i,i=n,n=null):t=e}return i=i||function(){},"function"==typeof n&&(n=s,s=a),s?d(e,t,i,n):setTimeout(function(){d(e,t,i,n)},4),m},m.config=function(e){return m(e)},i._defined=b,s=function(e,i,n){if("string"!=typeof e)throw new Error("See almond README: incorrect module build, no module name");i.splice||(n=i,i=[]),t(b,e)||t(v,e)||(v[e]=[e,i,n])},s.amd={jQuery:!0}}(),s("libs/almond/almond-0.3.2",function(){}),s("uikit/UIView",["jquery","underscore","backbone"],function(e,t,i){return i.View.extend({className:"ui-view",animation:null,title:"",icon:"",class:"",oldClass:"",name:"",oldName:"",disabled:!1,hidden:!1,selected:!1,superview:null,subviews:null,items:null,userInteractionEnabled:!1,events:{},initialize:function(e){var i,n={},s=0,a="ontouchend"in document;if(this.subviews=[],e)for(i in e)e.hasOwnProperty(i)&&(this[i]=e[i]);for(i in this.events)if(this.events.hasOwnProperty(i))switch(i){case"touchstart":a?n.touchstart=this.events[i]:n.mousedown=this.events[i],s++;break;case"touchend":a?n.touchend=this.events[i]:n.mouseup=this.events[i],s++;break;case"mousedown":a?n.touchstart=this.events[i]:n.mousedown=this.events[i],s++;break;case"mouseup":a?n.touchend=this.events[i]:n.mouseup=this.events[i],s++;break;case"swipemove":case"pinch":case"tapone":case"mouseenter":case"mouseover":case"mouseleave":case"mousemove":case"mouseout":n[i]=this.events[i],s++;break;default:console.error("UIView: Sorry, unknown event name")}s&&(this.events=n,this.userInteractionEnabled=!0),this.delegateEvents(),this.animation&&this.animation.keyframes&&(this.animation.keyframes.current=JSON.parse(JSON.stringify(this.animation.keyframes["0%"]))),t.bindAll.apply(t,[this].concat(t.functions(this))),this.$el.on("webkitTransitionEnd",this.transitionEndHandler)},transitionEndHandler:function(e){e.stopPropagation()},destroy:function(){this.remove(),this.unbind(),t.each(this.subviews,function(e){e.destroy&&e.destroy()})},render:function(){return this.$el.empty(),this.name&&this.setName(this.name),this.class&&this.setClass(this.class),this.addItems(),this},size:function(){var e=this.$el[0].getBoundingClientRect();return{width:e.width,height:e.height}},touchstartHandler:function(e){this.userInteractionEnabled&&!this.disabled&&(e.stopPropagation(),this.select())},touchendHandler:function(e){this.userInteractionEnabled&&!this.disabled&&(e.stopPropagation(),this.deselect())},taponeHandler:function(e){this.userInteractionEnabled&&e.stopPropagation()},swipemoveHandler:function(e){e.stopPropagation()},setName:function(e){this.oldName=this.name,this.name=e,this.$el.removeClass(this.oldName).addClass(this.name)},setClass:function(e){this.oldClass=this.class,this.class=e,this.$el.removeClass(this.oldClass).addClass(this.class)},disable:function(){this.disabled=!0,this.$el.addClass("ui-dis")},enable:function(){this.disabled=!1,this.$el.removeClass("ui-dis")},hide:function(){this.hidden=!0,this.$el.addClass("ui-hid"),this.viewDidDisappear()},show:function(){this.hidden=!1,this.$el.removeClass("ui-hid"),this.viewDidAppear()},deselect:function(){this.selected=!1,this.$el.removeClass("ui-sel")},select:function(){this.selected=!0,this.$el.addClass("ui-sel")},addSubview:function(t,i){var n=this.$el,s=!1;i&&(i instanceof jQuery?i.length?n=i:(console.error("empty jquery object"),s=!0):"string"==typeof i&&(n=e(i,this.$el),n.length||(console.error("wrong selector ",i),s=!0))),s||(n.append(t.render().el),t.superview=this,this.subviews.push(t))},addItems:function(){var e=this;t.each(this.items,function(t){e.addSubview(t)})},bringSubviewToFront:function(e){t.each(this.subviews,function(t){t!==e&&t.hide()}),e.show()},addTabBar:function(e){e.superview=this,this.$el.append(e.render().el),this.$el.addClass("view-has-tab-bar")},viewDidAppear:function(){},viewDidDisappear:function(){},goBack:function(e){e.remove(),this.subviews.pop()},calculateAnimatedStyles:function(e){var t,i,n;if(e<=1){for(t in this.animation.keyframes["100%"])if(this.animation.keyframes["100%"].hasOwnProperty(t))switch(t){case"transform":for(i in this.animation.keyframes["100%"].transform)if(this.animation.keyframes["100%"].transform.hasOwnProperty(i))switch(i){case"translate":case"rotate":case"scale":this.animation.keyframes.current[t][i]||(this.animation.keyframes.current[t][i]={}),this.animation.keyframes["100%"][t][i].hasOwnProperty("x")&&(this.animation.keyframes.current[t][i].x=this.animation.keyframes["0%"][t][i].x+(this.animation.keyframes["100%"][t][i].x-this.animation.keyframes["0%"][t][i].x)*e),this.animation.keyframes["100%"][t][i].hasOwnProperty("y")&&(this.animation.keyframes.current[t][i].y=this.animation.keyframes["0%"][t][i].y+(this.animation.keyframes["100%"][t][i].y-this.animation.keyframes["0%"][t][i].y)*e),this.animation.keyframes["100%"][t][i].hasOwnProperty("z")&&(this.animation.keyframes.current[t][i].z=this.animation.keyframes["0%"][t][i].z+(this.animation.keyframes["100%"][t][i].z-this.animation.keyframes["0%"][t][i].z)*e);break;default:console.error("not translate | rotate | scale")}break;case"opacity":this.animation.keyframes.current[t]=this.animation.keyframes["0%"][t]+(this.animation.keyframes["100%"][t]-this.animation.keyframes["0%"][t])*e;break;default:console.error("not transform | opacity")}}else if(this.animation.keyframes.hasOwnProperty("200%")){n=e-1;for(t in this.animation.keyframes["100%"])if(this.animation.keyframes["100%"].hasOwnProperty(t))switch(t){case"transform":for(i in this.animation.keyframes["100%"].transform)if(this.animation.keyframes["100%"].transform.hasOwnProperty(i))switch(i){case"translate":case"rotate":case"scale":this.animation.keyframes["100%"][t][i].hasOwnProperty("x")&&(this.animation.keyframes.current[t][i].x=this.animation.keyframes["100%"][t][i].x+(this.animation.keyframes["200%"][t][i].x-this.animation.keyframes["100%"][t][i].x)*n),this.animation.keyframes["100%"][t][i].hasOwnProperty("y")&&(this.animation.keyframes.current[t][i].y=this.animation.keyframes["100%"][t][i].y+(this.animation.keyframes["200%"][t][i].y-this.animation.keyframes["100%"][t][i].y)*n),this.animation.keyframes["100%"][t][i].hasOwnProperty("z")&&(this.animation.keyframes.current[t][i].z=this.animation.keyframes["100%"][t][i].z+(this.animation.keyframes["200%"][t][i].z-this.animation.keyframes["100%"][t][i].z)*n);break;default:console.error("not translate | rotate | scale")}break;case"opacity":this.animation.keyframes.current[t]=this.animation.keyframes["100%"][t]+(this.animation.keyframes["200%"][t]-this.animation.keyframes["100%"][t])*n;break;default:console.error("not transform | opacity")}}},applyAnimatedStyles:function(e){var t,i,n,s,a,l,o="";e&&(o+="transition: transform 0.6s cubic-bezier(0, 0, 0, 1), opacity 0.6s cubic-bezier(0, 0, 0, 1); "),this.animation.keyframes.current.transform&&(o+="transform:",this.animation.keyframes.current.transform.translate&&(t=this.animation.keyframes.current.transform.translate.x?this.animation.keyframes.current.transform.translate.x+"px":0,i=this.animation.keyframes.current.transform.translate.y?this.animation.keyframes.current.transform.translate.y+"px":0,n=this.animation.keyframes.current.transform.translate.z?this.animation.keyframes.current.transform.translate.z+"px":0,o+="translate3d("+t+", "+i+", "+n+") "),this.animation.keyframes.current.transform.rotate&&(this.animation.keyframes.current.transform.rotate.hasOwnProperty("x")&&(o+="rotate3d(1, 0, 0, "+this.animation.keyframes.current.transform.rotate.x+"deg) "),this.animation.keyframes.current.transform.rotate.hasOwnProperty("y")&&(o+="rotate3d(0, 1, 0, "+this.animation.keyframes.current.transform.rotate.y+"deg) "),this.animation.keyframes.current.transform.rotate.hasOwnProperty("z")&&(o+="rotate3d(0, 0, 1, "+this.animation.keyframes.current.transform.rotate.z+"deg) ")),this.animation.keyframes.current.transform.scale&&(s=this.animation.keyframes.current.transform.scale.x?this.animation.keyframes.current.transform.scale.x:1,a=this.animation.keyframes.current.transform.scale.y?this.animation.keyframes.current.transform.scale.y:1,l=this.animation.keyframes.current.transform.scale.z?this.animation.keyframes.current.transform.scale.z:1,o+="scale3d("+s+", "+a+", "+l+")"),o+="; "),this.animation.keyframes.current.hasOwnProperty("opacity")&&(o+="opacity:"+this.animation.keyframes.current.opacity+"; "),o&&this.$el.attr("style",o)},onSwipe:function(e){this.animation&&"swipe"===this.animation.on&&(this.calculateAnimatedStyles(e),this.applyAnimatedStyles(!1))},onBound:function(e){this.animation&&"swipe"===this.animation.on&&(this.calculateAnimatedStyles(e),this.applyAnimatedStyles(!0))},onAppear:function(){this.animation&&"appear"===this.animation.on&&(this.calculateAnimatedStyles(1),this.applyAnimatedStyles(!0))},onDisappear:function(){this.calculateAnimatedStyles(0),this.applyAnimatedStyles(!1)}})}),s("uikit/UIButton",["jquery","underscore","backbone","./UIView"],function(e,t,i,n){return n.extend({className:"ui-btn",template:'\n      <span class="btn-icon"></span><span class="btn-label"></span>',$icon:null,$label:null,action:null,label:"",icon:"",iconOrder:0,align:"center",events:{tapone:"taponeHandler",touchstart:"touchstartHandler",touchend:"touchendHandler",swipemove:"swipemoveHandler"},render:function(){return this.$el.empty(),this.$el.html(this.template),this.$icon=this.$el.find(".btn-icon"),this.$label=this.$el.find(".btn-label"),this.label&&this.$label.html(this.label),this.icon&&this.$icon.addClass("icon--"+this.icon),this.iconOrder&&this.$icon.addClass("btn-icon--order"),"center"!==this.align&&this.$el.addClass("ui-btn--align-"+this.align),this.$el.addClass(this.class),this.disabled&&this.$el.addClass("ui-dis"),this.hidden&&this.$el.addClass("ui-hid"),this},setLabel:function(e){this.label=e,this.$label.html(this.label)},setIcon:function(e){this.icon=e,this.$icon.addClass("icon--"+e)},taponeHandler:function(e,t){t.originalEvent.stopPropagation(),this.action&&!this.disabled&&this.action(this)}})}),s("uikit/UISegmentedControl",["jquery","underscore","backbone","./UIView","./UIButton"],function(e,t,i,n,s){return n.extend({className:"ui-view ui-segmented-control",selectedIndex:0,items:null,buttons:null,initialize:function(e){n.prototype.initialize.apply(this,[e]),this.buttons=[]},render:function(){var e=this;return this.$el.empty(),this.$el.addClass(this.class),this.disabled&&this.$el.addClass("ui-dis"),this.hidden&&this.$el.addClass("ui-hid"),this.items.forEach(function(t,i){var n=new s({label:t.label,action:function(t){e.buttons.forEach(function(e){e.$el.removeClass("selected")}),t.$el.addClass("selected"),i!==e.selectedIndex&&(e.selectedIndex=i,e.changeHandler(e.selectedIndex))}});e.buttons.push(n),e.addSubview(n),i===e.selectedIndex&&n.$el.addClass("selected")}),this},changeHandler:function(e){}})}),s("uikit/UIStepper",["jquery","underscore","backbone","./UIView","./UIButton"],function(e,t,i,n,s){return n.extend({className:"ui-stepper",model:null,attribute:"",value:0,minimumValue:0,maximumValue:1e3,stepValue:1,autorepeat:!1,decButton:null,incButton:null,changeHandler:null,initialize:function(e){n.prototype.initialize.apply(this,[e]),this.model&&(this.value=this.model.get(this.attribute),(this.value<this.minimumValue||this.value>this.maximumValue)&&console.error("The value ("+this.value+") must be between the minimum ("+this.minimumValue+") and maximum ("+this.maximumValue+") values."))},render:function(){var e=this;return this.$el.empty(),this.setClass(this.class),this.disabled&&this.$el.addClass("ui-dis"),this.hidden&&this.$el.addClass("ui-hid"),this.decButton=new s({class:"ui-stepper-dec-btn",label:"–",action:function(){e.decreaseValue()}}),this.addSubview(this.decButton),this.incButton=new s({class:"ui-stepper-inc-btn",label:"+",action:function(){e.increaseValue()}}),this.addSubview(this.incButton),this.updateUI(),this},updateUI:function(){this.value<=this.minimumValue?(this.decButton.disable(),this.incButton.enable()):this.value>this.minimumValue&&this.value<this.maximumValue?(this.decButton.enable(),this.incButton.enable()):this.value>=this.maximumValue&&(this.decButton.enable(),this.incButton.disable())},updateModel:function(){this.model&&this.model.set(this.attribute,this.value)},decreaseValue:function(){var e=this.value-this.stepValue;e<=this.minimumValue&&(e=this.minimumValue),this.value=e,this.updateUI(),this.updateModel(),this.changeHandler&&this.changeHandler(this.value)},increaseValue:function(){var e=this.value+this.stepValue;e>=this.maximumValue&&(e=this.maximumValue),this.value=e,this.updateUI(),this.updateModel(),this.changeHandler&&this.changeHandler(this.value)}})}),s("uikit/UILabel",["jquery","underscore","backbone","./UIView"],function(e,t,i,n){return n.extend({className:"ui-label",tagName:"label",model:null,attribute:"",text:"",initialize:function(e){n.prototype.initialize.apply(this,[e]),this.model&&this.listenTo(this.model,"change",this.update)},render:function(){return this.$el.empty(),this.setClass(this.class),this.hidden&&this.$el.addClass("ui-hid"),this.model?this.setText(this.model.get(this.attribute)):this.$el.html(this.text),this},update:function(){this.model&&this.setText(this.model.get(this.attribute))},setText:function(e){this.text=e,this.$el.html(this.text)}})}),s("uikit/UITextField",["jquery","underscore","backbone","./UIView"],function(e,t,i,n){return n.extend({className:"ui-text-field",templateInput:t.template('<input type="<%= type %>" class="input-text" id="<%= name %>" name="<%= name %>" placeholder="<%= placeholder %>" value="<%= value %>" <%= autofocus %>>'),templateData:t.template('<div class="data-text" id="<%= name %>"><%= value %></div>'),templatePhoneNumber:t.template('<div class="data-text"><a href="tel:+<%= value %>">+<%= value %></a></div>'),model:null,attribute:"",value:"",valid:!0,$input:null,type:"text",autocomplete:"",name:"",placeholder:"",autofocus:!1,editable:!0,phoneNumber:!1,initialize:function(e){n.prototype.initialize.apply(this,[e]),this.model&&(this.value=this.model.get(this.attribute))},render:function(){var e=this,t={type:this.type,name:this.name,value:this.value,placeholder:this.placeholder,autofocus:this.autofocus?"autofocus":""};return this.$el.empty(),this.editable?(this.$el.html(this.templateInput(t)),this.$input=this.$el.find("input"),this.autocomplete&&this.$input.attr("autocomplete",this.autocomplete),this.$input.on("focus",this.focusHandler),this.$input.on("input",function(){e.value=e.$input.val(),e.changeHandler(e.value)}),this.$input.on("keypress",this.keypressHandler),this.$input.on("keydown",this.keydownHandler),this.$input.on("blur",this.blurHandler)):this.phoneNumber?this.$el.html(this.templatePhoneNumber(t)):this.$el.html(this.templateData(t)),this.disabled&&this.$el.addClass("ui-dis"),this.hidden&&this.$el.addClass("ui-hid"),this.class&&this.setClass(this.class),this},setValue:function(e){this.value=e,this.render()},setValid:function(e){this.valid=e,e?this.$el.removeClass("invalid").addClass("valid"):this.$el.removeClass("valid").addClass("invalid")},focusHandler:function(){},keypressHandler:function(){},keydownHandler:function(){},changeHandler:function(){this.model&&this.model.set(this.attribute,this.value)},blurHandler:function(){},focus:function(){this.$input.focus()}})}),s("uikit/UITextView",["jquery","underscore","backbone","./UIView"],function(e,t,i,n){return n.extend({className:"ui-text-view",templateTextarea:t.template('<textarea class="input-text" name="<%= name %>" placeholder="<%= placeholder %>" rows="" cols=""><%= text %></textarea>'),templateData:t.template('<div class="data-text"><%= text %></div>'),$textarea:null,name:"",text:"",placeholder:"",editable:!0,render:function(){var e={name:this.name,text:this.text,placeholder:this.placeholder};return this.$el.empty(),this.setClass(this.class),this.editable?(this.$el.html(this.templateTextarea(e)),this.$textarea=this.$el.find("textarea")):this.$el.html(this.templateData(e)),this.disabled&&this.$el.addClass("ui-dis"),this.hidden&&this.$el.addClass("ui-hid"),this.class&&this.setClass(this.class),this.$textarea.on("change keyup paste",this.changeHandler),this},setText:function(e){this.text=e,this.$el.html(this.text)},changeHandler:function(){this.text=this.$textarea.val()},focus:function(){this.$textarea.focus()}})}),s("uikit/UIImageView",["jquery","underscore","backbone","./UIView"],function(e,t,i,n){return n.extend({className:"ui-image-view",imageUrl:null,frameWidth:null,frameHeight:null,imageWidth:0,imageHeight:0,status:null,image:null,initialize:function(e){n.prototype.initialize.apply(this,[e]),this.image=new Image},render:function(){var e="";return this.$el.empty(),this.setClass(this.class),null!==this.frameWidth&&(e+="width:"+this.frameWidth+"; "),null!==this.frameHeight&&(e+="height:"+this.frameHeight+"; "),"loaded"===this.status&&(e+="background-image: url("+this.imageUrl+");"),e+="background-size: "+this.imageWidth+" "+this.imageHeight+";",this.$el.attr("style",e),this},load:function(){this.beforeLoad(),e(this.image).one("load",function(){this.complete(),this.success()}).one("error",function(){this.complete(),this.error()}).attr("src",this.imageUrl).each(function(){this.complete&&e(this).trigger("load")})},beforeLoad:function(){},complete:function(){},success:function(){this.status="loaded",this.render()},error:function(){this.status="error",this.render()}})}),s("uikit/UINavigationBar",["jquery","underscore","backbone","./UIView"],function(e,t,i,n){return n.extend({className:"ui-view ui-navigation-bar",template:'\n      <div class="left-place"></div>\n      <div class="center-place"></div>\n      <div class="right-place"></div>',leftBarItems:null,centerBarItems:null,rightBarItems:null,events:{touchstart:"touchstartHandler",touchend:"touchendHandler",tapone:"taponeHandler",swipemove:"swipemoveHandler"},render:function(){var e,i,n,s=this;return this.$el.empty(),this.$el.html(this.template),e=this.$el.find(".left-place"),i=this.$el.find(".center-place"),n=this.$el.find(".right-place"),t.each(this.leftBarItems,function(t){s.addSubview(t,e)}),t.each(this.centerBarItems,function(e){s.addSubview(e,i)}),t.each(this.rightBarItems,function(e){s.addSubview(e,n)}),this}})}),s("uikit/UITabBarItem",["jquery","underscore","backbone","./UIView"],function(e,t,i,n){return n.extend({className:"ui-tab-bar-item",template:t.template('<span class="tab-bar-item-icon icon-<%= icon %>"></span><span class="tab-bar-item-text"><%= title %></span>'),events:{tapone:"taponeHandler"},icon:"",title:"",index:null,selected:!1,render:function(){return this.$el.empty(),this.$el.html(this.template({icon:this.icon,title:this.title})),this},taponeHandler:function(){this.superview.selectItem(this.index)},select:function(){this.$el.addClass("selected")},deselect:function(){this.$el.removeClass("selected")}})}),s("uikit/UITabBar",["jquery","underscore","backbone","./UIView","./UITabBarItem"],function(e,t,i,n,s){return n.extend({className:"ui-tab-bar",items:null,selectedIndex:0,render:function(){var e=this;return this.$el.empty(),this.items=[],t.each(this.superview.subviews,function(t,i){var n=new s({icon:t.icon,title:t.title,index:i,superview:e});e.items.push(n),e.$el.append(n.render().el)}),this.selectItem(this.selectedIndex),this},selectItem:function(e){this.selectedIndex=e,t.each(this.items,function(e){e.deselect()}),this.items[this.selectedIndex].select(),this.superview.bringSubviewToFront(this.superview.subviews[this.selectedIndex])}})}),s("uikit/UIScrollView",["jquery","underscore","backbone","./UIView"],function(e,t,i,n){return n.extend({className:"ui-view ui-scroll-view",$content:null,scale:1,currentScale:1,maximumScale:1e3,minimumScale:1e-7,firstPinch:!0,pinch:{x:0,y:0},translate:{x:0,y:0},pinchRelativeTranslate:{x:0,y:0},events:{touchstart:"touchstartHandler",touchend:"touchendHandler",pinch:"gestureHandler",swipemove:"gestureHandler"},render:function(){return this.$el.empty(),this.$el.append('<div class="scroll-content"></div>'),this.$content=this.$el.find(".scroll-content"),this.class&&this.setClass(this.class),this.applyTransforms(),this},addSubview:function(e){this.$content.append(e.render().el),e.superview=this,this.subviews.push(e)},setOffset:function(e){this.translate=e,this.applyTransforms()},setScale:function(e){var t=e;t<this.minimumScale?t=this.minimumScale:t>this.maximumScale&&(t=this.maximumScale),this.scale=t,this.currentScale=t,this.applyTransforms()},setScaleRelativeToPoint:function(e,t){var i={x:0,y:0};i.x=this.translate.x-t.x,i.y=this.translate.y-t.y,this.currentScale=this.scale*e,this.translate.x=i.x*e+t.x,this.translate.y=i.y*e+t.y,this.applyTransforms(),this.scale=this.currentScale},contentSize:function(){var e={top:0,right:0,bottom:0,left:0,width:0,height:0};return this.$content&&(e=this.$content[0].getBoundingClientRect()),{width:e.width,height:e.height}},applyTransforms:function(){var e="";e+="transform: ",e+="translate3d("+this.translate.x+"px, "+this.translate.y+"px, 0px) ",e+="scaleX("+this.currentScale+") scaleY("+this.currentScale+") ",e+=";",this.$content.attr("style",e)},touchstartHandler:function(){},touchendHandler:function(){this.scale=this.currentScale,this.firstPinch=!0},gestureHandler:function(e,t){var i,n,s=0,a=0;switch(e.preventDefault(),t.originalEvent.preventDefault(),i=t.description.split(":"),i[0]){case"pinch":n=this.scale*t.scale,(n>=this.minimumScale||n<=this.maximumScale)&&(this.firstPinch&&(this.pinch.x=t.originalEvent.layerX,this.pinch.y=t.originalEvent.layerY,this.pinchRelativeTranslate.x=this.translate.x-this.pinch.x,this.pinchRelativeTranslate.y=this.translate.y-this.pinch.y),this.firstPinch=!1,this.currentScale=this.scale*t.scale,this.translate.x=this.pinchRelativeTranslate.x*t.scale+this.pinch.x,this.translate.y=this.pinchRelativeTranslate.y*t.scale+this.pinch.y);break;case"rotate":break;case"swipemove":"1"===i[1]&&(s=t.delta[0].startX,a=t.delta[0].startY,this.translate.x=s+this.translate.x,this.translate.y=a+this.translate.y);break;case"swipe":}this.testHandler(),this.applyTransforms()},testHandler:function(){}})}),s("uikit/UIActivityIndicatorView",["jquery","underscore","backbone","./UIView"],function(e,t,i,n){return n.extend({className:"ui-activity-indicator-view",isAnimating:!0,render:function(){return this.$el.empty(),this.isAnimating&&this.startAnimating(),this},startAnimating:function(){this.isAnimating=!0,this.$el.addClass("animating")},stopAnimating:function(){this.isAnimating=!1,this.$el.removeClass("animating")}})}),s("uikit/UIAccordionState",["jquery","underscore","backbone","./UIView","./UIButton"],function(e,t,i,n,s){return n.extend({className:"ui-view ui-accordion-state",index:0,item:null,button:null,opened:!1,$button:null,buttonHeight:40,render:function(){return this.button?(this.addSubview(this.button),this.$button=this.button.$el):(this.button=new s({label:this.item.title,align:"justify",iconOrder:1,action:function(){this.superview.toggle()}}),this.addSubview(this.button),this.$button=this.button.$el),this.addSubview(this.item),setTimeout(this.layout,0),this},layout:function(){this.buttonHeight=this.$button.outerHeight(!0),this.opened?this.open():this.close()},open:function(){this.superview.subviews.forEach(function(e){e.close()}),this.opened=!0,this.$el.removeAttr("style").addClass("state-opened")},close:function(){this.opened=!1,this.$el.attr("style","height: "+this.buttonHeight+"px;").removeClass("state-opened")},toggle:function(){this.opened?this.close():this.open()}})}),s("uikit/UIAccordion",["jquery","underscore","backbone","./UIView","./UIButton","./UIAccordionState"],function(e,t,i,n,s,a){return n.extend({className:"ui-view ui-accordion",items:null,buttons:null,addItems:function(){var e,t=this;this.items.forEach(function(i,n){e=new a({index:n,item:i,button:t.buttons?t.buttons[n]:null}),t.addSubview(e)})}})}),s("uikit/UISelect",["jquery","underscore","backbone","./UIView","./UIButton"],function(e,t,i,n,s){return n.extend({className:"ui-view ui-select",collection:null,model:null,oldSelectedIndex:null,selectedIndex:-1,selectedId:null,opened:!1,button:null,label:"",rect:null,listView:null,listContentView:null,overlayView:null,ItemView:null,changeHandler:null,initialize:function(e){var t=this;n.prototype.initialize.apply(this,[e]),this.collection.length&&(this.selectedIndex>-1?this.selectedId=this.collection.at(this.selectedIndex).get("id"):this.selectedId&&(this.model=this.collection.findWhere({id:this.selectedId}),this.selectedIndex=this.collection.indexOf(this.model))),this.oldSelectedIndex=this.selectedIndex,this.listenTo(this.collection,"update",function(){t.model=t.collection.findWhere({id:t.selectedId}),t.model?t.selectedIndex=t.collection.indexOf(t.model):(t.selectedIndex=0,t.collection.length&&t.selectedIndex>-1&&(t.selectedId=t.collection.at(t.selectedIndex).get("id"))),t.render()})},render:function(){var e=this;return this.$el.empty(),this.$el.addClass(this.class),this.disabled&&this.$el.addClass("ui-dis"),this.collection.length&&(this.button=new s({label:this.label?this.label:this.collection.at(this.selectedIndex).get("title"),align:"justify",iconOrder:1,action:function(){e.toggle()}}),this.addSubview(this.button),this.opened?this.open():this.close()),this},toggle:function(){this.disabled||(this.opened?(this.opened=!1,this.close(),this.selectedIndex>-1&&(this.button.setLabel(this.collection.at(this.selectedIndex).get("title")),this.oldSelectedIndex!==this.selectedIndex&&this.changeHandler&&(this.changeHandler(),this.oldSelectedIndex=this.selectedIndex))):(this.opened=!0,this.open()))},open:function(){var t=this,i=this.$el[0].getBoundingClientRect();this.rect={top:i.top,left:i.left,width:i.width,height:i.height},this.$el.addClass("state-opened"),this.overlayView=new n({class:"ui-select-overlay",events:{tapone:function(){t.toggle()}}}),e("body").append(this.overlayView.render().el),this.listView=new n({class:"ui-select-list"}),this.overlayView.addSubview(this.listView),this.listView.$el.attr("style","top: "+(this.rect.top+this.rect.height)+"px; left:"+this.rect.left+"px; width:"+this.rect.width+"px;"),this.listContentView=new n({class:"ui-select-list-content"}),this.listView.addSubview(this.listContentView),this.collection.each(function(e,i){t.listContentView.addSubview(new t.ItemView({model:e,events:{tapone:function(){t.oldSelectedIndex=t.selectedIndex,t.selectedIndex=i,t.selectedId=t.collection.at(t.selectedIndex).get("id"),console.log("this.selectedId = ",t.selectedId),t.toggle()}}}))}),setTimeout(this.layoutOpen,0)},layoutOpen:function(){var t=this.listContentView.$el.outerHeight(!0),i=e(window).height()-(this.rect.top+this.rect.height);i<t&&this.listContentView.$el.attr("style","height:"+i+"px;")},close:function(){this.$el.removeClass("state-opened"),this.overlayView&&this.overlayView.destroy()}})}),s("uikit/UICheckbox",["jquery","underscore","backbone","./UIView"],function(e,t,i,n){return n.extend({className:"ui-checkbox",name:"",checked:!1,events:{tapone:"taponeHandler",touchstart:"touchstartHandler",touchend:"touchendHandler",swipemove:"swipemoveHandler"},render:function(){return this.$el.empty(),this.checked&&this.$el.addClass("checked"),this.$el.addClass(this.class),this.disabled&&this.$el.addClass("ui-dis"),this.hidden&&this.$el.addClass("ui-hid"),this},taponeHandler:function(){this.checked?(this.$el.removeClass("checked"),this.checked=!1):(this.$el.addClass("checked"),this.checked=!0)}})}),s("uikit/alertView",["jquery","underscore","backbone","./UIView","./UIButton","./UILabel"],function(e,t,i,n,s,a){return function(t,i,l){var o,r,h=e.Deferred();return o=n.extend({className:"ui-alert-view",template:'\n        <div class="ui-alert-content"></div>',$content:null,title:"",message:"",okButtonLabel:null,render:function(){return this.$el.empty(),this.$el.html(this.template),this.$content=this.$el.find(".ui-alert-content"),this.addSubview(new a({class:"alert-title-label",text:this.title}),this.$content),this.addSubview(new a({class:"alert-message-label",text:this.message}),this.$content),this.addSubview(new s({class:"alert-ok-btn",label:l?l:"OK",action:this.resolve}),this.$content),this},show:function(){e("body").append(this.render().el)},hide:function(){this.destroy()},resolve:function(e){h.resolve(e),this.hide()}}),r=new o({title:t,message:i,okButtonLabel:l}),r.show(),h.promise()}}),s("uikit/confirmView",["jquery","underscore","backbone","./UIView","./UIButton","./UILabel"],function(e,t,i,n,s,a){return function(t,i,l,o){var r,h,c=e.Deferred();return r=n.extend({className:"ui-confirm-view",template:'\n        <div class="ui-confirm-content">\n          <div class="text-place"></div>\n          <div class="buttons-place"></div>\n        </div>',$textPlace:null,$buttonsPlace:null,title:"",message:"",cancelButtonLabel:null,okButtonLabel:null,render:function(){return this.$el.empty(),this.$el.html(this.template),this.$textPlace=e(".text-place",this.$el),this.$buttonsPlace=e(".buttons-place",this.$el),this.addSubview(new a({class:"confirm-title-label",text:this.title}),this.$textPlace),this.addSubview(new a({class:"confirm-message-label",text:this.message}),this.$textPlace),this.addSubview(new s({class:"confirm-cancel-btn",label:l?l:"Cancel",action:this.reject}),this.$buttonsPlace),this.addSubview(new s({class:"confirm-ok-btn",label:o?o:"OK",action:this.resolve}),this.$buttonsPlace),this},show:function(){e("body").append(this.render().el)},hide:function(){this.destroy()},resolve:function(e){c.resolve(e),this.hide()},reject:function(e){c.reject(e),this.hide()}}),h=new r({title:t,message:i,cancelButtonLabel:l,okButtonLabel:o
}),h.show(),c.promise()}}),s("uikit/modalView",["jquery","underscore","backbone","./UIView"],function(e,t,i,n){return function(t){var i,s,a=e.Deferred();return i=n.extend({className:"ui-modal-view",contentView:null,obj:null,events:{tapone:"notify"},render:function(){return this.$el.empty(),this.contentView?this.addSubview(this.contentView):console.error("contentView is needed"),this},show:function(){e("body").append(this.render().el)},hide:function(){this.destroy()},resolve:function(e){a.resolve(e),this.hide()},reject:function(e){a.reject(e),this.hide()},notify:function(e){a.notify(e)}}),s=new i({contentView:t}),s.show(),a.promise()}}),s("uikit/promptView",["jquery","underscore","backbone","./UIView","./UIButton","./UILabel","./UITextField"],function(e,t,i,n,s,a,l){return function(t,i,o,r,h,c){var u,d,m=e.Deferred();return u=n.extend({className:"ui-prompt-view",template:'\n        <div class="ui-prompt-content">\n          <div class="text-place"></div>\n          <div class="input-place"></div>\n          <div class="buttons-place"></div>\n        </div>',$textPlace:null,$buttonsPlace:null,title:"",message:"",placeholder:"",value:null,cancelButtonLabel:null,okButtonLabel:null,textField:null,render:function(){return this.$el.empty(),this.$el.html(this.template),this.$textPlace=e(".text-place",this.$el),this.$inputPlace=e(".input-place",this.$el),this.$buttonsPlace=e(".buttons-place",this.$el),this.addSubview(new a({class:"prompt-title-label",text:this.title}),this.$textPlace),this.addSubview(new a({class:"prompt-message-label",text:this.message}),this.$textPlace),this.textField=new l({class:"prompt-input",autofocus:!0,placeholder:this.placeholder,value:this.value}),this.addSubview(this.textField,this.$inputPlace),this.addSubview(new s({class:"prompt-cancel-btn",label:h?h:"Cancel",action:this.reject}),this.$buttonsPlace),this.addSubview(new s({class:"prompt-ok-btn",label:c?c:"OK",action:this.resolveWithData}),this.$buttonsPlace),this},show:function(){e("body").append(this.render().el)},hide:function(){this.destroy()},resolveWithData:function(){this.resolve(this.textField.value)},resolve:function(e){m.resolve(e),this.hide()},reject:function(e){m.reject(e),this.hide()}}),d=new u({title:t,message:i,placeholder:o,value:r?r:"",cancelButtonLabel:h,okButtonLabel:c}),d.show(),m.promise()}}),s("uikit/actionSheet",["jquery","underscore","backbone","./UIView","./UIButton","./UILabel"],function(e,t,i,n,s,a){return function(t,i,l){var o,r,h=e.Deferred();return o=n.extend({className:"ui-action-sheet-view",template:'\n        <div class="ui-action-sheet-content">\n          <div class="ui-action-title-place"></div>\n          <div class="ui-action-sheet-actions"></div>\n          <div class="ui-action-cancel-place"></div>\n        </div>',$content:null,$titlePlace:null,$actions:null,$cancelPlace:null,title:"",actions:"",cancelButtonLabel:null,render:function(){var e=this;return this.$el.empty(),this.$el.html(this.template),this.$content=this.$el.find(".ui-action-sheet-content"),this.$titlePlace=this.$el.find(".ui-action-title-place"),this.$actions=this.$el.find(".ui-action-sheet-actions"),this.$cancelPlace=this.$el.find(".ui-action-cancel-place"),this.addSubview(new a({class:"action-sheet-message-label",text:this.title}),this.$titlePlace),this.actions.forEach(function(t){e.addSubview(new s({class:"action-sheet-action-btn",label:t.label,action:function(){e.resolve(),t.action()}}),e.$actions)}),this.addSubview(new s({class:"action-sheet-cancel-btn",label:l?l:"Cancel",action:this.resolve}),this.$cancelPlace),this},show:function(){e("body").append(this.render().el)},hide:function(){this.destroy()},resolve:function(e){h.resolve(e),this.hide()}}),r=new o({title:t,actions:i,cancelButtonLabel:l}),r.show(),h.promise()}}),s("uikit",["require","./uikit/UIView","./uikit/UIButton","./uikit/UISegmentedControl","./uikit/UIStepper","./uikit/UILabel","./uikit/UITextField","./uikit/UITextView","./uikit/UIImageView","./uikit/UINavigationBar","./uikit/UITabBarItem","./uikit/UITabBar","./uikit/UIScrollView","./uikit/UIActivityIndicatorView","./uikit/UIAccordion","./uikit/UISelect","./uikit/UICheckbox","./uikit/alertView","./uikit/confirmView","./uikit/modalView","./uikit/promptView","./uikit/actionSheet"],function(e){"use strict";return{version:"1.0.0",UIView:e("./uikit/UIView"),UIButton:e("./uikit/UIButton"),UISegmentedControl:e("./uikit/UISegmentedControl"),UIStepper:e("./uikit/UIStepper"),UILabel:e("./uikit/UILabel"),UITextField:e("./uikit/UITextField"),UITextView:e("./uikit/UITextView"),UIImageView:e("./uikit/UIImageView"),UINavigationBar:e("./uikit/UINavigationBar"),UITabBarItem:e("./uikit/UITabBarItem"),UITabBar:e("./uikit/UITabBar"),UIScrollView:e("./uikit/UIScrollView"),UIActivityIndicatorView:e("./uikit/UIActivityIndicatorView"),UIAccordion:e("./uikit/UIAccordion"),UISelect:e("./uikit/UISelect"),UICheckbox:e("./uikit/UICheckbox"),alert:e("./uikit/alertView"),confirm:e("./uikit/confirmView"),modal:e("./uikit/modalView"),prompt:e("./uikit/promptView"),actionSheet:e("./uikit/actionSheet")}}),s("jquery",function(){return e}),s("underscore",function(){return t}),s("backbone",function(){return Backbone}),n("uikit")});