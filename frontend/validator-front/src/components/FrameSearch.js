import React from 'react';

class FrameSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            domain: "",
            isPuny: false,
            serviceResponse: ""
        }
    }

    searchDomain = () => {
        document.getElementById("loader").classList.add("active");
        const domain = document.getElementById("domain").value;
        
        if (domain !== "") {
            fetch(
                "http://localhost:8080/domains/search/" + domain, 
                {
                    method: 'get', 
                    dataType: 'json',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type':'application/json'
                    }
                }
            )
            .then((res) => {
                if (res.status === 200) {
                    return res.json()
                } else {
                    return null;
                }
                
            })
            .then((data) => {
                console.log(data);

                if (data === null) {
                    this.setState({
                        id: "",
                        domain: "",
                        isPuny: false,
                        serviceResponse: ""
                    });
                    alert("Domain not found!"); 
                } else {
                    this.setState({
                        id: data.id,
                        domain: data.domain,
                        isPuny: data.punycode,
                        serviceResponse: JSON.stringify(data, undefined, 2)
                    });
                }

                document.getElementById("loader").classList.remove("active");
            })
            .catch((error) => { 
                document.getElementById("loader").classList.remove("active"); 
                this.setState({
                    id: "",
                    domain: "",
                    isPuny: false,
                    serviceResponse: ""
                });
                alert("UPS! something went wrong"); 
                console.log(error);
            });
        } else {
            alert("You must provide a Domain");
            this.setState({
                id: "",
                domain: "",
                isPuny: false,
                serviceResponse: ""
            });
            document.getElementById("loader").classList.remove("active");
        }
    }

    toggleServiceResponse = () => {
        document.getElementById("serviceResponse").classList.toggle("hidden");
    }

    render() {
        return(
            <div className="frame">
                <div className="form-preview">
                        <div className="image-container">
                            <img className="small-size-image" src={require('../assets/images/search.png').default} alt="Search domain" />
                            <div className="main-form">
                                <div>
                                    Domain: <input type="text" id="domain" name="domain" />
                                </div>
                                <br />
                                <br />
                                <button className="btn-form" onClick={this.searchDomain}> Search Domain </button> 
                            </div>
                        </div>
                        <div className="validate-result">
                            <h1>Found domians</h1>
                            
                            <div className="main-form">
                                <div className="input-container">
                                    <label>
                                        <b>Id</b>
                                    </label>
                                    <div id="idContect" name="idContect">{this.state.id}</div>
                                </div>
                                <div className="input-container">
                                    <label>
                                        <b>Domain</b>
                                    </label>
                                    <div id="domainContent" name="domainContent">{this.state.domain}</div>
                                </div>
                                <div className="input-container">
                                    <label>
                                        <b>Is Punycode</b>
                                    </label>
                                    <div id="isPuny" name="isPuny">
                                        <input type="checkbox" checked={this.state.isPuny} readOnly="readOnly"/>
                                    </div>
                                </div>
                                <br />
                                <button className="btn-form" onClick={this.toggleServiceResponse}> Show service response </button> 
                                <br />
                                <br />
                                <div className="input-container hidden" id="serviceResponse">
                                    <label>
                                        <b>Service Response</b>
                                    </label>
                                    <div id="serviceResponseContent" name="serviceResponseContent">
                                        <pre>
                                            {this.state.serviceResponse}
                                        </pre>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
            </div>
        );
    }
}

export default FrameSearch;