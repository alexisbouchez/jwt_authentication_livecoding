import { render, screen } from "@testing-library/react";
import { WilderCard } from "./WilderCard";

describe("WilderCard", () => {
  describe("when the city is not provided", () => {
    it("should display the first name and last name", () => {
      render(<WilderCard firstName="Jean-Paul" lastName="Belmondo" />);

      expect(screen.getByTestId("heading")).toHaveTextContent(
        "[?] Jean-Paul Belmondo"
      );
    });

    it("should display the skills", () => {
      const skills = ["Acting", "Comedy", "Stunts"];

      render(
        <WilderCard firstName="Jean-Paul" lastName="Belmondo" skills={skills} />
      );

      for (const skill of skills) {
        expect(screen.getByTestId("skills-list")).toContainHTML(
          `<li>${skill}</li>`
        );
      }
    });
  });

  describe("when the city is provided", () => {
    it("should display the first name, last name and city", () => {
      render(
        <WilderCard firstName="Jean-Paul" lastName="Belmondo" city="Paris" />
      );

      expect(screen.getByTestId("heading")).toHaveTextContent(
        "[Paris] Jean-Paul Belmondo"
      );
    });

    it("should display the skills", () => {
      const skills = ["Acting", "Comedy", "Stunts"];

      render(
        <WilderCard
          firstName="Jean-Paul"
          lastName="Belmondo"
          city="Paris"
          skills={skills}
        />
      );

      for (const skill of skills) {
        expect(screen.getByTestId("skills-list")).toContainHTML(
          `<li>${skill}</li>`
        );
      }
    });
  });
});
