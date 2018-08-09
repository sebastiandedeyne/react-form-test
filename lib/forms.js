import React, { Component, createContext } from "react";

const FormContext = createContext();

export class Form extends Component {
  update(newValues) {
    this.props.onChange({
      ...this.props.values,
      ...newValues
    });
  }

  handleSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.props.values);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <FormContext.Provider
          value={{
            update: this.update.bind(this),
            values: this.props.values
          }}
        >
          {this.props.children}
        </FormContext.Provider>
      </form>
    );
  }
}

export function Input(props) {
  return (
    <FormContext.Consumer>
      {({ values, update }) =>
        props.children(values[props.name], value =>
          update({ [props.name]: value })
        )
      }
    </FormContext.Consumer>
  );
}
