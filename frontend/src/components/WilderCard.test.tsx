import { render, screen } from "@testing-library/react";
import { WilderCard } from "./WilderCard";

describe("WilderCard", () => {
  it("should display the first name and the last name", () => {
    render(<WilderCard firstName="Jean-Paul" lastName="Belmondo" />);

    expect(screen.getByTestId("heading")).toHaveTextContent(
      "[?] Jean-Paul Belmondo"
    );
  });

  it("should display the first name and the last name, and city", () => {
    render(
      <WilderCard firstName="Jean-Paul" lastName="Belmondo" city="Londres" />
    );

    expect(screen.getByTestId("heading")).toHaveTextContent(
      "[Londres] Jean-Paul Belmondo"
    );
  });

  it("should display the first name and the last name, and skills list", () => {
    const skills = ["Acting", "Comedy", "Stunts"];

    render(
      <WilderCard firstName="Paulette" lastName="Delon" skills={skills} />
    );

    expect(screen.getByTestId("heading")).toHaveTextContent(
      "[?] Paulette Delon"
    );

    for (const skill of skills) {
      expect(screen.getByTestId("skills-list")).toContainHTML(
        `<li>${skill}</li>`
      );
    }
  });
});
