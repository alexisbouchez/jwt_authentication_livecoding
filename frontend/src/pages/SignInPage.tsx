import { Link, useNavigate } from "react-router-dom";
import { fetcher } from "../utils/fetcher";
import { useState } from "react";

export const SignInPage = () => {
  const navigate = useNavigate();
  const [invalidCredentials, setInvalidCredentials] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      const { token } = await fetcher<{ token: string }>(
        "POST",
        "/api/auth/sign-in",
        {
          email,
          password,
        }
      );
      localStorage.setItem("token", token);
      navigate("/");
    } catch (error) {
      setInvalidCredentials(true);
    }
  };

  return (
    <>
      <p>
        Back to <Link to="/">Home</Link>
      </p>

      <h1>Sign in</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="alain.delon@exemple.fr"
          />
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="••••••••••"
          />
        </div>

        {invalidCredentials && (
          <p style={{ color: "red" }}>Invalid credentials</p>
        )}

        <button type="submit">Sign in</button>
      </form>

      <p>
        Don't have an account? <Link to="/sign-up">Sign up</Link>
      </p>
    </>
  );
};
