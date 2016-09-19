
var Users = Users || {};
Users.View = Users.View || {}; 
Users.Data = Users.Data || {};

var Orders = Orders || {};
Orders.View = Orders.View || {}; 
Orders.Data = Orders.Data || {};

var App = Marionette.Application.extend({
	region: '#app',
	initialize: function(options) {
		console.log('My options:', options);
	},
	onStart: function() {
		console.log(this.getRegion());
		this.getRegion().show(new RootView());
		// this.showView(new RootView()); // are the same
	},

});
app = new App();
app.on('start', 		(e) => console.log(e));
app.on('before:start', 	(e) => console.log(e));
RootView = Marionette.View.extend({
	template: '#t-root',
	regions: {
		'users' : '.users',
		'newOrder' : '.new',
		'orders' : '.orders',

	},
	onRender: function () {
		this.getRegion('users').show(new Users.View.UserCollection());
	}
})



Users.Data.Model = Backbone.Model.extend({
	_name: 'User model',
	defaults: function() {
		return {
			id: this.id, 
			userName: 'Иванов Иван',
			userPic: 'http://placecage.com/200/200',
			balance: 200,
			totalOrders: 5
		}
	},
	validate: function(attrs, options) {
		console.log('validating');
		if (options.permittedValues) {
			console.log(options.permittedValues);
			console.log(_.find(options.permittedValues, (i) => i == attrs.value));
			if (!_.find(options.permittedValues, (i) => i == attrs.value)) {
				return 'Необходимо выбрать значение из предложенного списка'
			}
		}
		if (attrs.pattern != null) {
			if (attrs.value.match(attrs.pattern) === null) {
				return 'Введенное значение &laquo;<b>'+attrs.value + '</b>&raquo; не удовлетворяет условию &laquo;<b>'+attrs.validateText+'</b>&raquo; <code>'+attrs.pattern+'</code>'
			}
		}
	},
	initialize : function() {
		console.log(this.url());
	},

});


Users.Data.Collection = Backbone.Collection.extend({
	model: Users.Data.Model,	
	urlRoot: '/',
	initialize: function(options) {
		this.url = this.urlRoot + options.url;
	},
});
Users.View.User = Marionette.View.extend({
	_name: 'Users.View',
	className: 'user',
	template: '#t-user-snippet',
 	initialize: function(options) {
 		console.debug(this._name);
 		_.extend(this,options);
 	},
	onRender: function() {
		// this.getRegion('input').show(this.input(this.model))
	}
});
Users.View.UserCollection = Marionette.CollectionView.extend({
	childView: Users.View.User,
	collection: new Users.Data.Collection([{
		id: 1,
		userName: 'Иван Иванов',
		userPic: 'http://placecage.com/100/100',
		balance: 200,
		totalOrders: 5
	},{
		id: 2,
		userName: 'Петр Кузнецов',
		userPic: 'http://placecage.com/101/101',
		balance: 1200,
		totalOrders: 3
	},{
		id: 3,
		userName: 'Константин Константинопольский',
		userPic: 'http://placecage.com/99/99',
		balance: -575,
		totalOrders: 4
	}]),
	initialize: function (options) {
		console.log(options);
		console.log(this.childView);
		this.render();
	}
});


// Orders.View.Order = Marionette.View.extend({
// 	_name: 'Users.View',
// 	className: 'user',
// 	template: '#t-user-snippet',
//  	initialize: function(options) {
//  		console.debug(this._name);
//  		_.extend(this,options);
//  	},
// 	onRender: function() {
// 		// this.getRegion('input').show(this.input(this.model))
// 	}
// });
// Orders.View.OrderCollection = Marionette.CollectionView.extend({
// 	childView: Orders.View.Order,
// 	collection: new Orders.Data.Collection([{
// 		id: 1,
// 		userName: 'Иван Иванов',
// 		userPic: 'http://placecage.com/100/100',
// 		balance: 200,
// 		totalOrders: 5
// 	},{
// 		id: 2,
// 		userName: 'Петр Кузнецов',
// 		userPic: 'http://placecage.com/101/101',
// 		balance: 1200,
// 		totalOrders: 3
// 	},{
// 		id: 3,
// 		userName: 'Константин Константинопольский',
// 		userPic: 'http://placecage.com/99/99',
// 		balance: -575,
// 		totalOrders: 4
// 	}]),
// 	initialize: function (options) {
// 		console.log(options);
// 		console.log(this.childView);
// 		this.render();
// 	}
// });



$(document).ready(function () {
	app.start();
});
