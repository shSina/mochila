// {	response object format standard
// 	status:'success|fail|authorization',
// 	*data : result object,
//	*date : result date,
//	*message: any message useful,
//	*token: token object,
//	*tokenExpDate:date expire date,
//	*refToken: token object
// }
// * keys are optional

exports.success = function(){
	return {
		status:'success'
	}
}
exports.error = function(){
	return {
		status:'fail'
	}
}