const callCentre = require('../models/call-centre');

test("Test only allows valid data type", () => {
  expect(() => {callCentre('string')}).toThrow("Invalid data type given");
  expect(() => {callCentre(12)}).toThrow("Invalid data type given");
  expect(() => {callCentre(['array', 2])}).toThrow("Invalid data type given");
});


describe("will not expect call centre to be open on weekdays before opening time", () => {
  const cases = [
      [new Date('2022-05-23 08:59')],
      [new Date('2022-05-24 08:59')],
      [new Date('2022-05-25 08:59')],
      [new Date('2022-05-26 08:59')],
      [new Date('2022-05-27 08:59')]
  ];
  test.each(cases)(
      "given %p as argument",
      (firstArg) => {
        expect(() => {callCentre(firstArg)}).toThrow("Centre not open before 9");
      }
  );
});

describe("will expect call centre to be open on weekdays on and after opening time", () => {
    const cases = [
        [new Date('2022-05-23 09:01'), 'call centre open'],
        [new Date('2022-05-24 09:01'), 'call centre open'],
        [new Date('2022-05-25 09:01'), 'call centre open'],
        [new Date('2022-05-26 09:01'), 'call centre open'],
        [new Date('2022-05-27 09:01'), 'call centre open']
    ];
    test.each(cases)(
        "given %p as argument, returns %p",
        (firstArg, expectedResult) => {
            const result = callCentre(firstArg);
            expect(result).toEqual(expectedResult);
        }
    );
});