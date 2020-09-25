module.exports = function (app) {
	return new Handler(app);
};

var Handler = function (app) {
	this.app = app;
};

/**
 * New client entry.
 *
 * @param  {Object}   msg     request message
 * @param  {Object}   session current session object
 * @param  {Function} next    next step callback
 * @return {Void}
 */
Handler.prototype.entry = function (msg, session, next) {
	next(null, { code: 200, msg: 'light sabers are cool' });
};

Handler.prototype.binaryStuff = function (msg, session, next) {
	const toNumber = +msg;
	if (toNumber) {
		const result = getMaxZeroInString((toNumber.toString(2)));
		next(null, { code: 200, msg: `Length of max series of 0 is ${result}. Light sabers are still cool.` })
	} else {
		next(null, { code: 400, msg: 'Please send a valid number!' });
	}
};

function getMaxZeroInString(value) {
	const split = value.split('1').filter(elem => elem !== '-').sort();
	return split[split.length - 1].length;
}

/**
 * Publish route for mqtt connector.
 *
 * @param  {Object}   msg     request message
 * @param  {Object}   session current session object
 * @param  {Function} next    next step callback
 * @return {Void}
 */
Handler.prototype.publish = function (msg, session, next) {
	var result = {
		topic: 'publish',
		payload: JSON.stringify({ code: 200, msg: 'publish message is ok.' })
	};
	next(null, result);
};

/**
 * Subscribe route for mqtt connector.
 *
 * @param  {Object}   msg     request message
 * @param  {Object}   session current session object
 * @param  {Function} next    next step callback
 * @return {Void}
 */
Handler.prototype.subscribe = function (msg, session, next) {
	var result = {
		topic: 'subscribe',
		payload: JSON.stringify({ code: 200, msg: 'subscribe message is ok.' })
	};
	next(null, result);
};
