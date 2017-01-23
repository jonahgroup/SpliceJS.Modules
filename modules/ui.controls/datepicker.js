define([
    
	'require',
    '{splice.modules}/inheritance',
    '{splice.modules}/component',
    '{splice.modules}/event',
    '{splice.modules}/view',
	'{splice.modules}/text',
	{
		Calendar:'calendar',
		Selectors:'dropdown'
	},
    'preload|{splice.modules}/component.loader'

],function(require,inheritance,component,event,view,text,controls){
	"use strict";

	var scope = {
		Controls:controls
	};

	var	Class       = inheritance.Class
	,	format      = text.format;

	var factory = component.ComponentFactory(require,scope);

	var DatePicker = Class(function DatePicker(args){
		event.attach(this,{
			onDateSelected : event.MulticastEvent
		});

		this.currentDate = new Date();

		if(args && args.format){
			this.format = args.format;
		}

	}).extend(component.ComponentBase);

	DatePicker.prototype.initialize = function(){

	};

	DatePicker.prototype.onDataIn = function(item){
		this.setDate(item.getValue());
	};

	DatePicker.prototype.receiveFromCalendar = function (date) {
	    this.setDate(date);
	    this.onData(date);
	    this.children.selector.close();
	};

    DatePicker.prototype.onLoaded = function(){
        var selector = this.getComponent('selector');
        var d = this.currentDate; 
        if(this.format)
            d = format('{0:'+this.format+'}',this.currentDate);

        selector.set(d);
    };

    //sets dates and will not trigger events
	DatePicker.prototype.setDate = function (date) {
	    if (!date) return;

	    if (this.format) {
	      date = format('{0:' + this.format + '}', date);
	    } else {
				date = date.toString();
			}

	    this.children.selector.dataIn(date);
	};


	return factory.define('DatePicker:datepicker.html',DatePicker);

});
