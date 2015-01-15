// {	response object format standard
// 	status:'success|fail|authorization',
// 	*data : result object,
//	*message: any message useful,
//	*token: token object,
//	*tokenExpDate:date expire date,
//	*refToken: token object
// }
// * keys are optional

exports.success = function(data,message,token,tokenExpDate,refToken){
	return {
		status:'success',
		data:data,
		message:message,
		token: token,
		tokenExpDate:tokenExpDate,
		refToken: refToken
	}
}
exports.error = function(data,message){
	return {
		status:'fail',
		data:data,
		message:message,
	}
}