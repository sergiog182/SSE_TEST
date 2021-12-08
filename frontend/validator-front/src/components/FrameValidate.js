import React from 'react';

class FrameValidate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            domain: "",
            similarDomains: "",
            similarDomainsPuny: "",
            serviceResponse: ""
        }
    }

    validateDomain = () => {
        document.getElementById("loader").classList.add("active");
        const domain = document.getElementById("domain").value;
        
        if (domain !== "") {
            fetch(
                "http://localhost:8080/domains/similar/" + domain, 
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
                return res.json()
            })
            .then((data) => {
                console.log(data);

                this.setState({
                    domain: data.dominio,
                    similarDomains: data.dominios_similares.map((domain) => <li>{domain}</li>),
                    similarDomainsPuny: data.dominios_sim_punycode.map((domainPuny) => <li>{domainPuny}</li>),
                    serviceResponse: JSON.stringify(data, undefined, 2)
                });

                document.getElementById("loader").classList.remove("active");
            })
            .catch((error) => { 
                document.getElementById("loader").classList.remove("active"); 
                this.setState({
                    domain: "",
                    similarDomains: "",
                    similarDomainsPuny: "",
                    serviceResponse: ""
                });
                alert("UPS! something went wrong"); 
                console.log(error);
            });
        } else {
            alert("You must provide a Domain");
            this.setState({
                domain: "",
                similarDomains: "",
                similarDomainsPuny: "",
                serviceResponse: ""
            });
            document.getElementById("loader").classList.remove("active");
        }
    }

    toggleServiceResponse = () => {
        document.getElementById("serviceResponse").classList.toggle("hidden");
    }

    render(){
        return (
            <div className="frame">
                <div className="form-preview">
                    <div className="image-container">
                        <img className="small-size-image" src={require('../assets/images/validate.png').default} alt="Validate domain" />
                        <div className="main-form">
                            <div>
                                Domain: <input type="text" id="domain" name="domain" />
                            </div>
                            <br />
                            <br />
                            <button className="btn-form" onClick={this.validateDomain}> Validate Domain </button> 
                        </div>
                    </div>
                    <div className="validate-result">
                        <h1>Found domians</h1>
                        
                        <div className="main-form">
                            <div className="input-container">
                                <label>
                                    <b>Domain</b>
                                </label>
                                <div id="domainContent" name="domainContent">{this.state.domain}</div>
                            </div>
                            <div className="input-container">
                                <label>
                                    <b>Similar Domains</b>
                                </label>
                                <div id="similarDomainsContent" name="similarDomainsContent">
                                    <ul>
                                        {this.state.similarDomains}
                                    </ul>
                                </div>
                            </div>
                            <div className="input-container">
                                <label>
                                    <b>Similar Domains Punycode</b>
                                </label>
                                <div id="similarDomainsPunyContent" name="similarDomainsPunyContent">
                                    <ul>
                                        {this.state.similarDomainsPuny}
                                    </ul>
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

export default FrameValidate;