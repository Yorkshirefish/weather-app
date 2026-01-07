import React, { useState } from "react";

function SearchBar({handleLocationChange, newLocation, handleSearchSubmit}) {

    return (
        <form onSubmit={handleSearchSubmit}>
            <input required type="text" placeholder="Search for location..." value={newLocation} onChange={handleLocationChange}/>
            <button type="submit">Search</button>
        </form>
    )
}

export default SearchBar;