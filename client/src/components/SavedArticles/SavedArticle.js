import React, { Component } from 'react';
import './SavedArticle.css';

export default class SavedArticle extends Component {

    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <div className="card-title">
                        <a className="articleTitle" href={this.props.url} target="_blank">{this.props.headline}</a>
                    </div>
                    <div className="card-text">
                        <p>{this.props.snippet}</p>
                    </div>
                </div>
                <div className="card-footer">
                    <p className="byline">{this.props.byline}</p>{this.props.btn}
                </div>
            </div>
        )
    }
}