import React from 'react';

function MenuItem(props) {
    const style = "menu-item" + (props.selected ? " selected" : "");
    const destination = props.destination;
    if (props.selected) {
        return(
            <div className={style} destinationview={destination}>
                <a href={props.url}>{props.text}</a>
            </div>
        );    
    } else {
        return(
            <div className={style} destinationview={destination} onClick={props.click}>
                {props.text}
            </div>
        );
    }
}

export default MenuItem;

