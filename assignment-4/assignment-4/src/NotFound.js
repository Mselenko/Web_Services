import React, { Component } from 'react';
import MainContainer from './MainContainer.js'

class NotFound extends Component {
    render() {
        return (
            <MainContainer>
                <h1 className="page-header">Not Found</h1>
                <span>Page Not Found</span>
            </MainContainer>
        );
    }
}

export default NotFound;