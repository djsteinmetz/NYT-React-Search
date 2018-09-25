import React from 'react';
import './Article.css';

const Article = props => {
    return (
        <div className="card">
            <div className="card-body">
                <div className="card-title">
                    <a className="articleTitle" href={props.url} target="_blank">{props.headline}</a>
                </div>
                <div className="card-text">
                    <p>{props.snippet}</p>
                </div>
            </div>
            <div className="card-footer">
                <p className="byline">{props.byline}</p>{props.save}
            </div>           
        </div>
    )
}

export default Article;