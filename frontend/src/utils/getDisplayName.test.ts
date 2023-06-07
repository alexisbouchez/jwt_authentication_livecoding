// On écrit un morceau de test. -> Rouge
// Puis, on écrit le code qui va permettre de faire "réussir" le test. -> Vert
// On améliore le morceau de test. -> Rouge
// On améliore le code pour faire passer le test. -> Vert

import { getDisplayName } from "./getDisplayName";

// ...
describe("displayName", () => {
  describe("when no specified city", () => {
    it("returns the first name, and the last name (only)", () => {
      expect(getDisplayName("Zoé", "Dubois")).toEqual("[?] Zoé Dubois");
      expect(getDisplayName("Albert", "Dupont")).toEqual("[?] Albert Dupont");
      expect(getDisplayName("Carl", "Marion")).toEqual("[?] Carl Marion");
    });
  });

  describe("when specified city", () => {
    it("returns the first name, the last name, and the city", () => {
      expect(getDisplayName("Zoé", "Dubois", "Lille")).toEqual(
        "[Lille] Zoé Dubois"
      );
      expect(getDisplayName("Jean-Paul", "Belmondo", "Paris")).toEqual(
        "[Paris] Jean-Paul Belmondo"
      );
    });
  });
});
