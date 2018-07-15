var Minutagem = require('../src/minutagem');

describe("Time signatures array", function() {
  it("is not empty", function() {
    expect(Minutagem.timeSignatures.length).toBeGreaterThan(0)
  })
})

describe("Calculate method", function() {
  it("calculates the song's minutagem", function() {
    timeSignature = Minutagem.timeSignatures.find((item) => item.formula === "4x4");
    expect(
      Minutagem.calculate(100, timeSignature, 38)
    ).toBe(91);
  })
})
