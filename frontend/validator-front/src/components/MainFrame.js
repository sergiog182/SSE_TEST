import React from 'react';
import FrameValidate from './FrameValidate';
import FrameBucket from './FrameBucket';
import Menu from './Menu'

class MainFrame extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            view: props.view,
        };
        this.handleChangeMenu = this.handleChangeMenu.bind(this);
    }
    
    handleChangeMenu(e){
        const view = e.target.getAttribute("destinationview");
        this.setState({view: view});
    }

    render() {
        const view = this.state.view;
        const srcloading = require('../assets/images/loading.gif').default;
        console.log("Imagen :: " + srcloading);
        
        if (view === 'validateDomain') {
            return(
                <div className='main-container'>
                    <div id="loader" className="loading-container">
                        <img src={srcloading} alt="loading" />
                    </div>
                    <Menu selected='validateDomain' click={this.handleChangeMenu}/>
                    <FrameValidate />
                </div>
            );
        } else if (view === 'searchDomain') {
            return(
                <div className='main-container'>
                    <div id="loader" className="loading-container">
                        <img src={srcloading} alt="loading" />
                    </div>
                    <Menu selected='searchDomain'click={this.handleChangeMenu}/>
                    <FrameBucket />
                </div>
            );
        } else {
            return(
                <div className='main-container'>
                    <div id="loader" className="loading-container">
                        <img src={srcloading} alt="loading" />
                    </div>
                    <Menu selected='searchDomain'click={this.handleChangeMenu}/>
                    <FrameBucket />
                </div>
            );
        }
        
    }
}

export default MainFrame;