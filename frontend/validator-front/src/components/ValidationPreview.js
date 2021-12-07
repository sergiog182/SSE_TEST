import React from 'react';
import SizeSelector from './SizeSelector';
import QuantitySelector from './QuantitySelector';

class ArticlePreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productSKU: "",
        }
        this.handleProductChange = this.handleProductChange.bind(this);
    }

    shouldComponentUpdate(pops, states) {
        return (this.state.productSKU !== states.productSKU ? false : true);
    }

    handleProductChange(e){
        const sku = e.target.value;
        this.setState({productSKU: sku});
    }

    validateDomain = () => {
        document.getElementById("loader").classList.add("active");
        const domain = document.getElementById("domain").value;
        
        if (domain !== "") {
            fetch(
                "http://localhost:8080/domains/similar/" + domain, 
                {
                    method: 'get', 
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type':'application/json'
                    }
                }
            )
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                console.log("Datos JSON finales: ");
                console.log(data);

                document.getElementById("loader").classList.remove("active");
            })
            .catch((error) => { 
                document.getElementById("loader").classList.remove("active"); 
                alert("UPS! something went wrong"); 
                console.log(error);
            });
        } else {
            alert("You must provide a Domain");
            document.getElementById("loader").classList.remove("active");
        }
    }

    render(){
        return (
                <div className="article-preview">
                    <div className="image-container">
                        <img className="small-size-image" src={require('../assets/images/validate.png').default} alt="Validate domain" />
                        <div className="main-form">
                            <div className="input-container">
                                Domain: <input type="text" id="domain" name="domain" />
                            </div>
                            <br />
                            <br />
                            <button className="btn-form" onClick={this.validateDomain}> - Validate Domain - </button> 
                        </div>
                    </div>
                    <div className="add-form">
                        <h1>{this.props.articleName}</h1>
                        <div className="main-form">
                            <div className="input-container">
                                Choose Size: <SizeSelector sizes={this.props.articleSizes} change={this.handleProductChange}/>
                            </div>
                            <br />
                            <div className="input-container">
                                Choose quantity: <QuantitySelector maxQuantity={15} />
                            </div>
                            <br />
                            <br />
                            <button className="btn-form" onClick={this.addToBag}> - ADD TO BAG - </button> 
                        </div>
                    </div>
                </div>
            );
    }
}

export default ArticlePreview;