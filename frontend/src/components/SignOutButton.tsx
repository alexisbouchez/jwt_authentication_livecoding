export type SignOutButtonProps = {
  loggedIn: boolean;
  handleSignOut: () => void;
};

export default function SignOutButton({
  loggedIn,
  handleSignOut,
}: SignOutButtonProps) {
  if (!loggedIn) {
    return null;
  }

  return (
    <button onClick={handleSignOut}>Cliquer ici pour vous déconnecter</button>
  );
}
