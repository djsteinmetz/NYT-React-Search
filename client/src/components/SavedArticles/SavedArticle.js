import React from 'react';
import './SavedArticle.css';

const SavedArticle = props => {
    return (
        <div className="card">
            <div className="card-header">
                <a className="articleTitle" href={props.href} target="_blank">{props.headline}</a>
            </div>
            <div className="card-body">
                <div className="card-text">
                    <p>{props.snippet}</p>
                </div>
            </div>
            <div className="card-footer text-muted">
                <p className="byline">{props.byline}</p>{props.btn}
            </div>
        </div>
    )
}
export default SavedArticle