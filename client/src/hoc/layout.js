import React, { Component } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';

export default class Layout extends Component {
    render() {
        return (
            <React.Fragment>
                <div id="content">
                    <Header />

                    <main role="main" id="main">                        
                        { this.props.children }
                    </main>
                </div>

                <Footer />
            </React.Fragment>
        )
    }
}
