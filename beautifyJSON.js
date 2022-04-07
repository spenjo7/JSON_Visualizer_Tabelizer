// Now can Optionally Support Callbacks //
const beautifyJSON = (text, callback = null ) => {
	let output = null 
	let _isValidJSON = false
	let rawObject = null
	
	try{
		rawObject = JSON.parse(text)
		output = JSON.stringify( rawObject, null, 4 )
		_isValidJSON = true
	} catch(error){
		console.warn(
			`{Could not reformat the text input, encountered the following error:\n ${error}`
		)
		output = text
	}

	if(callback){
		callback(output, _isValidJSON, rawObject)
	} else {
		return output
	}

}