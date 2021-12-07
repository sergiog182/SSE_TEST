import React from 'react';  

class SizeSelector extends React.Component {
    createSelectItems() {
        const sizes = this.props.sizes;
        let items = [];
        items.push(<option key={-1} id={0} value={0}> - Select an option - </option>);
        if (Object.keys(sizes).lenght !== 0){
            for(var productkey in sizes) {
                items.push(<option key={productkey} id={productkey} value={productkey}>{sizes[productkey]}</option>);
            }
        }
        return items;
    }

    render() {
        return(
            <select onChange={this.props.change} className="selector"> 
                {this.createSelectItems()}
            </select>
        )
    }
}

export default SizeSelector;