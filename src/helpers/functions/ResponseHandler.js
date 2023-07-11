class ResponseHandler {
	constructor(status, message, data) {
		this.status = status;
		this.message = message || '';
		this.data = data || {};
	}
	sendResponse(res) {
		return res.status(this.status).json({
			message: this.message,
			data: this.data,
		});
	}
}
const okResponse = (res, message, data = {}) => {
	const response = new ResponseHandler(200, message, data);
	return response.sendResponse(res);
}
const createdResponse = (res, message, data = {}) => {
	const response = new ResponseHandler(201, message, data);
	return response.sendResponse(res);
}
const badRequestResponse = (res, message) => {
	const response = new ResponseHandler(400, message);
	return response.sendResponse(res);
}
const unAuthorizedResponse = (res, message) => {
	const response = new ResponseHandler(401, message);
	return response.sendResponse(res);
}
const notFoundResponse = (res, message) => {
	const response = new ResponseHandler(404, message);
	return response.sendResponse(res);
}
const internalServerErrorResponse = (res, message) => {
	const response = new ResponseHandler(500, message);
	return response.sendResponse(res);
}
const conflictResponse = (res, message) => {
	const response = new ResponseHandler(409, message);
	return response.sendResponse(res);
}

module.exports = {conflictResponse, 
    internalServerErrorResponse,
    notFoundResponse,
    unAuthorizedResponse,
    badRequestResponse,
    createdResponse,
    okResponse,
}