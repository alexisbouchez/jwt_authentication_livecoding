import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../types/User";
import { fetcher } from "../utils/fetcher";

export const HomePage = () => {
  const [profile, setProfile] = useState<User | null>(null);

  useEffect(() => {
    async function getProfile() {
      try {
        const response = await fetcher<User>("GET", "/api/auth/profile");
        setProfile(response);
      } catch {}
    }
    getProfile();
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
  };

  return (
    <div>
      <h1>Bienvenue dans le crew Lamarr !</h1>

      {profile ? (
        <>
          <p>
            Vous êtes connecté avec l'adresse électronique suivante :{" "}
            {profile.email}
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
