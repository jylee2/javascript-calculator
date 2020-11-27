// Find non-number regex
const regNum = /[0-9.]/;
const regPeriod = /[.]/;
//React component
class MyReactComponent extends React.Component {
  constructor(props) {
    super(props);
    //Load initial states
    this.state = {
      calc: 0,
      output: 0,
      prevClicked: "",
      prevEval: ""
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick = (e) => {
    const buttonClicked = e.target.innerHTML; // String
    // Record the button that was clicked previously
    this.setState({
      prevClicked: buttonClicked
    });
    // If buttonClicked is a number
    if(regNum.test(buttonClicked)){
      // To make sure there is no 0 in front
      if(this.state.output === 0 ||
        this.state.output === "0"){
        // If click on 0, then output 0 only
        if(buttonClicked === "0") {
          //console.log("1A: "+this.state.output+typeof(this.state.output));
          this.setState({
            calc: "0",
            output: "0"
          });
        }
        // If click on other number, then output other number
        else {
          this.setState({
            calc: buttonClicked,
            output: buttonClicked
          });
        }
      }
      // If there is no 0 in front
      else {
        // If there is already a decimal point & clicked on decimal again, then don't include decimal
        if(regPeriod.test(this.state.output) &&
          buttonClicked === ".") {
          this.setState({
            calc: this.state.calc,
            output: this.state.output
          });
        }
        // If there isn't a decimal point, then may include it
        else {
          this.setState({
            calc: this.state.calc + buttonClicked,
            output: this.state.output + buttonClicked
          });
        }
      }
    }
    // If current buttonClicked is NOT a number, but an operator
    else {
      // If the current button clicked is NOT a number, but +/-/*//
      // Then concat operator symbol
      if(!regNum.test(buttonClicked) &&
      buttonClicked !== "C" &&
      buttonClicked !== "=") {
        this.setState({
          output: buttonClicked,
          calc: this.state.calc + buttonClicked,
        });
      }
      // If previous button clicked is NOT a number, but +/*//
      // Then change last char to +/*//
      if(this.state.prevClicked === "+" ||
      this.state.prevClicked === "*" ||
      this.state.prevClicked === "/") {
          let newCalc = this.state.calc.split("");
          newCalc = newCalc.slice(0,newCalc.length-1);
          this.setState({
            output: buttonClicked,
            calc: newCalc.join("") + buttonClicked
          });
      }
      // But if the current button clicked is - && 2nd last character in calc is a number
      // Then concat -
      if(buttonClicked === "-" &&
      regNum.test(this.state.calc[this.state.calc.length-2])) {
        this.setState({
          output: buttonClicked,
          calc: this.state.calc + buttonClicked
        });
      }
      // If calc length > 2 &&
      //3rd last character in calc is NOT a number
      //2nd last character in calc is NOT a number
      let testCalc = [this.state.calc.length-2] + [this.state.calc.length-1];
      if(this.state.calc.length > 2 &&
      !regNum.test(this.state.calc[this.state.calc.length-2]) &&
      !regNum.test(this.state.calc[this.state.calc.length-1])) {
        let newCalc = this.state.calc.split("");
        newCalc = newCalc.slice(0,newCalc.length-2);
        this.setState({
          calc: newCalc.join("") + buttonClicked
        });
      }
    }
    // Clear output
    if(buttonClicked === "C") {
      this.setState({
        calc: 0,
        output: 0,
        prevEval: ""
      });
    }
    // If clicked on =, then eval()
    if(buttonClicked === "="){
      this.setState({
        calc: this.state.calc,
        output: eval(this.state.calc),
        // To store output after pressing =
        prevEval: eval(this.state.calc)
      });
    }
    // If prevClicked is =, then reset calc
    if(this.state.prevClicked === "=" && buttonClicked !== "C"){
      this.setState({
        calc: this.state.prevEval + buttonClicked
      });
    }
  }
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8 text-center customClassMain">
            <br/>
            <div className="calcBody">
              <div className="calcDisplay">
                <br/>
                <h4 className="calc-text">{this.state.calc}</h4>
                <h1 id="display">{this.state.output}</h1>
              </div>
              <div className="btn-group-lg btn-group-horizontal">
                <button id="seven" className="btn btn-default btn-lg num-pad" onClick={this.handleClick}>
                  7
                </button>
                <button id="eight" className="btn btn-default btn-lg num-pad" onClick={this.handleClick}>
                  8
                </button>
                <button id="nine" className="btn btn-default btn-lg num-pad" onClick={this.handleClick}>
                  9
                </button>
                <button id="divide" className="btn btn-primary btn-lg num-pad" onClick={this.handleClick}>
                  /
                </button>
              </div>
              <div className="btn-group-lg btn-group-horizontal">
                <button id="four" className="btn btn-default btn-lg num-pad" onClick={this.handleClick}>
                  4
                </button>
                <button id="five" className="btn btn-default btn-lg num-pad" onClick={this.handleClick}>
                  5
                </button>
                <button id="six" className="btn btn-default btn-lg num-pad" onClick={this.handleClick}>
                  6
                </button>
                <button id="multiply" className="btn btn-primary btn-lg num-pad" onClick={this.handleClick}>
                  *
                </button>
              </div>
              <div className="btn-group-lg btn-group-horizontal">
                <button id="one" className="btn btn-default btn-lg num-pad" onClick={this.handleClick}>
                  1
                </button>
                <button id="two" className="btn btn-default btn-lg num-pad" onClick={this.handleClick}>
                  2
                </button>
                <button id="three" className="btn btn-default btn-lg num-pad" onClick={this.handleClick}>
                  3
                </button>
                <button id="subtract" className="btn btn-primary btn-lg num-pad" onClick={this.handleClick}>
                  -
                </button>
              </div>
              <div className="btn-group-lg btn-group-horizontal">
                <button id="zero" className="btn btn-default btn-lg num-pad" onClick={this.handleClick}>
                  0
                </button>
                <button id="decimal" className="btn btn-default btn-lg num-pad" onClick={this.handleClick}>
                  .
                </button>
                <button id="add" className="btn btn-primary btn-lg num-pad" onClick={this.handleClick}>
                  +
                </button>
              </div>
                <button id="clear" className="btn btn-danger btn-lg num-pad" onClick={this.handleClick}>
                  C
                </button>
                <button id="equals" className="btn btn-success btn-lg num-pad" onClick={this.handleClick}>
                  =
                </button>
            </div>
            <br/>
            <p>Calculator by Jun</p>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
    );
  }
};
ReactDOM.render(<MyReactComponent/>, document.getElementById("react-div"))