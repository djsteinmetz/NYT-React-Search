import React, { Component } from 'react';
import Jumbotron from './components/Jumbotron';
import Container from './Container';
import Row from './Row';
import Column from './Column'
import API from './utils/API';
import Article from './components/Article';
import { Input, FormBtn } from "./components/Form";
import DeleteBtn from './components/DeleteBtn';
import SavedArticle from './components/SavedArticles';

export default class App extends Component {
  state = {
    message: "Search for Articles!",
    search: "",
    startYear: "",
    endYear: "",
    articles: [],
    note: "",
    savedArticles: []
  }
  componentWillMount() {
    this.loadArticles()
  }
  loadArticles = () => {
    API.getArticles()
      .then(res => {
        this.setState({ savedArticles: res.data })
      })
      .catch(err => console.log(err))
  }
  handleChange = event => {
    let { name, value } = event.target;
    this.setState({
      [name]: value,
      message: ""
    })
  }
  // Once you have 1 failed search, they all fail?
  searchArticles = event => {
    event.preventDefault();
    let query = {
      "query": this.state.search,
      "start": this.state.startYear,
      "end": this.state.endYear
    }
    API.search(query)
      .then(results => {
        results.data.response.docs.length ? (this.setState({ articles: results.data.response.docs })) : (this.setState({ articles: [], message: "No results to display, try another search" }))
      })
      .catch(err => { console.log(err) })
    this.loadArticles()
  }
  saveArticle = event => {
    event.preventDefault();
    let { id } = event.target;
    this.state.saved.push(id)
    let selectedArticle = this.state.articles.filter(article => id === article._id)
    // Remove the selected Article from the current Articles state (to remove it from the list)
    for( var i = 0; i < this.state.articles.length-1; i++){ 
      if ( this.state.articles[i]._id === id) {
        this.state.articles.splice(i, 1); 
      }
   }
    const data = {
      url: selectedArticle[0].web_url,
      headline: selectedArticle[0].headline.main,
      snippet: selectedArticle[0].snippet,
      author: (selectedArticle[0].byline ? selectedArticle[0].byline.original : 'No author documented'),
      note: this.state.note
    }
    console.log(data)
    API.save(data).then(() => { this.loadArticles() })
  }
  deleteArticle = event => {
    event.preventDefault();
    let { id } = event.target
    API.delete(id).then(() => { this.loadArticles() })
  }
  render() {
    return (
      <div>
        <Jumbotron>New York Times Search</Jumbotron>
        <Container>
          <Row>
            <Column size="lg-8">
              <form>
                <h3>{this.state.message}</h3>
                <label>Search Term</label>
                <Input type="text" name="search" placeholder="Article Topic" onChange={this.handleChange} value={this.state.search} />
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">Start Year (optional):</label>
                  <Input onChange={this.handleChange} name="startYear" placeholder="1905" value={this.state.startYear} />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">End Year (optional):</label>
                  <Input onChange={this.handleChange} name="endYear" placeholder="2018" value={this.state.endYear} />
                </div>
                <FormBtn onClick={this.searchArticles}>Search Articles</FormBtn>
              </form>
                <h3 style={{ marginBottom: 25 }}>{this.state.emptySearch}</h3>
                <div style={{paddingTop: 50}}>
                  {this.state.articles.map((article, i) => {
                    return (
                      <div>
                        <Article
                          id={i}
                          key={article._id}
                          url={article.web_url}
                          headline={article.headline.main}
                          snippet={article.snippet}
                          byline={(article.byline ? article.byline.original : 'No author documented')}
                          save={<FormBtn id={article._id} onClick={this.saveArticle}>Save Article</FormBtn>}
                          textArea={<textarea onChange={this.handleChange} name="note" className="form-control" rows="3"></textarea>}
                        />
                      </div>
                    )
                  })}
                </div>
            </Column>
            <Column size="lg-4">
              <h3 className="heading">Saved Articles</h3>
              {this.state.savedArticles.length ? (
                <div>
                  {this.state.savedArticles.map((savedArticle, i) => {
                    return (
                      <SavedArticle
                        key={i}
                        href={savedArticle.url}
                        headline={savedArticle.headline}
                        snippet={savedArticle.snippet}
                        byline={savedArticle.author}
                        btn={<DeleteBtn id={savedArticle._id} onClick={this.deleteArticle} />}
                        id={savedArticle._id}
                        note={savedArticle.note}
                        date={savedArticle.date}
                      />
                    )
                  })}
                </div>
              ) : (
                  <h3 className="text-center">No Saved Articles</h3>
                )}
            </Column>
          </Row>
        </Container>
      </div>
    )
  }
}
