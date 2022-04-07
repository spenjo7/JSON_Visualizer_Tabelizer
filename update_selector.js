const updateSelectOptions = (target, keyArray = null, valueArray = null ) => {
	while(target.options.length > 0){ // remove existing
		target.options.remove(0)
	}

	if(!keyArray){
		target.options.add(new Option("(none)"))
	}

	keyArray.forEach( (el,ind) => {
		val = (valueArray && valueArray[ind] != null )? valueArray[ind]: null
		target.add(new Option(el, val))
	})
}