import { Component } from "react";
import { Form, Input } from "../lib/forms";

const Label = ({ children }) => (
  <label>
    {children}
    <style jsx>{`
      label {
        display: flex;
        flex-direction: column;
        margin-bottom: 0.5rem;
      }
    `}</style>
  </label>
);

const TextInput = ({ name, label = "", type = "text" }) => (
  <Label>
    {label}
    <Input name={name}>
      {(value, update) => (
        <input
          name={name}
          id={name}
          type={type}
          value={value}
          onChange={e => update(e.target.value)}
        />
      )}
    </Input>
  </Label>
);

export default class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      values: {
        name: "",
        email: ""
      }
    };
  }

  submit = (values) => {
    console.log(values);
  }

  render() {
    return (
      <Form
        values={this.state.values}
        onChange={values => this.setState({ values })}
        onSubmit={this.submit}
      >
        <TextInput name="name" label="Name" />
        <TextInput name="email" label="E-mail" />
        <button type="submit">
          Submit
        </button>
      </Form>
    );
  }
}
