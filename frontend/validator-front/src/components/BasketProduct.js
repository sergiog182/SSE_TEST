import React from 'react';

class BasketProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productId: this.props.productId
        };
    }

    removeProduct = () => {
        document.getElementById("loader").classList.add("active");
        fetch(
            "https://www.adidas.com/api/checkout/baskets/" + sessionStorage.basketId + "/items/" + this.state.productId, 
            {
                method: 'delete', 
                headers: {
                    'Content-Type':'application/json',
                    'authorization': sessionStorage.authorizationToken
                },
                mode: 'cors',
                credentials: 'include'
            }
        )
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            document.getElementById("loader").classList.remove("active");
            alert("Article has been removed successfully");
            const id = "reloadTrigger" + this.state.productId;
            document.getElementById(id).onchange();
        })
        .catch((error) => { 
            document.getElementById("loader").classList.remove("active"); 
            alert("UPS! something went wrong"); 
            console.log(error);
        });
    };

    render() {
        const imgname = this.props.productId.split("_")[0];
        const srcimg = require(`../assets/images/${imgname}.jpg`);
        const hiddenId = "reloadTrigger" + this.state.productId;
        return(
            <div className="basket-article">
                <h5>{this.props.productName}</h5>
                <h5>Quantity: {this.props.productQuantity}</h5>
                <img className="image-basket" src={srcimg} alt={this.props.productName} />
                <br />
                <button className="btn-remove" onClick={this.removeProduct}>Remove Product</button> 
                <br />
                <input id={hiddenId} type="hidden" value="" onChange={this.props.reloadView}/>
            </div>
        );
    }
}

export default BasketProduct;