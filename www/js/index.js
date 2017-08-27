var app = {
	initialize: function() {
		document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);

		app.appEl = $('.app');

		app.hoursEl = $('.time .hours');
		app.minutesEl = $('.time .minutes');
		app.dateEl = $('.date');

		moment.locale(app.getNavigatorLanguage());

		app.startUpdateTimer();
		app.appEl.addClass('initialized')
	},

	getNavigatorLanguage: function() {
		var result = navigator.language || navigator.userLanguage;
		return result.replace(/-??$/,'');
	},

	startUpdateTimer: function() {
		app.updateTime();
		app.timer = setInterval(app.updateTime,1000);
	},

	stopUpdateTimer: function() {
		if (app.timer) {
			stopInterval(app.timer);
			delete app.timer;
		}
	},

	updateTime: function() {
		var currentDate = moment();

		app.hoursEl.text(currentDate.format('HH'));
		app.minutesEl.text(currentDate.format('mm'));
		app.dateEl.text(currentDate.format('LLLL').replace(/ .*$/,' ')+currentDate.format('LL').replace(/,? [^ ]*$/,''));
	},

	onDeviceReady: function() {
		window.plugins.insomnia.keepAwake();
		AndroidFullScreen.leanMode(function(){
			console.log('Lean mode activated.');
		}, function(err) {
			console.error('Error setting lean mode:',err);
		});
	}
};

app.initialize();
