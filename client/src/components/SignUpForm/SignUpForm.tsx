import { ChangeEvent, Component, FormEvent } from "react";
import { signUp } from "../../utilities/users-service";

type State = {
  username?: string;
  email?: string;
  password?: string;
  confirm?: string;
  error?: string;
};

type Props = {
  setUser: (a: { username: string; email: string }) => void;
};

export default class SignUpForm extends Component<Props, State> {
  state: State = {
    username: "",
    email: "",
    password: "",
    confirm: "",
    error: "",
  };

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [e.target.name]: e.target.value,
      error: "",
    });
  };

  handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const formData = { ...this.state };
      delete formData.error;
      delete formData.confirm;

      const response = await signUp(formData);
      console.log("signup", response);
      //const user = await response?.json();
      this.props.setUser({
        username: response.username,
        email: response.email,
      });
    } catch (error) {
      this.setState({ error: "sign up failed" });
    }
  };
  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
      <div>
        <div className="form-container">
          <form
            autoComplete="off"
            onSubmit={this.handleSubmit}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label>Name</label>
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
              required
            />
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
            <label>Confirm</label>
            <input
              type="password"
              name="confirm"
              value={this.state.confirm}
              onChange={this.handleChange}
              required
            />
            <button type="submit" disabled={disable}>
              SIGN UP
            </button>
          </form>
        </div>
        <p className="error-message">&nbsp;{this.state.error}</p>
      </div>
    );
  }
}
