import React from 'react';
import ValidationPreview from './ValidationPreview';

class FrameValidate extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            articleId: "",
            articleName: "",
            articleSizes: []
        };
        this.handleArticleChange = this.handleArticleChange.bind(this);
    }

    getAvailability(jsonData) {
        let items = [];
        jsonData.variation_list.forEach((element) => {
            if (element.availability > 0) {
                items[element.sku] = element.size;
            }
        });
        return items;
    }
    
    handleArticleChange(e){
        document.getElementById("loader").classList.add("active");
        const name = e.target.getAttribute("productname");
        const id = e.target.getAttribute("productid");
        fetch(
            "https://www.adidas.com/api/products/" + id + "/availability", 
            {
                method: 'get', 
                headers: {
                    'Content-Type':'application/json'
                },
                mode: 'cors'
            }
        )
        .then(res => res.json())
        .then((data) => {
          const arraySizes = this.getAvailability(data);
          this.setState({articleId: id, articleName: name, articleSizes: arraySizes});
          document.getElementById("loader").classList.remove("active");
        })
        .catch((error) => { document.getElementById("loader").classList.remove("active"); alert("UPS! something went wrong"); console.log(error);});
    }

    render() {
        return(
            <div className="frame">
                <ValidationPreview articleId={this.state.articleId} articleName={this.state.articleName} articleSizes={this.state.articleSizes}/>
            </div>
        );
    }
}

export default FrameValidate;