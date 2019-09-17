//@ts-check
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as math from "mathjs";

/* VARS */
const lastPressedEnum = {
  OPS: "OPS",
  NUM: "NUM",
  EQUAL: "EQUAL",
  DEC: "DEC",
  CLEAR: "CLEAR"
};

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
    this.setState({ expr: "", currentArg: "0", result: "", output: "", lastPressed: lastPressedEnum.CLEAR });
  }
  handleEvaluate(value) {
    let stateObj = { ...this.state };
    if (stateObj.lastPressed !== lastPressedEnum.EQUAL) {
      stateObj.expr += stateObj.currentArg;
      stateObj.currentArg = "0";
      console.log(stateObj.expr);
      stateObj.result = math.evaluate(stateObj.expr);
      stateObj.output = stateObj.expr + "=" + stateObj.result;
      stateObj.currentArg = stateObj.result;
    }

    stateObj.lastPressed = lastPressedEnum.EQUAL;
    this.setState(stateObj);
  }
  handleDecimal(value) {
    let stateObj = { ...this.state };
    if (!stateObj.currentArg.includes(".")) {
      stateObj.currentArg += ".";
    }
    stateObj.output = stateObj.expr + stateObj.currentArg;
    stateObj.lastPressed = lastPressedEnum.DEC;
    this.setState(stateObj);
  }
  handleOperator(value) {
    let stateObj = { ...this.state };
    if (stateObj.lastPressed === lastPressedEnum.EQUAL) {
      stateObj.expr = stateObj.result + value;
      stateObj.result = "";
    } else if (stateObj.lastPressed === lastPressedEnum.OPS) {
      if (!/(\+|\/|\*|-)-$/.test(stateObj.expr)) {
        if (value === "-") {
          stateObj.expr += value;
        } else {
          stateObj.expr = stateObj.expr.substring(0, stateObj.expr.length - 1) + value;
        }
      } else {
        stateObj.expr = stateObj.expr.substring(0, stateObj.expr.length - 2) + value;
      }
    } else if (stateObj.lastPressed === lastPressedEnum.DEC) {
      stateObj.expr += stateObj.currentArg.substring(0, stateObj.currentArg.length - 1) + value;
    } else if (stateObj.lastPressed === lastPressedEnum.NUM) {
      stateObj.expr += stateObj.currentArg + value;
    }
    if (stateObj.lastPressed !== lastPressedEnum.CLEAR) {
      stateObj.lastPressed = lastPressedEnum.OPS;
    }
    stateObj.currentArg = "0";
    stateObj.output = stateObj.expr;
    this.setState(stateObj);
  }
  handleDigit(value) {
    let stateObj = { ...this.state };
    if (stateObj.currentArg === "0") {
      stateObj.currentArg = "";
    }
    stateObj.currentArg += value;
    stateObj.lastPressed = lastPressedEnum.NUM;
    stateObj.output = stateObj.expr + stateObj.currentArg;
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
            <div id="expression">{this.state.output}</div>
            <div id="display">{this.state.currentArg}</div>
          </div>
          <Button id="clear" value="AC" onClick={this.handleClear} trigger={46} />
          <Button id="divide" value="/" onClick={this.handleOperator} trigger={111} />
          <Button id="subtract" value="-" onClick={this.handleOperator} trigger={109} />
          <Button id="add" value="+" onClick={this.handleOperator} trigger={107} />
          <Button id="multiply" value="*" onClick={this.handleOperator} trigger={106} />
          <Button id="nine" value="9" onClick={this.handleDigit} trigger={105} />
          <Button id="eight" value="8" onClick={this.handleDigit} trigger={104} />
          <Button id="seven" value="7" onClick={this.handleDigit} trigger={103} />
          <Button id="six" value="6" onClick={this.handleDigit} trigger={102} />
          <Button id="five" value="5" onClick={this.handleDigit} trigger={101} />
          <Button id="four" value="4" onClick={this.handleDigit} trigger={100} />
          <Button id="three" value="3" onClick={this.handleDigit} trigger={99} />
          <Button id="two" value="2" onClick={this.handleDigit} trigger={98} />
          <Button id="one" value="1" onClick={this.handleDigit} trigger={97} />
          <Button id="zero" value="0" onClick={this.handleDigit} trigger={96} />
          <Button id="equals" value="=" onClick={this.handleEvaluate} trigger={13} />
          <Button id="decimal" value="." onClick={this.handleDecimal} trigger={110} />
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
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleButtonPress = this.handleButtonPress.bind(this);
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }
  handleKeyPress(event) {
    if (event.keyCode === this.props.trigger) {
      this.props.onClick(this.convertKey(event.key));
    }
  }
  handleButtonPress(event) {
    this.props.onClick(event.target.value);
  }
  convertKey(key) {
    switch (key) {
      case "Delete":
        return "AC";
      case "Enter":
        return "=";
      default:
        return key;
    }
  }
  render() {
    return (
      <button id={this.props.id} value={this.props.value} onClick={this.handleButtonPress}>
        {this.props.value}
      </button>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
