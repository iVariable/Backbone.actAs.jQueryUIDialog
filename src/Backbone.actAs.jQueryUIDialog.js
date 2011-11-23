Backbone.actAs = Backbone.actAs || {};
Backbone.actAs.jQueryUIDialog = {

	actAs_jQueryUIDialog_options: null,
	actAs_jQueryUIDialog_dialog: null,

	getDialogOptions: function(){
		this.actAs_jQueryUIDialog_options = this.actAs_jQueryUIDialog_options || {
			mainContainerSelector: 'body',
			title: 'Backbone.actAs.jQueryUIDialog',
			'class': '',
			style: '',
			options: {
				autoOpen: true,
				modal:true,
				minWidth: 450
			}
		};
		return this.actAs_jQueryUIDialog_options;
	},

	setDialogOptions: function(options, override){
		var override = override || false,
			_options = this.getDialogOptions();
		if( override ){
			_options = options;
		}else{
			_.extend(
				_options,
				options
			);
		}
		this.actAs_jQueryUIDialog_options = _options;
	},

	getDialog: function(){
		return this.actAs_jQueryUIDialog_dialog;
	},

	showDialogRendered: function(opts){
		var content = '';
		if( typeof this.render == 'function'){
			this.render.apply(this, [].splice.call(arguments,1));
			content = this.el;
		}
		return this.showDialog( content, opts );
	},

	showDialog: function(content,opts){
		if( this.getDialog() ) return;
		var options = this.getDialogOptions();
		if( options.close ) options.close = _.bind( options.close, this );
		if( options.open ) options.open = _.bind( options.open, this );
		var opts = opts || {};
		opts.title = opts.title || options.title;
		opts.style = opts.style || options.style;
		opts['class'] = opts['class'] || options['class'];
		this.actAs_jQueryUIDialog_dialog = $('<div class="Backbone_jQueryUIWindow '+opts['class']+'" style="'+opts.style+'" title="'+opts.title+'"></div>').append(content).appendTo($(this.getDialogOptions().mainContainerSelector));
		var close = options.close,
			_this = this;

		options.options.close = function(){
			if(_this.getDialog()){
				_this.getDialog().remove();
				_this.actAs_jQueryUIDialog_dialog = null;
			}
			if( typeof close == 'function' ) close.apply( this, arguments );
		}

		this.getDialog().dialog( options.options );
		return this.getDialog();
	},

	closeDialog: function(){
		if( this.getDialog() ){
			this.getDialog().dialog("close");
		}
	}

}