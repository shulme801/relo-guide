import React from 'react';

const inputWidth = {
    width: "500px"
};

const Search = ( props ) => {
    return (
        <div className="searchDiv">
            <div className="searchHover">
                <img className="bg-img" src="bg1.jpg"/>
                <p className="searchTitle">Begin your search here</p>
                <div className="form">
                    <p id="searchInstruct">Enter "City, State" for regional information</p>
                    <input id="search" type="text" style={inputWidth} onChange={props.autocomplete}/>
                    <button id="searchButton" onClick={props.zillowSearch}>Search</button>
                </div>
            </div>        
        </div>
    );
};

export default Search;