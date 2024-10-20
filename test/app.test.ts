import { divide, isEven, multiple, sum } from "../src/app";

describe("Testing App.ts", () => {
  test("Sum adds 1+2 to equal 3", () => {
    // Arrage
    const a = 1;
    const b = 2;
    const expectedSum = 3;

    //Act
    const result = sum(a, b);

    //Assert
    expect(result).toBe(expectedSum);
  });

  test("isEven should return true for even numbers", () => {
    // Arrage
    const n = 4;
    const expectedEven = true;

    //Act
    const result = isEven(n);

    //Assert
    expect(result).toBe(expectedEven);
    expect(result).toBeTruthy();
  });

  test("not Even should return false for odd numbers", () => {
    // Arrage
    const n = 3;
    const expected = false;

    //Act
    const result = isEven(n);

    //Assert
    expect(result).toBe(expected);
    expect(result).toBeFalsy();
  });
});

describe("Testing divide function", () => {
  test("divides div 4/2 to equal 2", () => {
    // Arrage
    const a = 4;
    const b = 2;
    const expected = 2;

    //Act
    const result = divide(a, b);

    //Assert
    expect(result).toBe(expected);
    // expect(result).toBeFalsy();
  });

  test("divide div -4/2 to equal -2", () => {
    // Arrage
    const a = -4;
    const b = 2;
    const expected = -2;

    //Act
    const result = divide(a, b);

    //Assert
    // expect(result).toThrow("expected");
    expect(result).toBe(expected);
  });
  test("throws an error when dividing by zero", () => {
    // Arrage

    expect(() => divide(4, 0)).toThrow("Cannot divide by zero");
  });
});

describe("Testing multiple function", () => {
  test("throws an error when multiple by number", () => {
    // Arrage
    const a = 4;
    const b = 2;
    const expected = 8;

    //Act
    const result = multiple(a, b);

    //Assert
    // expect(result).toThrow("expected");
    expect(result).toBe(expected);
  });
  test("throws an error when multiple by number", () => {
    // Arrage
    const a = -4;
    const b = 2;
    const expected = -8;

    //Act
    const result = multiple(a, b);

    //Assert
    // expect(result).toThrow("expected");
    expect(result).toBe(expected);
  });
  test("throws an error when multiple by number", () => {
    // Arrage
    const a = 4;
    const b = 0;
    const expected = 0;

    //Act
    const result = multiple(a, b);

    //Assert
    // expect(result).toThrow("expected");
    expect(result).toBe(expected);
  });
});
