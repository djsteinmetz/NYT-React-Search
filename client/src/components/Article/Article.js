import React from 'react';
import './Article.css';

const Article = props => {
    return (
        <div className="card">
            <div className="card-header">
                <a className="articleTitle" href={props.url} target="_blank">{props.headline}</a>
            </div>
            <div className="card-body">
                <div className="card-text">
                    <p>{props.snippet}</p>
                </div>
                <div className="form-group">
                    <label>Add a note</label>
                    {props.textArea}
                </div>
            </div>
            <div className="card-footer text-muted">
                <p className="byline">{props.byline}</p>{props.saved}{props.save}
            </div>
        </div>
    )
}

export default Article;