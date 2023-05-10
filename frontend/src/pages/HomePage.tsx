import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { GET_PROFILE_QUERY } from "../graphql/queries/GET_PROFILE_QUERY";

export const HomePage = () => {
  const response = useQuery(GET_PROFILE_QUERY);
  console.log("response", response);

  const handleSignOut = () => {
    localStorage.removeItem("token");
  };

  return (
    <div>
      <h1>Bienvenue dans le crew Lamarr !</h1>

      {response?.data?.getProfile ? (
        <>
          <p>
            Vous êtes connecté avec l'adresse électronique suivante :{" "}
            {response?.data?.getProfile}
          </p>
          <button onClick={handleSignOut}>
            Cliquer ici pour vous déconnecter
          </button>
        </>
      ) : (
        <Link to="/sign-up">Sign up</Link>
      )}
    </div>
  );
};
