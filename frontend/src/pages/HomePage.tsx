import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <div>
      <h1>Bienvenue dans le crew Lamarr !</h1>

      <Link to="/sign-up">Sign up</Link>
    </div>
  );
};
