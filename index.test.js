const fluffy = require("./index");

describe("uniqueness of a million ids", () => {
  const size = 1000000;
  let smallestSetSize = size;
  // we generate size new ids 3 times and take the worst case
  for (let i = 0; i < 3; i++) {
    const list = [];
    for (let j = 0; j < size; j++) {
      list.push(fluffy.generate());
    }
    smallestSetSize = Math.min(new Set(list).size, smallestSetSize);
  }

  test("10% unique ids", () => {
    const factor = 0.1;
    expect(smallestSetSize).toBeGreaterThanOrEqual(size * factor);
  });
  test("25% unique ids", () => {
    const factor = 0.25;
    expect(smallestSetSize).toBeGreaterThanOrEqual(size * factor);
  });
  test("50% unique ids", () => {
    const factor = 0.5;
    expect(smallestSetSize).toBeGreaterThanOrEqual(size * factor);
  });
  test("75% unique ids", () => {
    const factor = 0.75;
    expect(smallestSetSize).toBeGreaterThanOrEqual(size * factor);
  });
  test("90% unique ids", () => {
    const factor = 0.9;
    expect(smallestSetSize).toBeGreaterThanOrEqual(size * factor);
  });
  test("95% unique ids", () => {
    const factor = 0.95;
    expect(smallestSetSize).toBeGreaterThanOrEqual(size * factor);
  });
  test("99% unique ids", () => {
    const factor = 0.99;
    expect(smallestSetSize).toBeGreaterThanOrEqual(size * factor);
  });
  test("100% unique ids", () => {
    const factor = 1;
    expect(smallestSetSize).toBe(size * factor);
  });
});
