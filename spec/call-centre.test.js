const CallCentre = require('../models/call-centre');

test("Test only allows valid data type", () => {
    cc = new CallCentre();

  expect(() => {cc.callCentre('string')}).toThrow("Invalid data type given");
  expect(() => {cc.callCentre(12)}).toThrow("Invalid data type given");
  expect(() => {cc.callCentre(['array', 2])}).toThrow("Invalid data type given");
});


describe("will not expect call centre to be open before opening time", () => {
    cc = new CallCentre();
  const cases = [
      [new Date('2022-10-03 08:59'), 'Monday, Tuesday, Wednesday: Centre not open'],
      [new Date('2022-10-04 05:59'), 'Monday, Tuesday, Wednesday: Centre not open'],
      [new Date('2022-10-05 03:59'), 'Monday, Tuesday, Wednesday: Centre not open'],
      [new Date('2022-10-06 01:59'), 'Thursday, Friday: Centre not open'],
      [new Date('2022-10-07 00:59'), 'Thursday, Friday: Centre not open'],
      [new Date('2022-10-08 08:59'), 'Saturday: Centre not open'],
  ];
  test.each(cases)(
      "given %p as argument",
      (firstArg, errorThrown) => {
        expect(() => {cc.checkIfCallCentreOpen(firstArg)}).toThrow(errorThrown);
      }
  );
});


describe("will not expect call centre to be open after closing time", () => {
    cc = new CallCentre();
    const cases = [
        //monday
        [new Date('2022-10-03 18:01'), 'Monday, Tuesday, Wednesday: Centre not open'],
        [new Date('2022-10-04 18:01'), 'Monday, Tuesday, Wednesday: Centre not open'],
        [new Date('2022-10-05 18:01'), 'Monday, Tuesday, Wednesday: Centre not open'],
        [new Date('2022-10-06 20:01'), 'Thursday, Friday: Centre not open'],
        [new Date('2022-10-07 20:01'), 'Thursday, Friday: Centre not open'],
        [new Date('2022-10-08 12:31'), 'Saturday: Centre not open'],
        [new Date('2022-10-08 13:01'), 'Saturday: Centre not open'],

    ];
    test.each(cases)(
        "given %p as argument",
        (firstArg, errorThrown) => {
            expect(() => {cc.checkIfCallCentreOpen(firstArg)}).toThrow(errorThrown);
        }
    );
});

describe("will not expect call centre to be open on Sundays", () => {
    cc = new CallCentre();
    const cases = [
        [new Date('2022-10-02 10:59')],
        [new Date('2022-10-09 01:59')],
    ];
    test.each(cases)(
        "given %p as argument",
        (firstArg) => {
            expect(() => {cc.checkIfCallCentreOpen(firstArg)}).toThrow("Can't book appts on Sundays");
        }
    );
});

describe("will expect call centre to be open 9 to 6 monday to wednesday", () => {
    cc = new CallCentre();
    const cases = [
        //monday
        [new Date('2022-10-03 09:01'), true],
        [new Date('2022-10-03 12:00'), true],
        [new Date('2022-10-03 17:59'), true],
        //tuesday
        [new Date('2022-10-04 09:01'), true],
        [new Date('2022-10-04 12:00'), true],
        [new Date('2022-10-04 17:59'), true],
        //wednesday
        [new Date('2022-10-05 09:01'), true],
        [new Date('2022-10-05 12:00'), true],
        [new Date('2022-10-05 17:59'), true],
        [new Date('2022-10-03 09:01'), true],
    ];
    test.each(cases)(
        "given %p as argument, returns %p",
        (firstArg, expectedResult) => {
            const result = cc.checkIfCallCentreOpen(firstArg);
            expect(result).toEqual(expectedResult);
        }
    );
});

describe("will expect call centre to be open 9 to 8 thursday to friday", () => {
    cc = new CallCentre();
    const cases = [
        //thursday
        [new Date('2022-10-06 09:00'), true],
        [new Date('2022-10-06 09:01'), true],
        [new Date('2022-10-06 19:59'), true],
        //friday
        [new Date('2022-10-07 09:00'), true],
        [new Date('2022-10-07 09:01'), true],
        [new Date('2022-10-07 19:59'), true],
    ];
    test.each(cases)(
        "given %p as argument, returns %p",
        (firstArg, expectedResult) => {
            const result = cc.checkIfCallCentreOpen(firstArg);
            expect(result).toEqual(expectedResult);
        }
    );
});

