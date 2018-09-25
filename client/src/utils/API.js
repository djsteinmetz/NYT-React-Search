import axios from "axios";
let BASEURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=be69431c492a4ed5ac4fc06c5f62ac03&q=";

export default {
  search: query => {
    const url = BASEURL+=query
    return axios.get(url);
  },
  getArticles: () => { 
    return (
      axios.get('/api/articles')
    ) 
  },
  save: data => {
    return (
      axios.post(`/api/articles`, {
        url: data.url,
        headline: data.headline,
        snippet: data.snippet,
        author: data.author
      })
      .catch(function (error) {
        console.log(error);
      })
    )
  },
  delete: id => {
    axios.delete(`/api/articles/${id}`)
  }
};
