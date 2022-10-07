const callCentre = require('../models/call-centre');

test("Test only allows valid data type", () => {
  expect(() => {callCentre('string')}).toThrow("Invalid data type given");
  expect(() => {callCentre(12)}).toThrow("Invalid data type given");
  expect(() => {callCentre(['array', 2])}).toThrow("Invalid data type given");
});


describe("will not expect call centre to be open on weekdays before opening time", () => {
  const cases = [
      //monday
      [new Date('2022-10-03 08:59')],
      [new Date('2022-10-04 05:59')],
      [new Date('2022-10-05 03:59')],
      [new Date('2022-10-06 01:59')],
      //friday
      [new Date('2022-10-07 00:59')],
  ];
  test.each(cases)(
      "given %p as argument",
      (firstArg) => {
        expect(() => {callCentre(firstArg)}).toThrow("Centre not open before 9");
      }
  );
});

describe("will not expect call centre to be open on weekends", () => {
    const cases = [
        //saturday
        [new Date('2022-10-01 03:59')],
        [new Date('2022-10-08 13:59')],
        //sunday
        [new Date('2022-10-02 10:59')],
        [new Date('2022-10-09 01:59')],

    ];
    test.each(cases)(
        "given %p as argument",
        (firstArg) => {
            expect(() => {callCentre(firstArg)}).toThrow("Can't book appts at weekend");
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