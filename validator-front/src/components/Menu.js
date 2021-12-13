import React from 'react';
import MenuItem from './MenuItem';

class Menu extends React.Component {
    render(){
        return(
            <div className="main-menu">
                <MenuItem destination="validateDomain" text="Validate Domain" selected={this.props.selected === 'validateDomain' ? true : false} click={this.props.click} />
                <MenuItem destination="searchDomain" text="Search Domain" selected={this.props.selected === 'searchDomain' ? true : false} click={this.props.click}/>
                <MenuItem destination="uploadDomains" text="Upload Domains" selected={this.props.selected === 'uploadDomains' ? true : false} click={this.props.click} />
            </div>
        );
    }
}

export default Menu;