const flattenJSON = (obj = {}, res = {}, extraKey = '') => {
	Object.keys(obj).forEach( key => {
		if(typeof obj[key] !== 'object'){
			res[extraKey + key] = obj[key]
		} else {
			flattenJSON(obj[key], res, `${extraKey}${key}.`)
		}
	})
	return res
}

const tableizeJSON = (input, callback = null) => {
	let output = null
	let _isValid = false

	try {
		let raw_json = JSON.parse(input)

		let arr = Array.isArray(raw_json)? raw_json 
			: ( raw_json.results && Array.isArray(raw_json.results))? raw_json.results
			: Object.values(raw_json).find( el => Array.isArray(el))?? raw_json 

		if(  arr &&  arr.length > 0 ){
			_isValid = true

			let headers = Object.keys( flattenJSON( arr[0] )) 
			let row_data = Object.values( arr) // find first array Attribute
				.map( el => {
					return headers.map( header => flattenJSON(el)[header]?? "" ).join('|')
				})
				

			output= [ headers.join('|').toUpperCase(), ...row_data ].join('\n') 

		} else { // only one item, lay it out horizontally
			_isValid = true 

			let singleKeys = []
			let singleVals = Object.entries( flattenJSON(raw_json) ).map( pair => {
				singleKeys.push(pair[0])
				return ( pair[1] || pair[1] ===0)? pair[1] : 'NULL' 	// want text val of NULL
			})
			let singleHeaders = singleKeys.join('|').toUpperCase()
			output= [  singleHeaders, singleVals.join('|') ].join('\n')
		}

	} catch(err){
		output = `Could not convert JSON due to:\n ${err}`
		console.warn(output)
	}

	// return or callback
	if(callback){
		callback(output, _isValid)
	} else {
		return output
	}
}


const tableToHTML = (plaintextTable) =>{
	let rows = plaintextTable.split('\n')
	let table = document.createElement('table')
	let thead = document.createElement('thead')
	let tbody = document.createElement('tbody')


	rows.map( (el,ind) =>{
		let row = document.createElement('tr')
		let tag = (ind === 0)? 'th' : 'td'

		let parts = el.split(/\|/g ) 
		parts.forEach( sub => {
			let cell = document.createElement(tag)
			cell.innerText = sub
			row.appendChild(cell) 
		})

		if(ind === 0 ){
			thead.appendChild(row)
		} else{
			tbody.appendChild(row)
		}
	})

	table.appendChild(thead)
	table.appendChild(tbody)

	return table

}