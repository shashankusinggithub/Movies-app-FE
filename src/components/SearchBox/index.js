import React from 'react';
import "./index.css"

const SearchBox = (props) => {
	return (
		<div className='col col-sm-4'>
			<input
				className='search'
				value={props.value}
				onChange={(event) => props.setSearchValue(event.target.value)}
				placeholder='Type to search...'
			></input>
		</div>
	);
};

export default SearchBox;
