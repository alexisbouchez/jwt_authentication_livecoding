import { render, screen } from "@testing-library/react";
import SignOutButton from "./SignOutButton";

describe("SignOutButton", () => {
  describe("when used is not logged in", () => {
    it("should not render the button", () => {
      render(<SignOutButton loggedIn={false} handleSignOut={() => {}} />);
      expect(screen.queryByRole("button")).toBeNull();
    });
  });

  describe("when used is logged in", () => {
    it("should render the button", () => {
      render(<SignOutButton loggedIn={true} handleSignOut={() => {}} />);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("should call the handleSignOut function when clicked", () => {
      const handleSignOut = jest.fn();
      render(<SignOutButton loggedIn={true} handleSignOut={handleSignOut} />);
      screen.getByRole("button").click();
      expect(handleSignOut).toHaveBeenCalledTimes(1);
    });
  });
});
