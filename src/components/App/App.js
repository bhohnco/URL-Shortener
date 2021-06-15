import React, { Component } from 'react';
import './App.css';
import { getUrls, addURLToApi } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: []
    }
  }

  getDataFromAPI = () => {
    getUrls()
        .then((urls) => {
          this.setState({urls: urls.urls})
        })
        .catch(error => {
          console.log("Data request has failed please check your code", error)
          this.setState({error: "We ran into some problems grabbing the data, please try again!"})
        })

  }

  componentDidMount() {
    this.getDataFromAPI()
  }

  addNewUrl = ({longUrl, title}) => {
    addURLToApi(longUrl, title)
        .then((url) => this.setState({urls: [...this.state.urls, url]}))
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>URL Shortener</h1>
          <UrlForm
          addNewUrl={this.addNewUrl}
            />
        </header>
        <UrlContainer urls={this.state.urls}/>
      </main>
    );
  }
}

export default App;
