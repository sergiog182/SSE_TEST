import React from 'react';

class Article extends React.Component {
    render(){
        const srcimg = require(`../assets/images/${this.props.id}.jpg`);
        return(
            <div className="article" productname={this.props.name} productid={this.props.id} onClick={this.props.click}>
                <h5 productname={this.props.name} productid={this.props.id}>{this.props.name}</h5>
                <img productname={this.props.name} productid={this.props.id} className="small-size-image" src={srcimg} alt={this.props.name} />
            </div>
        );
    }
}

export default Article;