import React from 'react';

class QuantitySelector extends React.Component {
    createSelectItems() {
        let items = [];
        for (let i = 1; i <= this.props.maxQuantity; i++) {             
            items.push(<option key={i} value={i}>{i}</option>);
        }
        return items;
    }
    
    render(){
        return(
            <select id="cuantitySelector" className="selector"> 
                {this.createSelectItems()}
            </select>
        )
    }
}

export default QuantitySelector;