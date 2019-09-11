import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "1",
      output: "0"
    };
    this.reset = this.reset.bind(this);
  }
  reset() {
    this.setState({ input: "0", output: "" });
  }
  render() {
    return (
      <React.Fragment>
        <div id="description">
          <p>JavaScript Calculator</p>
        </div>
        <div class="container">
          <div id="display">
            <div id="upper-display">{this.state.output}</div>
            <div id="lower-display">{this.state.input}</div>
          </div>
          <button id="clear" onClick={this.reset}>
            AC
          </button>
          <button id="divide">/</button>
          <button id="multiply">X</button>
          <button id="subtract">-</button>
          <button id="add">+</button>
          <button id="nine">9</button>
          <button id="eight">8</button>
          <button id="seven">7</button>
          <button id="six">6</button>
          <button id="five">5</button>
          <button id="four">4</button>
          <button id="three">3</button>
          <button id="two">2</button>
          <button id="one">1</button>
          <button id="equals">=</button>
          <button id="decimal">.</button>
          <button id="zero">0</button>
        </div>
        <div style={{ textAlign: "center" }}>
          <p>
            by:{" "}
            <a
              id="portfolio-link"
              href="https://techcarpenter.github.io/personalportfolio/" target="_blank" rel="noopener noreferrer"
            >
              Brian DeVries
            </a>
          </p>
        </div>
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
