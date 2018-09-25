import React, { Component } from 'react';
import Container from '../../Container';
import './Jumbotron.css'

export default class Jumbotron extends Component {
    render() {
        return (
            <div className="jumbotron jumbotron-fluid text-center">
                <Container>
                    <h1 className="display-4">{this.props.children}</h1>
                </Container>
            </div>
        )
    }
}