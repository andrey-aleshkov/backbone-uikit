!function(t,e){"function"==typeof define&&define.amd?define(["jquery","underscore","backbone"],e):t.uikit=e(t.$,t._,t.Backbone)}(this,function(t,e){var i,n,s;return function(t){function e(t,e){return k.call(t,e)}function a(t,e){var i,n,s,a,l,o,r,c,h,u,d,m,f=e&&e.split("/"),p=y.map,b=p&&p["*"]||{};if(t){for(t=t.split("/"),l=t.length-1,y.nodeIdCompat&&I.test(t[l])&&(t[l]=t[l].replace(I,"")),"."===t[0].charAt(0)&&f&&(m=f.slice(0,f.length-1),t=m.concat(t)),h=0;h<t.length;h++)if(d=t[h],"."===d)t.splice(h,1),h-=1;else if(".."===d){if(0===h||1===h&&".."===t[2]||".."===t[h-1])continue;h>0&&(t.splice(h-1,2),h-=2)}t=t.join("/")}if((f||b)&&p){for(i=t.split("/"),h=i.length;h>0;h-=1){if(n=i.slice(0,h).join("/"),f)for(u=f.length;u>0;u-=1)if(s=p[f.slice(0,u).join("/")],s&&(s=s[n])){a=s,o=h;break}if(a)break;!r&&b&&b[n]&&(r=b[n],c=h)}!a&&r&&(a=r,o=c),a&&(i.splice(0,o,a),t=i.join("/"))}return t}function l(e,i){return function(){var n=x.call(arguments,0);return"string"!=typeof n[0]&&1===n.length&&n.push(null),m.apply(t,n.concat([e,i]))}}function o(t){return function(e){return a(e,t)}}function r(t){return function(e){b[t]=e}}function c(i){if(e(v,i)){var n=v[i];delete v[i],w[i]=!0,d.apply(t,n)}if(!e(b,i)&&!e(w,i))throw new Error("No "+i);return b[i]}function h(t){var e,i=t?t.indexOf("!"):-1;return i>-1&&(e=t.substring(0,i),t=t.substring(i+1,t.length)),[e,t]}function u(t){return function(){return y&&y.config&&y.config[t]||{}}}var d,m,f,p,b={},v={},y={},w={},k=Object.prototype.hasOwnProperty,x=[].slice,I=/\.js$/;f=function(t,e){var i,n=h(t),s=n[0];return t=n[1],s&&(s=a(s,e),i=c(s)),s?t=i&&i.normalize?i.normalize(t,o(e)):a(t,e):(t=a(t,e),n=h(t),s=n[0],t=n[1],s&&(i=c(s))),{f:s?s+"!"+t:t,n:t,pr:s,p:i}},p={require:function(t){return l(t)},exports:function(t){var e=b[t];return"undefined"!=typeof e?e:b[t]={}},module:function(t){return{id:t,uri:"",exports:b[t],config:u(t)}}},d=function(i,n,s,a){var o,h,u,d,m,y,k=[],x=typeof s;if(a=a||i,"undefined"===x||"function"===x){for(n=!n.length&&s.length?["require","exports","module"]:n,m=0;m<n.length;m+=1)if(d=f(n[m],a),h=d.f,"require"===h)k[m]=p.require(i);else if("exports"===h)k[m]=p.exports(i),y=!0;else if("module"===h)o=k[m]=p.module(i);else if(e(b,h)||e(v,h)||e(w,h))k[m]=c(h);else{if(!d.p)throw new Error(i+" missing "+h);d.p.load(d.n,l(a,!0),r(h),{}),k[m]=b[h]}u=s?s.apply(b[i],k):void 0,i&&(o&&o.exports!==t&&o.exports!==b[i]?b[i]=o.exports:u===t&&y||(b[i]=u))}else i&&(b[i]=s)},i=n=m=function(e,i,n,s,a){if("string"==typeof e)return p[e]?p[e](i):c(f(e,i).f);if(!e.splice){if(y=e,y.deps&&m(y.deps,y.callback),!i)return;i.splice?(e=i,i=n,n=null):e=t}return i=i||function(){},"function"==typeof n&&(n=s,s=a),s?d(t,e,i,n):setTimeout(function(){d(t,e,i,n)},4),m},m.config=function(t){return m(t)},i._defined=b,s=function(t,i,n){if("string"!=typeof t)throw new Error("See almond README: incorrect module build, no module name");i.splice||(n=i,i=[]),e(b,t)||e(v,t)||(v[t]=[t,i,n])},s.amd={jQuery:!0}}(),s("libs/almond/almond-0.3.2",function(){}),s("uikit/UIView",["jquery","underscore","backbone"],function(t,e,i){return i.View.extend({className:"ui-view",animation:null,title:"",icon:"",class:"",oldClass:"",name:"",oldName:"",disabled:!1,hidden:!1,selected:!1,superview:null,subviews:null,items:null,userInteractionEnabled:!1,events:{},initialize:function(t){var i,n={},s=0,a="ontouchend"in document;if(this.subviews=[],t)for(i in t)t.hasOwnProperty(i)&&(this[i]=t[i]);for(i in this.events)if(this.events.hasOwnProperty(i))switch(i){case"touchstart":a?n.touchstart=this.events[i]:n.mousedown=this.events[i],s++;break;case"touchend":a?n.touchend=this.events[i]:n.mouseup=this.events[i],s++;break;case"mousedown":a?n.touchstart=this.events[i]:n.mousedown=this.events[i],s++;break;case"mouseup":a?n.touchend=this.events[i]:n.mouseup=this.events[i],s++;break;case"swipemove":case"pinch":case"tapone":case"mouseenter":case"mouseover":case"mouseleave":case"mousemove":case"mouseout":n[i]=this.events[i],s++;break;default:console.error("UIView: Sorry, unknown event name")}s&&(this.events=n,this.userInteractionEnabled=!0),this.delegateEvents(),this.animation&&this.animation.keyframes&&(this.animation.keyframes.current=JSON.parse(JSON.stringify(this.animation.keyframes["0%"]))),e.bindAll.apply(e,[this].concat(e.functions(this))),this.$el.on("webkitTransitionEnd",this.transitionEndHandler)},transitionEndHandler:function(t){t.stopPropagation()},destroy:function(){this.remove(),this.unbind(),e.each(this.subviews,function(t){t.destroy&&t.destroy()})},render:function(){return this.$el.empty(),this.name&&this.setName(this.name),this.class&&this.setClass(this.class),this.addItems(),this},size:function(){var t=this.$el[0].getBoundingClientRect();return{width:t.width,height:t.height}},touchstartHandler:function(t){t.preventDefault(),this.userInteractionEnabled&&!this.disabled&&this.select()},touchendHandler:function(t){t.preventDefault(),this.userInteractionEnabled&&!this.disabled&&this.deselect()},taponeHandler:function(t){this.userInteractionEnabled&&!this.disabled&&t.stopPropagation()},swipemoveHandler:function(t){this.userInteractionEnabled&&!this.disabled&&t.stopPropagation()},setName:function(t){this.oldName=this.name,this.name=t,this.$el.removeClass(this.oldName).addClass(this.name)},setClass:function(t){this.oldClass=this.class,this.class=t,this.$el.removeClass(this.oldClass).addClass(this.class)},disable:function(){this.disabled=!0,this.$el.addClass("ui-dis")},enable:function(){this.disabled=!1,this.$el.removeClass("ui-dis")},hide:function(){this.hidden=!0,this.$el.addClass("ui-hid"),this.viewDidDisappear()},show:function(){this.hidden=!1,this.$el.removeClass("ui-hid"),this.viewDidAppear()},deselect:function(){this.selected=!1,this.$el.removeClass("ui-sel")},select:function(){this.selected=!0,this.$el.addClass("ui-sel")},addSubview:function(e,i){var n=this.$el,s=!1;i&&(i instanceof jQuery?i.length?n=i:(console.error("empty jquery object"),s=!0):"string"==typeof i&&(n=t(i,this.$el),n.length||(console.error("wrong selector ",i),s=!0))),s||(n.append(e.render().el),e.superview=this,this.subviews.push(e))},addItems:function(){var t=this;e.each(this.items,function(e){t.addSubview(e)})},bringSubviewToFront:function(t){e.each(this.subviews,function(e){e!==t&&e.hide()}),t.show()},addTabBar:function(t){t.superview=this,this.$el.append(t.render().el),this.$el.addClass("view-has-tab-bar")},viewDidAppear:function(){},viewDidDisappear:function(){},goBack:function(t){t.remove(),this.subviews.pop()},calculateAnimatedStyles:function(t){var e,i,n;if(t<=1){for(e in this.animation.keyframes["100%"])if(this.animation.keyframes["100%"].hasOwnProperty(e))switch(e){case"transform":for(i in this.animation.keyframes["100%"].transform)if(this.animation.keyframes["100%"].transform.hasOwnProperty(i))switch(i){case"translate":case"rotate":case"scale":this.animation.keyframes.current[e][i]||(this.animation.keyframes.current[e][i]={}),this.animation.keyframes["100%"][e][i].hasOwnProperty("x")&&(this.animation.keyframes.current[e][i].x=this.animation.keyframes["0%"][e][i].x+(this.animation.keyframes["100%"][e][i].x-this.animation.keyframes["0%"][e][i].x)*t),this.animation.keyframes["100%"][e][i].hasOwnProperty("y")&&(this.animation.keyframes.current[e][i].y=this.animation.keyframes["0%"][e][i].y+(this.animation.keyframes["100%"][e][i].y-this.animation.keyframes["0%"][e][i].y)*t),this.animation.keyframes["100%"][e][i].hasOwnProperty("z")&&(this.animation.keyframes.current[e][i].z=this.animation.keyframes["0%"][e][i].z+(this.animation.keyframes["100%"][e][i].z-this.animation.keyframes["0%"][e][i].z)*t);break;default:console.error("not translate | rotate | scale")}break;case"opacity":this.animation.keyframes.current[e]=this.animation.keyframes["0%"][e]+(this.animation.keyframes["100%"][e]-this.animation.keyframes["0%"][e])*t;break;default:console.error("not transform | opacity")}}else if(this.animation.keyframes.hasOwnProperty("200%")){n=t-1;for(e in this.animation.keyframes["200%"])if(this.animation.keyframes["200%"].hasOwnProperty(e))switch(e){case"transform":for(i in this.animation.keyframes["200%"].transform)if(this.animation.keyframes["200%"].transform.hasOwnProperty(i))switch(i){case"translate":case"rotate":case"scale":this.animation.keyframes["200%"][e][i].hasOwnProperty("x")&&(this.animation.keyframes.current[e][i].x=this.animation.keyframes["100%"][e][i].x+(this.animation.keyframes["200%"][e][i].x-this.animation.keyframes["100%"][e][i].x)*n),this.animation.keyframes["200%"][e][i].hasOwnProperty("y")&&(this.animation.keyframes.current[e][i].y=this.animation.keyframes["100%"][e][i].y+(this.animation.keyframes["200%"][e][i].y-this.animation.keyframes["100%"][e][i].y)*n),this.animation.keyframes["200%"][e][i].hasOwnProperty("z")&&(this.animation.keyframes.current[e][i].z=this.animation.keyframes["100%"][e][i].z+(this.animation.keyframes["200%"][e][i].z-this.animation.keyframes["100%"][e][i].z)*n);break;default:console.error("not translate | rotate | scale")}break;case"opacity":this.animation.keyframes.current[e]=this.animation.keyframes["100%"][e]+(this.animation.keyframes["200%"][e]-this.animation.keyframes["100%"][e])*n;break;default:console.error("not transform | opacity")}}},applyAnimatedStyles:function(t){var e,i,n,s,a,l,o="";t&&(o+="transition: transform 0.6s cubic-bezier(0, 0, 0, 1), opacity 0.6s cubic-bezier(0, 0, 0, 1); "),this.animation.keyframes.current.transform&&(o+="transform:",this.animation.keyframes.current.transform.translate&&(e=this.animation.keyframes.current.transform.translate.x?this.animation.keyframes.current.transform.translate.x+"px":0,i=this.animation.keyframes.current.transform.translate.y?this.animation.keyframes.current.transform.translate.y+"px":0,n=this.animation.keyframes.current.transform.translate.z?this.animation.keyframes.current.transform.translate.z+"px":0,o+="translate3d("+e+", "+i+", "+n+") "),this.animation.keyframes.current.transform.rotate&&(this.animation.keyframes.current.transform.rotate.hasOwnProperty("x")&&(o+="rotate3d(1, 0, 0, "+this.animation.keyframes.current.transform.rotate.x+"deg) "),this.animation.keyframes.current.transform.rotate.hasOwnProperty("y")&&(o+="rotate3d(0, 1, 0, "+this.animation.keyframes.current.transform.rotate.y+"deg) "),this.animation.keyframes.current.transform.rotate.hasOwnProperty("z")&&(o+="rotate3d(0, 0, 1, "+this.animation.keyframes.current.transform.rotate.z+"deg) ")),this.animation.keyframes.current.transform.scale&&(s=this.animation.keyframes.current.transform.scale.x?this.animation.keyframes.current.transform.scale.x:1,a=this.animation.keyframes.current.transform.scale.y?this.animation.keyframes.current.transform.scale.y:1,l=this.animation.keyframes.current.transform.scale.z?this.animation.keyframes.current.transform.scale.z:1,o+="scale3d("+s+", "+a+", "+l+")"),o+="; "),this.animation.keyframes.current.hasOwnProperty("opacity")&&(o+="opacity:"+this.animation.keyframes.current.opacity+"; "),o&&this.$el.attr("style",o)},onSwipe:function(t){this.animation&&"swipe"===this.animation.on&&(this.calculateAnimatedStyles(t),this.applyAnimatedStyles(!1))},onBound:function(t){this.animation&&"swipe"===this.animation.on&&(this.calculateAnimatedStyles(t),this.applyAnimatedStyles(!0))},onAppear:function(){this.animation&&"appear"===this.animation.on&&(this.calculateAnimatedStyles(1),this.applyAnimatedStyles(!0))},onDisappear:function(){this.calculateAnimatedStyles(0),this.applyAnimatedStyles(!1)}})}),s("uikit/UIButton",["jquery","underscore","backbone","./UIView"],function(t,e,i,n){return n.extend({className:"ui-btn",template:'\n      <span class="btn-icon"></span><span class="btn-label"></span>',$icon:null,$label:null,action:null,label:"",icon:"",iconOrder:0,align:"center",events:{tapone:"taponeHandler",touchstart:"touchstartHandler",touchend:"touchendHandler"},render:function(){return this.$el.empty(),this.$el.html(this.template),this.$icon=this.$el.find(".btn-icon"),this.$label=this.$el.find(".btn-label"),this.label&&this.$label.html(this.label),this.icon&&this.$icon.addClass("icon--"+this.icon),this.iconOrder&&this.$icon.addClass("btn-icon--order"),"center"!==this.align&&this.$el.addClass("ui-btn--align-"+this.align),this.$el.addClass(this.class),this.disabled&&this.$el.addClass("ui-dis"),this.hidden&&this.$el.addClass("ui-hid"),this},setLabel:function(t){this.label=t,this.$label.html(this.label)},setIcon:function(t){this.icon=t,this.$icon.addClass("icon--"+t)},touchstartHandler:function(t){this.userInteractionEnabled&&!this.disabled&&(t.stopPropagation(),this.select())},touchendHandler:function(t){this.userInteractionEnabled&&!this.disabled&&(t.stopPropagation(),this.deselect())},taponeHandler:function(t,e){e.originalEvent.stopPropagation(),this.action&&!this.disabled&&this.action(this)}})}),s("uikit/UISegmentedControl",["jquery","underscore","backbone","./UIView","./UIButton"],function(t,e,i,n,s){return n.extend({className:"ui-view ui-segmented-control",selectedIndex:0,items:null,buttons:null,initialize:function(t){n.prototype.initialize.apply(this,[t]),this.buttons=[]},render:function(){var t=this;return this.$el.empty(),this.$el.addClass(this.class),this.disabled&&this.$el.addClass("ui-dis"),this.hidden&&this.$el.addClass("ui-hid"),this.items.forEach(function(e,i){var n=new s({label:e.label,action:function(e){t.buttons.forEach(function(t){t.$el.removeClass("selected")}),e.$el.addClass("selected"),i!==t.selectedIndex&&(t.selectedIndex=i,t.changeHandler(t.selectedIndex))}});t.buttons.push(n),t.addSubview(n),i===t.selectedIndex&&n.$el.addClass("selected")}),this},changeHandler:function(t){}})}),s("uikit/UIStepper",["jquery","underscore","backbone","./UIView","./UIButton"],function(t,e,i,n,s){return n.extend({className:"ui-stepper",model:null,attribute:"",value:0,minimumValue:0,maximumValue:1e3,stepValue:1,autorepeat:!1,decButton:null,incButton:null,changeHandler:null,initialize:function(t){n.prototype.initialize.apply(this,[t]),this.model&&(this.value=this.model.get(this.attribute),(this.value<this.minimumValue||this.value>this.maximumValue)&&console.error("The value ("+this.value+") must be between the minimum ("+this.minimumValue+") and maximum ("+this.maximumValue+") values."))},render:function(){var t=this;return this.$el.empty(),this.setClass(this.class),this.disabled&&this.$el.addClass("ui-dis"),this.hidden&&this.$el.addClass("ui-hid"),this.decButton=new s({class:"ui-stepper-dec-btn",label:"–",action:function(){t.decreaseValue()}}),this.addSubview(this.decButton),this.incButton=new s({class:"ui-stepper-inc-btn",label:"+",action:function(){t.increaseValue()}}),this.addSubview(this.incButton),this.updateUI(),this},updateUI:function(){this.value<=this.minimumValue?(this.decButton.disable(),this.incButton.enable()):this.value>this.minimumValue&&this.value<this.maximumValue?(this.decButton.enable(),this.incButton.enable()):this.value>=this.maximumValue&&(this.decButton.enable(),this.incButton.disable())},updateModel:function(){this.model&&this.model.set(this.attribute,this.value)},decreaseValue:function(){var t=this.value-this.stepValue;t<=this.minimumValue&&(t=this.minimumValue),this.value=t,this.updateUI(),this.updateModel(),this.changeHandler&&this.changeHandler(this.value)},increaseValue:function(){var t=this.value+this.stepValue;t>=this.maximumValue&&(t=this.maximumValue),this.value=t,this.updateUI(),this.updateModel(),this.changeHandler&&this.changeHandler(this.value)}})}),s("uikit/UILabel",["jquery","underscore","backbone","./UIView"],function(t,e,i,n){return n.extend({className:"ui-label",tagName:"label",model:null,attribute:"",text:"",initialize:function(t){n.prototype.initialize.apply(this,[t]),this.model&&this.listenTo(this.model,"change",this.update)},render:function(){return this.$el.empty(),this.setClass(this.class),this.hidden&&this.$el.addClass("ui-hid"),this.model?this.setText(this.model.get(this.attribute)):this.$el.html(this.text),this},update:function(){this.model&&this.setText(this.model.get(this.attribute))},setText:function(t){this.text=t,this.$el.html(this.text)}})}),s("uikit/UITextField",["jquery","underscore","backbone","./UIView"],function(t,e,i,n){return n.extend({className:"ui-text-field",templateInput:e.template('<input type="<%= type %>" class="input-text" id="<%= name %>" name="<%= name %>" placeholder="<%= placeholder %>" value="<%= value %>" <%= autofocus %>>'),templateData:e.template('<div class="data-text" id="<%= name %>"><%= value %></div>'),templatePhoneNumber:e.template('<div class="data-text"><a href="tel:+<%= value %>">+<%= value %></a></div>'),model:null,attribute:"",value:"",valid:!0,$input:null,type:"text",autocomplete:"",name:"",placeholder:"",autofocus:!1,editable:!0,phoneNumber:!1,initialize:function(t){n.prototype.initialize.apply(this,[t]),this.model&&(this.value=this.model.get(this.attribute))},render:function(){var t=this,e={type:this.type,name:this.name,value:this.value,placeholder:this.placeholder,autofocus:this.autofocus?"autofocus":""};return this.$el.empty(),this.editable?(this.$el.html(this.templateInput(e)),this.$input=this.$el.find("input"),this.autocomplete&&this.$input.attr("autocomplete",this.autocomplete),this.$input.on("focus",this.focusHandler),this.$input.on("input",function(e){t.value=t.$input.val(),e.data||(e.data={}),e.data.value=t.value,t.changeHandler(e)}),this.$input.on("keypress",this.keypressHandler),this.$input.on("keydown",this.keydownHandler),this.$input.on("blur",this.blurHandler)):this.phoneNumber?this.$el.html(this.templatePhoneNumber(e)):this.$el.html(this.templateData(e)),this.disabled&&this.$el.addClass("ui-dis"),this.hidden&&this.$el.addClass("ui-hid"),this.class&&this.setClass(this.class),this},setValue:function(t){this.value=t,this.render()},setValid:function(t){this.valid=t,t?this.$el.removeClass("invalid").addClass("valid"):this.$el.removeClass("valid").addClass("invalid")},focusHandler:function(){},keypressHandler:function(){},keydownHandler:function(){},changeHandler:function(){this.model&&this.model.set(this.attribute,this.value)},blurHandler:function(){},focus:function(){this.$input.focus()}})}),s("uikit/UITextView",["jquery","underscore","backbone","./UIView"],function(t,e,i,n){return n.extend({className:"ui-text-view",templateTextarea:e.template('<textarea class="input-text" name="<%= name %>" placeholder="<%= placeholder %>" rows="" cols=""><%= text %></textarea>'),templateData:e.template('<div class="data-text"><%= text %></div>'),$textarea:null,name:"",text:"",placeholder:"",editable:!0,render:function(){var t={name:this.name,text:this.text,placeholder:this.placeholder};return this.$el.empty(),this.setClass(this.class),this.editable?(this.$el.html(this.templateTextarea(t)),this.$textarea=this.$el.find("textarea")):this.$el.html(this.templateData(t)),this.disabled&&this.$el.addClass("ui-dis"),this.hidden&&this.$el.addClass("ui-hid"),this.class&&this.setClass(this.class),this.$textarea.on("change keyup paste",this.changeHandler),this},setText:function(t){this.text=t,this.$el.html(this.text)},changeHandler:function(){this.text=this.$textarea.val()},focus:function(){this.$textarea.focus()}})}),s("uikit/UIImageView",["jquery","underscore","backbone","./UIView"],function(t,e,i,n){return n.extend({className:"ui-image-view",imageUrl:null,frameWidth:null,frameHeight:null,imageWidth:0,imageHeight:0,status:null,image:null,initialize:function(t){n.prototype.initialize.apply(this,[t]),this.image=new Image},render:function(){var t="";return this.$el.empty(),this.setClass(this.class),null!==this.frameWidth&&(t+="width:"+this.frameWidth+"; "),null!==this.frameHeight&&(t+="height:"+this.frameHeight+"; "),"loaded"===this.status&&(t+="background-image: url("+this.imageUrl+");"),t+="background-size: "+this.imageWidth+" "+this.imageHeight+";",this.$el.attr("style",t),this},load:function(){this.beforeLoad(),t(this.image).one("load",function(){this.complete(),this.success()}).one("error",function(){this.complete(),this.error()}).attr("src",this.imageUrl).each(function(){this.complete&&t(this).trigger("load")})},beforeLoad:function(){},complete:function(){},success:function(){this.status="loaded",this.render()},error:function(){this.status="error",this.render()}})}),s("uikit/UINavigationBar",["jquery","underscore","backbone","./UIView"],function(t,e,i,n){return n.extend({className:"ui-view ui-navigation-bar",template:'\n      <div class="left-place"></div>\n      <div class="center-place"></div>\n      <div class="right-place"></div>',leftBarItems:null,centerBarItems:null,rightBarItems:null,events:{touchstart:"touchstartHandler",touchend:"touchendHandler",tapone:"taponeHandler",swipemove:"swipemoveHandler"},render:function(){var t,i,n,s=this;return this.$el.empty(),this.$el.html(this.template),t=this.$el.find(".left-place"),i=this.$el.find(".center-place"),n=this.$el.find(".right-place"),e.each(this.leftBarItems,function(e){s.addSubview(e,t)}),e.each(this.centerBarItems,function(t){s.addSubview(t,i)}),e.each(this.rightBarItems,function(t){s.addSubview(t,n)}),this}})}),s("uikit/UITabBarItem",["jquery","underscore","backbone","./UIView"],function(t,e,i,n){return n.extend({className:"ui-tab-bar-item",template:e.template('<span class="tab-bar-item-icon icon-<%= icon %>"></span><span class="tab-bar-item-text"><%= title %></span>'),events:{tapone:"taponeHandler"},icon:"",title:"",index:null,selected:!1,render:function(){return this.$el.empty(),this.$el.html(this.template({icon:this.icon,title:this.title})),this},taponeHandler:function(){this.superview.selectItem(this.index)},select:function(){this.$el.addClass("selected")},deselect:function(){this.$el.removeClass("selected")}})}),s("uikit/UITabBar",["jquery","underscore","backbone","./UIView","./UITabBarItem"],function(t,e,i,n,s){return n.extend({className:"ui-tab-bar",items:null,selectedIndex:0,render:function(){var t=this;return this.$el.empty(),this.items=[],e.each(this.superview.subviews,function(e,i){var n=new s({icon:e.icon,title:e.title,index:i,superview:t});t.items.push(n),t.$el.append(n.render().el)}),this.selectItem(this.selectedIndex),this},selectItem:function(t){this.selectedIndex=t,e.each(this.items,function(t){t.deselect()}),this.items[this.selectedIndex].select(),this.superview.bringSubviewToFront(this.superview.subviews[this.selectedIndex])}})}),s("uikit/UIScrollView",["jquery","underscore","backbone","./UIView"],function(t,e,i,n){return n.extend({className:"ui-view ui-scroll-view",$content:null,scale:1,currentScale:1,maximumScale:1e3,minimumScale:1e-7,firstPinch:!0,pinch:{x:0,y:0},translate:{x:0,y:0},pinchRelativeTranslate:{x:0,y:0},events:{touchstart:"touchstartHandler",touchend:"touchendHandler",pinch:"gestureHandler",swipemove:"gestureHandler"},render:function(){return this.$el.empty(),this.$el.append('<div class="scroll-content"></div>'),this.$content=this.$el.find(".scroll-content"),this.class&&this.setClass(this.class),this.applyTransforms(),this},addSubview:function(t){this.$content.append(t.render().el),t.superview=this,this.subviews.push(t)},setOffset:function(t){this.translate=t,this.applyTransforms()},setScale:function(t){var e=t;e<this.minimumScale?e=this.minimumScale:e>this.maximumScale&&(e=this.maximumScale),this.scale=e,this.currentScale=e,this.applyTransforms()},setScaleRelativeToPoint:function(t,e){var i={x:0,y:0};i.x=this.translate.x-e.x,i.y=this.translate.y-e.y,this.currentScale=this.scale*t,this.translate.x=i.x*t+e.x,this.translate.y=i.y*t+e.y,this.applyTransforms(),this.scale=this.currentScale},contentSize:function(){var t={top:0,right:0,bottom:0,left:0,width:0,height:0};return this.$content&&(t=this.$content[0].getBoundingClientRect()),{width:t.width,height:t.height}},applyTransforms:function(){var t="";t+="transform: ",t+="translate3d("+this.translate.x+"px, "+this.translate.y+"px, 0px) ",t+="scaleX("+this.currentScale+") scaleY("+this.currentScale+") ",t+=";",this.$content.attr("style",t)},touchstartHandler:function(){},touchendHandler:function(){this.scale=this.currentScale,this.firstPinch=!0},gestureHandler:function(t,e){var i,n,s=0,a=0;switch(t.preventDefault(),e.originalEvent.preventDefault(),i=e.description.split(":"),i[0]){case"pinch":n=this.scale*e.scale,n>=this.minimumScale&&n<=this.maximumScale&&(this.firstPinch&&(this.pinch.x=e.originalEvent.layerX,this.pinch.y=e.originalEvent.layerY,this.pinchRelativeTranslate.x=this.translate.x-this.pinch.x,this.pinchRelativeTranslate.y=this.translate.y-this.pinch.y),this.firstPinch=!1,this.currentScale=this.scale*e.scale,this.translate.x=this.pinchRelativeTranslate.x*e.scale+this.pinch.x,this.translate.y=this.pinchRelativeTranslate.y*e.scale+this.pinch.y);break;case"rotate":break;case"swipemove":"1"===i[1]&&(s=e.delta[0].startX,a=e.delta[0].startY,this.translate.x=s+this.translate.x,this.translate.y=a+this.translate.y);break;case"swipe":}this.testHandler(),this.applyTransforms()},testHandler:function(){}})}),s("uikit/UIActivityIndicatorView",["jquery","underscore","backbone","./UIView"],function(t,e,i,n){return n.extend({className:"ui-activity-indicator-view",isAnimating:!0,render:function(){return this.$el.empty(),this.isAnimating&&this.startAnimating(),this},startAnimating:function(){this.isAnimating=!0,this.$el.addClass("animating")},stopAnimating:function(){this.isAnimating=!1,this.$el.removeClass("animating")}})}),s("uikit/UIAccordionState",["jquery","underscore","backbone","./UIView","./UIButton"],function(t,e,i,n,s){return n.extend({className:"ui-view ui-accordion-state",index:0,item:null,button:null,opened:!1,$button:null,buttonHeight:40,render:function(){return this.button?(this.addSubview(this.button),this.$button=this.button.$el):(this.button=new s({label:this.item.title,align:"justify",iconOrder:1,action:function(){this.superview.toggle()}}),this.addSubview(this.button),this.$button=this.button.$el),this.addSubview(this.item),setTimeout(this.layout,0),this},layout:function(){this.buttonHeight=this.$button.outerHeight(!0),this.opened?this.open():this.close()},open:function(){this.superview.subviews.forEach(function(t){t.close()}),this.opened=!0,this.$el.removeAttr("style").addClass("state-opened")},close:function(){this.opened=!1,this.$el.attr("style","height: "+this.buttonHeight+"px;").removeClass("state-opened")},toggle:function(){this.opened?this.close():this.open()}})}),s("uikit/UIAccordion",["jquery","underscore","backbone","./UIView","./UIButton","./UIAccordionState"],function(t,e,i,n,s,a){return n.extend({className:"ui-view ui-accordion",items:null,buttons:null,openedIndex:null,addItems:function(){var t,e=this;this.items.forEach(function(i,n){t=new a({opened:n===e.openedIndex,index:n,item:i,button:e.buttons?e.buttons[n]:null}),e.addSubview(t)})}})}),s("uikit/UISelect",["jquery","underscore","backbone","./UIView","./UIButton"],function(t,e,i,n,s){return n.extend({className:"ui-view ui-select",collection:null,model:null,oldSelectedIndex:null,selectedIndex:-1,selectedId:null,opened:!1,button:null,label:"",rect:null,listView:null,listContentView:null,overlayView:null,ItemView:null,changeHandler:null,initialize:function(t){var e=this;n.prototype.initialize.apply(this,[t]),this.collection.length&&(this.selectedIndex>-1?this.selectedId=this.collection.at(this.selectedIndex).get("id"):this.selectedId&&(this.model=this.collection.findWhere({id:this.selectedId}),this.selectedIndex=this.collection.indexOf(this.model))),this.oldSelectedIndex=this.selectedIndex,this.listenTo(this.collection,"update",function(){e.model=e.collection.findWhere({id:e.selectedId}),e.model?e.selectedIndex=e.collection.indexOf(e.model):(e.selectedIndex=0,e.collection.length&&e.selectedIndex>-1&&(e.selectedId=e.collection.at(e.selectedIndex).get("id"))),e.render()})},render:function(){var t=this;return this.$el.empty(),this.$el.addClass(this.class),this.disabled&&this.$el.addClass("ui-dis"),this.collection.length&&(this.button=new s({label:this.label?this.label:this.collection.at(this.selectedIndex).get("title"),align:"justify",iconOrder:1,action:function(){t.toggle()}}),this.addSubview(this.button),this.opened?this.open():this.close()),this},toggle:function(){this.disabled||(this.opened?(this.opened=!1,this.close(),this.selectedIndex>-1&&(this.button.setLabel(this.collection.at(this.selectedIndex).get("title")),this.oldSelectedIndex!==this.selectedIndex&&this.changeHandler&&(this.changeHandler(),this.oldSelectedIndex=this.selectedIndex))):(this.opened=!0,this.open()))},open:function(){var e=this,i=this.$el[0].getBoundingClientRect();this.rect={top:i.top,left:i.left,width:i.width,height:i.height},this.$el.addClass("state-opened"),this.overlayView=new n({class:"ui-select-overlay",events:{tapone:function(){e.toggle()}}}),t("body").append(this.overlayView.render().el),this.listView=new n({class:"ui-select-list"}),this.overlayView.addSubview(this.listView),this.listView.$el.attr("style","top: "+(this.rect.top+this.rect.height)+"px; left:"+this.rect.left+"px; width:"+this.rect.width+"px;"),this.listContentView=new n({class:"ui-select-list-content"}),this.listView.addSubview(this.listContentView),this.collection.each(function(t,i){e.listContentView.addSubview(new e.ItemView({model:t,events:{tapone:function(){e.oldSelectedIndex=e.selectedIndex,e.selectedIndex=i,e.selectedId=e.collection.at(e.selectedIndex).get("id"),console.log("this.selectedId = ",e.selectedId),e.toggle()}}}))}),setTimeout(this.layoutOpen,0)},layoutOpen:function(){var e=this.listContentView.$el.outerHeight(!0),i=t(window).height()-(this.rect.top+this.rect.height);i<e&&this.listContentView.$el.attr("style","height:"+i+"px;")},close:function(){this.$el.removeClass("state-opened"),this.overlayView&&this.overlayView.destroy()}})}),s("uikit/UICheckbox",["jquery","underscore","backbone","./UIView"],function(t,e,i,n){return n.extend({className:"ui-checkbox",name:"",checked:!1,events:{tapone:"taponeHandler",touchstart:"touchstartHandler",touchend:"touchendHandler",swipemove:"swipemoveHandler"},render:function(){return this.$el.empty(),this.checked&&this.$el.addClass("checked"),this.$el.addClass(this.class),this.disabled&&this.$el.addClass("ui-dis"),this.hidden&&this.$el.addClass("ui-hid"),this},taponeHandler:function(){this.checked?(this.$el.removeClass("checked"),this.checked=!1):(this.$el.addClass("checked"),this.checked=!0)}})}),s("uikit/alertView",["jquery","underscore","backbone","./UIView","./UIButton","./UILabel"],function(t,e,i,n,s,a){return function(e,i,l){var o,r,c=t.Deferred();return o=n.extend({className:"ui-alert-view",template:'\n        <div class="ui-alert-content"></div>',$content:null,title:"",message:"",okButtonLabel:null,render:function(){return this.$el.empty(),this.$el.html(this.template),this.$content=this.$el.find(".ui-alert-content"),this.addSubview(new a({class:"alert-title-label",text:this.title}),this.$content),this.addSubview(new a({class:"alert-message-label",text:this.message}),this.$content),this.addSubview(new s({class:"alert-ok-btn",label:l?l:"OK",action:this.resolve}),this.$content),this},show:function(){t("body").append(this.render().el)},hide:function(){this.destroy()},resolve:function(t){c.resolve(t),this.hide()}}),r=new o({title:e,message:i,okButtonLabel:l}),r.show(),c.promise()}}),s("uikit/confirmView",["jquery","underscore","backbone","./UIView","./UIButton","./UILabel"],function(t,e,i,n,s,a){return function(e,i,l,o){var r,c,h=t.Deferred();return r=n.extend({className:"ui-confirm-view",template:'\n        <div class="ui-confirm-content">\n          <div class="text-place"></div>\n          <div class="buttons-place"></div>\n        </div>',$textPlace:null,$buttonsPlace:null,title:"",message:"",cancelButtonLabel:null,okButtonLabel:null,render:function(){return this.$el.empty(),this.$el.html(this.template),this.$textPlace=t(".text-place",this.$el),this.$buttonsPlace=t(".buttons-place",this.$el),this.addSubview(new a({class:"confirm-title-label",text:this.title}),this.$textPlace),this.addSubview(new a({class:"confirm-message-label",text:this.message}),this.$textPlace),this.addSubview(new s({class:"confirm-cancel-btn",label:l?l:"Cancel",action:this.reject}),this.$buttonsPlace),this.addSubview(new s({
class:"confirm-ok-btn",label:o?o:"OK",action:this.resolve}),this.$buttonsPlace),this},show:function(){t("body").append(this.render().el)},hide:function(){this.destroy()},resolve:function(t){h.resolve(t),this.hide()},reject:function(t){h.reject(t),this.hide()}}),c=new r({title:e,message:i,cancelButtonLabel:l,okButtonLabel:o}),c.show(),h.promise()}}),s("uikit/modalView",["jquery","underscore","backbone","./UIView"],function(t,e,i,n){return function(e){var i,s,a=t.Deferred();return i=n.extend({className:"ui-modal-view",contentView:null,obj:null,events:{tapone:"notify"},render:function(){return this.$el.empty(),this.contentView?this.addSubview(this.contentView):console.error("contentView is needed"),this},show:function(){t("body").append(this.render().el)},hide:function(){this.destroy()},resolve:function(t){a.resolve(t),this.hide()},reject:function(t){a.reject(t),this.hide()},notify:function(t){a.notify(t)}}),s=new i({contentView:e}),s.show(),a.promise()}}),s("uikit/promptView",["jquery","underscore","backbone","./UIView","./UIButton","./UILabel","./UITextField"],function(t,e,i,n,s,a,l){return function(e,i,o,r,c,h){var u,d,m=t.Deferred();return u=n.extend({className:"ui-prompt-view",template:'\n        <div class="ui-prompt-content">\n          <div class="text-place"></div>\n          <div class="input-place"></div>\n          <div class="buttons-place"></div>\n        </div>',$textPlace:null,$buttonsPlace:null,title:"",message:"",placeholder:"",value:null,cancelButtonLabel:null,okButtonLabel:null,textField:null,render:function(){return this.$el.empty(),this.$el.html(this.template),this.$textPlace=t(".text-place",this.$el),this.$inputPlace=t(".input-place",this.$el),this.$buttonsPlace=t(".buttons-place",this.$el),this.addSubview(new a({class:"prompt-title-label",text:this.title}),this.$textPlace),this.addSubview(new a({class:"prompt-message-label",text:this.message}),this.$textPlace),this.textField=new l({class:"prompt-input",autofocus:!0,placeholder:this.placeholder,value:this.value}),this.addSubview(this.textField,this.$inputPlace),this.addSubview(new s({class:"prompt-cancel-btn",label:c?c:"Cancel",action:this.reject}),this.$buttonsPlace),this.addSubview(new s({class:"prompt-ok-btn",label:h?h:"OK",action:this.resolveWithData}),this.$buttonsPlace),this},show:function(){t("body").append(this.render().el)},hide:function(){this.destroy()},resolveWithData:function(){this.resolve(this.textField.value)},resolve:function(t){m.resolve(t),this.hide()},reject:function(t){m.reject(t),this.hide()}}),d=new u({title:e,message:i,placeholder:o,value:r?r:"",cancelButtonLabel:c,okButtonLabel:h}),d.show(),m.promise()}}),s("uikit/actionSheet",["jquery","underscore","backbone","./UIView","./UIButton","./UILabel"],function(t,e,i,n,s,a){return function(e,i,l){var o,r,c=t.Deferred();return o=n.extend({className:"ui-action-sheet-view",template:'\n        <div class="ui-action-sheet-content">\n          <div class="ui-action-sheet-ok">\n            <div class="ui-action-title-place"></div>\n            <div class="ui-action-sheet-actions-scroll">\n              <div class="ui-action-sheet-actions"></div>\n            </div>\n          </div>\n          <div class="ui-action-cancel-place"></div>\n        </div>',$content:null,$titlePlace:null,$actions:null,$cancelPlace:null,title:"",actions:"",cancelButtonLabel:null,events:{touchstart:"touchstartHandler",touchend:"touchendHandler"},touchstartHandler:function(t){t.preventDefault()},touchendHandler:function(t){t.preventDefault()},render:function(){var t=this;return this.$el.empty(),this.$el.html(this.template),this.$content=this.$el.find(".ui-action-sheet-content"),this.$titlePlace=this.$el.find(".ui-action-title-place"),this.$actionsScroll=this.$el.find(".ui-action-sheet-actions-scroll"),this.$actions=this.$el.find(".ui-action-sheet-actions"),this.$cancelPlace=this.$el.find(".ui-action-cancel-place"),this.addSubview(new a({class:"action-sheet-message-label",text:this.title}),this.$titlePlace),this.actions.forEach(function(e,i){t.addSubview(new s({class:"action-sheet-action-btn",label:e.label,action:function(){t.resolve(i),e.action&&e.action()}}),t.$actions)}),this.addSubview(new s({class:"action-sheet-cancel-btn",label:l?l:"Cancel",action:this.reject}),this.$cancelPlace),setTimeout(function(){t.layout()},0),this},layout:function(){var t=this.$el.height()-200,e=this.$actions.height();console.log("maxHeight = ",t),console.log("actionsHeight = ",e),e>t&&this.$actionsScroll.attr("style","height: "+t+"px; -webkit-overflow-scrolling: touch;")},show:function(){t("body").append(this.render().el)},hide:function(){this.destroy()},resolve:function(t){c.resolve(t),this.hide()},reject:function(t){c.reject(t),this.hide()}}),r=new o({title:e,actions:i,cancelButtonLabel:l}),r.show(),c.promise()}}),s("uikit",["require","./uikit/UIView","./uikit/UIButton","./uikit/UISegmentedControl","./uikit/UIStepper","./uikit/UILabel","./uikit/UITextField","./uikit/UITextView","./uikit/UIImageView","./uikit/UINavigationBar","./uikit/UITabBarItem","./uikit/UITabBar","./uikit/UIScrollView","./uikit/UIActivityIndicatorView","./uikit/UIAccordion","./uikit/UISelect","./uikit/UICheckbox","./uikit/alertView","./uikit/confirmView","./uikit/modalView","./uikit/promptView","./uikit/actionSheet"],function(t){"use strict";return{version:"1.0.0",UIView:t("./uikit/UIView"),UIButton:t("./uikit/UIButton"),UISegmentedControl:t("./uikit/UISegmentedControl"),UIStepper:t("./uikit/UIStepper"),UILabel:t("./uikit/UILabel"),UITextField:t("./uikit/UITextField"),UITextView:t("./uikit/UITextView"),UIImageView:t("./uikit/UIImageView"),UINavigationBar:t("./uikit/UINavigationBar"),UITabBarItem:t("./uikit/UITabBarItem"),UITabBar:t("./uikit/UITabBar"),UIScrollView:t("./uikit/UIScrollView"),UIActivityIndicatorView:t("./uikit/UIActivityIndicatorView"),UIAccordion:t("./uikit/UIAccordion"),UISelect:t("./uikit/UISelect"),UICheckbox:t("./uikit/UICheckbox"),alert:t("./uikit/alertView"),confirm:t("./uikit/confirmView"),modal:t("./uikit/modalView"),prompt:t("./uikit/promptView"),actionSheet:t("./uikit/actionSheet")}}),s("jquery",function(){return t}),s("underscore",function(){return e}),s("backbone",function(){return Backbone}),n("uikit")});