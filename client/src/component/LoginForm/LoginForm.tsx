import { ChangeEvent, useState, FormEvent } from "react";
import { login } from "../../utilities/users-service";

type Props = {
  setUser: (a: { username: string; email: string }) => void;
};
export default function LoginForm({ setUser }: Props) {
  const [error, setError] = useState({ error: "" });
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setError({ error: "" });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      //const user = await response?.json();
      const token = await login(credentials);
      console.log("login", token);

      token ? setUser(token) : undefined;
    } catch (error) {
      setError({ error: "Login Failed" });
    }
  };
  return (
    <div>
      <div className="form-container">
        <form
          autoComplete="off"
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <label>Email</label>
          <input type="email" name="email" onChange={handleChange} required />
          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            required
          />
          <button type="submit">LOGIN</button>
        </form>
      </div>
      <p className="error-message">{error.error}</p>
    </div>
  );
}
