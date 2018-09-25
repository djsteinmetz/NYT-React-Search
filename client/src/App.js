import React, { Component } from 'react';
import Jumbotron from './components/Jumbotron';
import ArticleBlock from './components/ArticleBlock';

export default class App extends Component {
  render() {
    return (
      <div>
        <Jumbotron>New York Times Search</Jumbotron>
        <ArticleBlock />
      </div>
    )
  }
}
