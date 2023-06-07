import { render, screen } from "@testing-library/react";
import SignOutButton from "./SignOutButton";

describe("SignOutButton", () => {
  describe("when the user is not logged in", () => {
    it("should not render the button", () => {
      render(<SignOutButton loggedIn={false} handleSignOut={() => {}} />);

      expect(screen.queryByRole("button")).toBeNull();
    });
  });

  describe("when the user is logged in", () => {
    it("should render the button", () => {
      render(<SignOutButton loggedIn={true} handleSignOut={() => {}} />);

      expect(screen.queryByRole("button")).toBeInTheDocument();
    });

    it("should call the handleSignOut when clicked", () => {
      const handleSignOut = jest.fn();
      render(<SignOutButton loggedIn={true} handleSignOut={handleSignOut} />);

      const button = screen.queryByRole("button");
      const button2 = screen.getByRole("button");

      screen.queryByRole("button")?.click();
      expect(handleSignOut).toHaveBeenCalledTimes(1);
    });
  });
});
