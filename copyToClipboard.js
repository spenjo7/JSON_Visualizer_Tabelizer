const copyToClipboard = ( text ) => {
	if(!navigator.clipboard){
		const input=document.createElement('textarea')
		input.innerText=text
		document.body.appendChild(input)
		input.select()
		const result=document.execCommand('copy')
		document.body.removeChild(input)
		return result 
	} else {
		navigator.clipboard.writeText(text) 
	}
}