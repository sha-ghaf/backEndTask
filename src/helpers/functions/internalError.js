const { internalServerErrorResponse } = require('./ResponseHandler.js')

const internalError = (err, req, res, next) => {
	if (err) {
		console.log(err);
		return internalServerErrorResponse(
			res,
			'Internal Server Error: Please consult the backend team',
		);
	}
	next();
}

module.exports = internalError