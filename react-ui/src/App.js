import React, { Component } from 'react';
import {d3draw} from './d3helpers'
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {data: 'loading...'}
  }

  getData() {
    axios.get('http://localhost:8000/api/frequency').then((res) => {
      this.setState({data: res.data})
    })
  }


  componentDidMount() {
    this.getData();
  }

  componentDidUpdate() {
    if (this.state.data !== 'loading...') {
      d3draw(this.state.data)
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">#WebDev Trends</h1>
        </header>

        <main className="card">
          <h4>Which topics get the most mentions using #webdev on Twitter?</h4>
          <div className="graph">
            <svg id="bubbles"></svg>
          </div>
        </main>

        <footer><p>Built by Rachel Cavin using React, Node, Express, D3, and lots of help from <a href="https://medium.freecodecamp.org/a-gentle-introduction-to-d3-how-to-build-a-reusable-bubble-chart-9106dc4f6c46">this blog</a>.</p></footer>

      </div>
    );
  }
}

export default App;
