import React from 'react';
import Login from '../Login/Login';

const navbar = (props) => {
    return (
            <div>
                <nav>
                    <div className="nav-wrapper">
                        <a href="#" className="brand-logo">&#9665;Relo</a>
                    <div id="navDiv" className="right hide-on-med-and-down">
                        <button className="navbtn"><a>Save Search</a> </button>
                        <button className="navbtn"><a href="sass.html">Your Searches</a></button>
                        <Login cssClasses={'navbtn'} />
                    </div>
                    </div>
                </nav>
            </div>
            )
};

export default navbar;