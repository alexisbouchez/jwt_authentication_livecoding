import { useLazyQuery } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import { SIGN_IN_QUERY } from "../graphql/queries/SIGN_IN_QUERY";

export const SignInPage = () => {
  const [signIn] = useLazyQuery(SIGN_IN_QUERY);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    const result = await signIn({ variables: { email, password } });
    const token = result.data.signIn;
    localStorage.setItem("token", token);
    navigate("/");
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

        <button type="submit">Sign in</button>
      </form>

      <p>
        Don't have an account? <Link to="/sign-up">Sign up</Link>
      </p>
    </>
  );
};
