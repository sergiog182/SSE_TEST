import React from 'react';
import BasketProduct from './BasketProduct';

class FrameBucket extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: null
        }
        this.hanldeReloadView = this.hanldeReloadView.bind(this);
    }

    hanldeReloadView(){
        this.setState({products: null});
        this.getBasketData();
    }

    getBasketData() {
        let resultado = null;
        document.getElementById("loader").classList.add("active");
        fetch(
            "https://www.adidas.com/api/checkout/baskets/" + sessionStorage.basketId, 
            {
                method: 'get', 
                headers: {
                    'Content-Type':'application/json',
                    'authorization': sessionStorage.authorizationToken
                },
                mode: 'cors'
            }
        )
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            let items = [];
            const products = data.shipmentList[0].productLineItemList.slice();
            console.log(products);
            if (data.totalProductCount > 0) {
                let contador = 0;
                while (products[contador] !== null && typeof products[contador] !== 'undefined') {
                    items.push(<BasketProduct key={products[contador].productId} reloadView={this.hanldeReloadView} productId={products[contador].productId} productQuantity={products[contador].quantity} productName={products[contador].productName} />);
                    contador++;
                }
            } else {
                items.push(<div key={0} className="basket-article" ><h5>There is no articles in the basket</h5></div>);
            }
            const total = data.pricing.total + " " + data.currency;
            resultado = (<div className="align-center">
                        <h1>Selected Products</h1>
                        <br/>
                        <hr/>
                        <div className="basket-products-container">
                            {items}
                        </div>
                        <br/>
                        <hr/>
                        <div>
                            <h5>Total: {total}</h5>
                        </div>
                    </div>);
            document.getElementById("loader").classList.remove("active");
            this.setState({products: resultado});
        })
        .catch((error) => { 
            document.getElementById("loader").classList.remove("active"); 
            alert("UPS! something went wrong"); 
            console.log(error);
            resultado = <div className="align-center"><h1>something went wrong :( </h1></div>;
            this.setState({products: resultado});
        });
    }

    componentDidMount() {
        this.getBasketData();
    }

    render() {
        if (typeof sessionStorage.basketId === 'undefined' || sessionStorage.basketId === null) {
            return(
                <div className="frame basket-container">
                    <h1>There is no articles in the basket</h1>
                </div>
            ); 
        } else {
            return(
                <div className="frame basket-container">
                    {this.state.products}
                </div>
            );
        }
    }
}

export default FrameBucket;