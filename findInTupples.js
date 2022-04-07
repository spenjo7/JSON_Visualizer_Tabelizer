// Currently not used, was going to use this to do JSON tree searching
const findInTupples = ( tupplesArray , attribute ) => {
	let out = tupplesArray.find( el => el[0] == attribute )
	return out? out[1] : "(null?)"
}

