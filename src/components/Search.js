import React from 'react'

function Search ({ handleInput, search ,handleInput2, search2 }) {
	return (
		<section className="searchbox-wrap">
			<input 
				type="text" 
				placeholder="Topic..." 
				className="searchbox" 
				onChange={handleInput}
				onKeyPress={search}
			/>
			<input 
				type="text" 
				placeholder="Language..." 
				className="searchbox" 
				onChange={handleInput2}
				onKeyPress={search}
			/>
			
		</section>
	)
}

export default Search;