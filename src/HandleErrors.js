import React from 'react'

export const HandleErrors = (err) => {
	alert("Apologies an error occurred in conversion");
	console.log(err.message);
}

export default HandleErrors