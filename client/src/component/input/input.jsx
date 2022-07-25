import React, { Component } from "react";

// component
class Input extends Component {
  // default props for input
  static defaultProps = {
    onInput: "",
    onKeyDown: "",
    onKeyUp: "",
    // this is an example of removing the paste
    // functionality entirely across the board
    // onPaste: (e) => { e.preventDefault() },
    onPaste: "",
    max: "",
    min: "",
    inputmode: "",
    pattern: "",
    placeholder: "",
    type: "text"
  };

  render() {
    return (
      <input
        inputMode={this.props.inputmode}
        max={this.props.max}
        min={this.props.min}
        className={this.props.className}
        onInput={e => {
          if (this.props.onInput !== "") {
            this.props.onInput(e);
          }
        }}
        onKeyDown={e => {
          if (this.props.onKeyDown !== "") {
            this.props.onKeyDown(e);
          }
        }}
        onKeyUp={e => {
          if (this.props.onKeyUp !== "") {
            this.props.onKeyUp(e);
          }
        }}
        onPaste={e => {
          if (this.props.onPaste !== "") {
            this.props.onPaste(e);
          }
        }}
        pattern={this.props.pattern}
        placeholder={this.props.placeholder}
        type={this.props.type}
        defaultValue={this.props.value}
        name={this.props.name}
      />
    );
  }
}

export default Input;
