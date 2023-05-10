import { useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import { SIGN_UP_MUTATION } from "../graphql/mutations/SIGN_UP_MUTATION";

export const SignUpPage = () => {
  const [mutate] = useMutation(SIGN_UP_MUTATION);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    const result = await mutate({
      variables: { email, password },
    });
    const token = result.data.signUp;
    localStorage.setItem("token", token);
    navigate("/");
  };

  return (
    <>
      <p>
        Back to <Link to="/">Home</Link>
      </p>

      <h1>Sign up</h1>

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

        <button type="submit">Sign Up</button>
      </form>

      <p>
        Already have an account? <Link to="/sign-in">Sign in</Link>
      </p>
    </>
  );
};
