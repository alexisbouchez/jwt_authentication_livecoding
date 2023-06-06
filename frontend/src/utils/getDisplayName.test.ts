import { getDisplayName } from "./getDisplayName";

describe("getDisplayName", () => {
  describe("when no specified city", () => {
    it("returns the default city", () => {
      expect(getDisplayName("Zoë", "Dubois")).toEqual("[?] Zoë Dubois");

      expect(getDisplayName("Alain", "Delon")).toEqual("[?] Alain Delon");
    });
  });

  describe("when specified city", () => {
    it("returns the specified city", () => {
      expect(getDisplayName("Zoë", "Dubois", "Paris")).toEqual(
        "[Paris] Zoë Dubois"
      );

      expect(getDisplayName("Alain", "Delon", "Marseille")).toEqual(
        "[Marseille] Alain Delon"
      );
    });
  });
});
