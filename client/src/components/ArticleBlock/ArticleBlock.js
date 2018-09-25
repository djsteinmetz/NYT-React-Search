import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Container from '../../Container';
import Row from '../../Row';
import Column from '../../Column'
import './ArticleBlock.css';
import API from '../../utils/API';
import Article from '../Article'
import SavedArticle from '../SavedArticles'

export default class ArticleBlock extends Component {
    state = {
        search: "",
        records: 1,
        startYear: "",
        endYear: "",
        articles: [],
        savedArticles: []
    }
    componentWillMount() {
        this.loadArticles()
    }
    loadArticles = () => {
        API.getArticles()
            .then(res => {
                console.log(res)
                this.setState({ savedArticles: res.data })
            })
            .catch(err => console.log(err))
    }
    handleChange = event => {
        let { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }
    searchArticles = event => {
        event.preventDefault();
        let query = this.state.search;
        API.search(query)
            .then(results => {
                console.log(results.data.response.docs);
                this.setState({
                    articles: results.data.response.docs
                })
            })
            .catch(err => { console.log(err) })
    }
    saveArticle = event => {
        event.preventDefault();
        console.log(this)
        const data = {
            url: this.props.url,
            headline: this.props.headline,
            snippet: this.props.snippet,
            author: this.props.byline
        }
        console.log(`dataaaaaaaaa: ${JSON.stringify(data)}`)
        API.save(data)
        this.loadArticles()
    }
    deleteArticle = event => {
        event.preventDefault();
        const data = {
            id: event.target.id,
            url: this.props.url,
            headline: this.props.headline,
            snippet: this.props.snippet,
            author: this.props.byline
        }
        API.delete(data)
        .then(results => {
            console.log(results.data.response.docs);
            this.setState({
                articles: results.data.response.docs
            })
        })
        .catch(err => { console.log(err) })
    }
    render() {
        return (
            <Container>
                <Row>
                    <Column size="lg-8">
                        {this.state.articles.map((article, i) => {
                            return (
                                <Article
                                    id={i}
                                    save={this.saveArticle}
                                    key={i}
                                    url={article.web_url}
                                    headline={article.headline.main}
                                    snippet={article.snippet}
                                    byline={(article.byline ? article.byline.original : 'No author documented')}
                                />
                            )
                        })}
                        <form>
                            <div className="form-group">
                                <label>Search Term</label>
                                <input type="text"
                                    name="search"
                                    placeholder="Article Topic"
                                    className="form-control"
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlSelect1">Nuber of Records to Retrieve:</label>
                                <select onChange={this.handleChange} name="records" className="form-control" id="exampleFormControlSelect1">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlInput1">Start Year (optional):</label>
                                <input onChange={this.handleChange} name="startYear" className="form-control" id="exampleFormControlInput1" placeholder="1905" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlInput1">End Year (optional):</label>
                                <input onChange={this.handleChange} name="endYear" className="form-control" id="exampleFormControlInput1" placeholder="2018" />
                            </div>
                            <br />
                            <br />
                            <Button className="btn btn-dark" onClick={this.searchArticles}>Search Articles</Button>
                        </form>
                    </Column>
                    <Column size="lg-4">
                        {this.state.savedArticles.map(savedArticle => {
                            return (
                                <SavedArticle 
                                  key={savedArticle._id}
                                  href={savedArticle.url}
                                  headline={savedArticle.headline}
                                  snippet={savedArticle.snippet}
                                  byline={savedArticle.byline}
                                  id={savedArticle._id}
                                  deleteArticle={this.deleteArticle}
                                />
                            )
                        })}
                    </Column>
                </Row>
            </Container>

        )
    }
}