import { Link } from "react-router-dom";

export const SignInPage = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    console.log("email", email);
    console.log("password", password);
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
