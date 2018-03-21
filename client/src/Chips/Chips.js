import React from 'react';

const inputWidth = {
    width: "150px"
};

const Chips = (props) => {
    return (
        <div className="chipDiv">
            {
                props.chips.map(function(chipName, index) {
                    return (
                        <div className="chip" key={index} data-color={props.color[index]} style={{backgroundColor: props.color[index]}} data-query={chipName} onClick={(e) => {props.addPlaces(e)}}>
                            {chipName}
                            <i className="close material-icons" onClick={() => {props.deleteChip(index)}}>x</i>
                        </div>);
                })
            }
            <input id="createChip" type="text" style={inputWidth}/>
            <div className="chip" onClick={props.addChip}>+</div>
        </div>
    );
};

export default Chips;