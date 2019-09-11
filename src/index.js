import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arg1: "",
      arg2: "",
      result: "",
      input: "0",
      output: "",
      operator: { display: "", type: "none" }
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(val) {
    let localState = this.state;

    val = val.toLowerCase();
    switch (val) {
      case "ac":
        localState.input = "0";
        localState.output = "0";
        localState.operator = { display: "", type: "none" };
        break;
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        if (localState.input === "0") {
          localState.input = "";
        }
        if (localState.input.length < 15) {
          localState.input = localState.input + val;
        }
        break;
      case ".":
        if (!/\./g.test(localState.input)) {
          localState.input = localState.input + val;
        }
        break;
      case "+":
      case "-":
      case "*":
      case "/":
        localState.operator =
          val === "+"
            ? { display: "+", type: "add" }
            : val === "-"
            ? { display: "-", type: "sub" }
            : val === "*"
            ? { display: "*", type: "mul" }
            : { display: "/", type: "div" };
        localState.arg1 = localState.input;
        localState.input = "0";
        break;
      case "=": //Calculate!
        localState.arg2 = localState.input;
        localState.input = "0";
        let result = 0;
        switch (localState.operator.type) {
          case "add":
            result = parseInt(localState.arg1) + parseInt(localState.arg2);
            break;
          case "sub":
            result = parseInt(localState.arg1) - parseInt(localState.arg2);
            break;
          case "mul":
            result = parseInt(localState.arg1) * parseInt(localState.arg2);
            break;
          case "div":
            result = parseInt(localState.arg1) / parseInt(localState.arg2);
            break;
          default:
            break;
        }

        console.log("result = " + result);
        if (localState.arg1 > 0 && localState.arg2 > 0) {
          localState.output =
            localState.arg1 +
            localState.operator.display +
            localState.arg2 +
            "=" +
            result;
        }
        break;
      default:
        console.log(val);
        break;
    }
    console.log(localState);
    this.setState(localState);
  }
  render() {
    return (
      <React.Fragment>
        <div id="description">
          <p>JavaScript Calculator</p>
        </div>
        <div className="container">
          <div id="total-display">
            <div id="display">{this.state.output}</div>
            <div id="lower-display">{this.state.input}</div>
          </div>
          <Button id="clear" value="AC" onClick={this.handleClick} />
          <Button id="divide" value="/" onClick={this.handleClick} />
          <Button id="multiply" value="*" onClick={this.handleClick} />
          <Button id="subtract" value="-" onClick={this.handleClick} />
          <Button id="add" value="+" onClick={this.handleClick} />
          <Button id="nine" value="9" onClick={this.handleClick} />
          <Button id="eight" value="8" onClick={this.handleClick} />
          <Button id="seven" value="7" onClick={this.handleClick} />
          <Button id="six" value="6" onClick={this.handleClick} />
          <Button id="five" value="5" onClick={this.handleClick} />
          <Button id="four" value="4" onClick={this.handleClick} />
          <Button id="three" value="3" onClick={this.handleClick} />
          <Button id="two" value="2" onClick={this.handleClick} />
          <Button id="one" value="1" onClick={this.handleClick} />
          <Button id="equals" value="=" onClick={this.handleClick} />
          <Button id="decimal" value="." onClick={this.handleClick} />
          <Button id="zero" value="0" onClick={this.handleClick} />
        </div>
        <div style={{ textAlign: "center" }}>
          <p>
            by:{" "}
            <a
              id="portfolio-link"
              href="https://techcarpenter.github.io/personalportfolio/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Brian DeVries
            </a>
          </p>
        </div>
      </React.Fragment>
    );
  }
}

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.onClick(this.props.value);
  }
  render() {
    return (
      <button id={this.props.id} onClick={this.handleClick}>
        {this.props.value}
      </button>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
