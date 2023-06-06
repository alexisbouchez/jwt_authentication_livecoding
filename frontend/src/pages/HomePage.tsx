import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { GET_PROFILE_QUERY } from "../graphql/queries/GET_PROFILE_QUERY";
import { WilderCard, WilderProps } from "../components/WilderCard";
import SignOutButton from "../components/SignOutButton";

export const HomePage = () => {
  const response = useQuery(GET_PROFILE_QUERY);
  console.log("response", response);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const wilders: WilderProps[] = [
    {
      firstName: "Jean-Paul",
      lastName: "Belmondo",
      city: "Paris",
      skills: ["Acting", "Comedy", "Stunts"],
    },
    {
      firstName: "Anna",
      lastName: "Karina",
      skills: ["Acting", "Singing", "Dancing"],
    },
  ];

  return (
    <div>
      <h1>Bienvenue dans le crew Lamarr !</h1>

      <ul className="cards-grid">
        {wilders.map((wilder, key) => (
          <WilderCard {...wilder} key={key} />
        ))}
      </ul>

      {response?.data?.getProfile ? (
        <>
          <p>
            Vous êtes connecté avec l'adresse électronique suivante :{" "}
            {response?.data?.getProfile}
          </p>
        </>
      ) : (
        <Link to="/sign-up">Sign up</Link>
      )}

      <SignOutButton
        loggedIn={!!response?.data?.getProfile}
        handleSignOut={handleSignOut}
      />
    </div>
  );
};
