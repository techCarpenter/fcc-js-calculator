//@ts-check
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as math from "mathjs";

/* VARS */
const lastPressedEnum = {
    OPS: 1,
    NUM: 2,
    EQUAL: 3,
    DEC: 4,
    CLEAR: 5
  },
  endsWithOperator = /\+|\/|\*|-$/;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { expr: "", currentArg: "0", result: "", output: "", lastPressed: lastPressedEnum.CLEAR };
    this.handleClear = this.handleClear.bind(this);
    this.handleDigit = this.handleDigit.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.handleEvaluate = this.handleEvaluate.bind(this);
  }
  handleClear() {
    this.setState({ expr: "", currentArg: "0", result: "", output: "0", lastPressed: lastPressedEnum.CLEAR });
  }
  handleEvaluate(event) {
    let stateObj = {};
    if (this.state.lastPressed != lastPressedEnum.EQUAL) {
      stateObj.expr = this.state.expr + this.state.currentArg;
      stateObj.currentArg = "0";
      stateObj.result = math.evaluate(stateObj.expr);
      stateObj.output = stateObj.expr + "=" + stateObj.result;
    }

    stateObj.lastPressed = lastPressedEnum.EQUAL;
    this.setState(stateObj);
  }
  handleDecimal(event) {
    let stateObj = {};
    if (!this.state.currentArg.includes(".")) {
      stateObj.currentArg = this.state.currentArg + ".";
    }
    stateObj.lastPressed = lastPressedEnum.DEC;
    this.setState(stateObj);
  }
  handleOperator(event) {
    let stateObj = {};
    if (this.state.lastPressed === lastPressedEnum.EQUAL) {
      stateObj.expr = this.state.result + event.target.value;
      stateObj.result = "";
    } else if (endsWithOperator.test(this.state.expr)) {
      stateObj.expr = this.state.expr.substring(0, this.state.expr.length - 1) + event.target.value;
    } else {
      stateObj.expr = this.state.expr + this.state.currentArg + event.target.value;
    }
    stateObj.lastPressed = lastPressedEnum.OPS;
    stateObj.currentArg = "0";
    stateObj.output = stateObj.expr;
    this.setState(stateObj);
  }
  handleDigit(event) {
    let stateObj = { currentArg: this.state.currentArg };
    if (this.state.currentArg === "0") {
      stateObj.currentArg = "";
    }
    stateObj.currentArg += event.target.value;
    stateObj.lastPressed = lastPressedEnum.NUM;
    stateObj.output = this.state.expr + stateObj.currentArg;
    this.setState(stateObj);
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
            <div id="lower-display">{this.state.currentArg}</div>
          </div>
          <Button id="clear" value="AC" onClick={this.handleClear} />
          <Button id="divide" value="/" onClick={this.handleOperator} />
          <Button id="multiply" value="*" onClick={this.handleOperator} />
          <Button id="subtract" value="-" onClick={this.handleOperator} />
          <Button id="add" value="+" onClick={this.handleOperator} />
          <Button id="nine" value="9" onClick={this.handleDigit} />
          <Button id="eight" value="8" onClick={this.handleDigit} />
          <Button id="seven" value="7" onClick={this.handleDigit} />
          <Button id="six" value="6" onClick={this.handleDigit} />
          <Button id="five" value="5" onClick={this.handleDigit} />
          <Button id="four" value="4" onClick={this.handleDigit} />
          <Button id="three" value="3" onClick={this.handleDigit} />
          <Button id="two" value="2" onClick={this.handleDigit} />
          <Button id="one" value="1" onClick={this.handleDigit} />
          <Button id="zero" value="0" onClick={this.handleDigit} />
          <Button id="equals" value="=" onClick={this.handleEvaluate} />
          <Button id="decimal" value="." onClick={this.handleDecimal} />
        </div>
        <div style={{ textAlign: "center" }}>
          <p>
            by:{" "}
            <a
              id="portfolio-link"
              href="https://techcarpenter.github.io/personalportfolio/"
              target="_blank"
              rel="noopener noreferrer">
              Brian DeVries
            </a>
          </p>
        </div>
      </React.Fragment>
    );
  }
}

class Button extends React.Component {
  render() {
    return (
      <button id={this.props.id} value={this.props.value} onClick={this.props.onClick}>
        {this.props.value}
      </button>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
