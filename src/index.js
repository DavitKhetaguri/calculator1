import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class Calc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "0",
      number: "0",
    };
    this.handleNumber = this.handleNumber.bind(this);
    this.handleNumberZero = this.handleNumberZero.bind(this);
    this.handleOp = this.handleOp.bind(this);
    this.handleEqual = this.handleEqual.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.getBigger = this.getBigger.bind(this);
  }
  getBigger = (e) => {
    e.target.classList.add("act");
    setTimeout(() => {
      e.target.classList.remove("act");
    }, 100);
  };

  handleClear = (e) => {
    this.getBigger(e);
    this.setState({
      input: "0",

      number: "0",
    });
  };

  handleNumber = (e) => {
    this.getBigger(e);
    if (this.state.input === "0") {
      this.setState({
        input: this.state.input.slice(0, -1) + e.target.innerText,
        number: e.target.innerText,
      });
    } else {
      this.setState({
        input: this.state.input + e.target.innerText,
        number: this.state.number + e.target.innerText,
      });
    }
    console.log(e);
  };
  handleNumberZero = (e) => {
    this.getBigger(e);
    if (
      /\./.test(this.state.number) ||
      /[123456789]/.test(this.state.number) ||
      this.state.number === ""
    ) {
      this.setState({
        input: this.state.input + "0",
        number: this.state.number + "0",
      });
    }
  };

  handleDecimal = (e) => {
    this.getBigger(e);
    if (this.state.number !== "" && !this.state.number.includes(".")) {
      this.setState({
        input: this.state.input + ".",
        number: this.state.number + ".",
      });
    }
    console.log(e.target);
  };

  handleOp = (e) => {
    this.getBigger(e);
    if (
      /[-+/*]/.test(this.state.input[this.state.input.length - 1]) &&
      e.target.innerText !== "-"
    ) {
      this.setState({
        input: this.state.input.slice(0, -1) + e.target.innerText,
        number: "",
      });
      console.log("sdf");
    } else {
      this.setState({
        input: this.state.input + e.target.innerText,
        number: "",
      });
    }
  };

  handleEqual = (e) => {
    this.getBigger(e);
    let equation = this.state.input;

    let newEquation = equation;

    while (/(?<=[0-9.]+)[*|/](?=-?[0-9.]+)/.test(newEquation)) {
      let num1 = newEquation.match(/[0-9.]+(?=[*|/])/);
      let num2 = newEquation.match(/(?<=[*|/])-?[0-9.]+/);
      let answ = 0;

      let sym = newEquation.match(/(?<=[0-9.]+)[*|/](?=-?[0-9.]+)/);
      console.log(sym, num1, num2);
      if (sym == "*") {
        answ = parseFloat(num1) * parseFloat(num2);
        newEquation = newEquation.replace(/([0-9.]+)([*|/])(-?[0-9.]+)/, answ);
        console.log(newEquation);
      }
      if (sym == "/") {
        answ = parseFloat(num1) / parseFloat(num2);
        newEquation = newEquation.replace(/([0-9.]+)([*|/])(-?[0-9.]+)/, answ);
        console.log(newEquation);
      }
    }
    let answ = 0;
    while (/[+|-]/.test(newEquation)) {
      let num2 = newEquation.match(/[+|-]*[0-9.]+/);

      answ += parseFloat(num2);
      newEquation = newEquation.replace(/[+|-]*[0-9.]+/, "");
    }
    if (answ !== 0) {
      this.setState({
        output: "",
        input: answ,
        number: "0",
      });
    } else {
      this.setState({
        output: "",
        input: newEquation,
        number: "0",
      });
    }
  };

  render() {
    return (
      <div id="container">
        <div id="calc">
          <div onClick={this.handleNumberZero} className="but" id="zero">
            0
          </div>
          <div onClick={this.handleNumber} className="but" id="one">
            1
          </div>
          <div onClick={this.handleNumber} className="but" id="two">
            2
          </div>
          <div onClick={this.handleNumber} className="but" id="three">
            3
          </div>
          <div onClick={this.handleNumber} className="but" id="four">
            4
          </div>
          <div onClick={this.handleNumber} className="but" id="five">
            5
          </div>
          <div onClick={this.handleNumber} className="but" id="six">
            6
          </div>
          <div onClick={this.handleNumber} className="but" id="seven">
            7
          </div>
          <div onClick={this.handleNumber} className="but" id="eight">
            8
          </div>
          <div onClick={this.handleNumber} className="but" id="nine">
            9
          </div>

          <div onClick={this.handleClear} className="but" id="clear">
            C
          </div>
          <div onClick={this.handleEqual} className="but" id="equals">
            =
          </div>
          <div onClick={this.handleDecimal} className="but" id="decimal">
            .
          </div>
          <div onClick={this.handleOp} className="but" id="add">
            +
          </div>
          <div onClick={this.handleOp} className="but" id="subtract">
            -
          </div>
          <div onClick={this.handleOp} className="but" id="multiply">
            *
          </div>
          <div onClick={this.handleOp} className="but" id="divide">
            /
          </div>
        </div>

        <div id="display">
          <div id="input">{this.state.input}</div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Calc />, document.getElementById("root"));
