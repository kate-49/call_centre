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

describe("will not allow call less than 2 hours in future", () => {
    cc = new CallCentre();
    const now = new Date().getTime();
    const yesterday = new Date(now - (1000 * 60 * 60 * 24))
    const twoHoursInPast = new Date(now - (1000 * 60 * 60 * 2));
    const oneHourInFuture = new Date(now + (1000 * 60 * 60));
    const twoHoursInFuture = new Date(now + (1000 * 60 * 60 * 2));

    cc = new CallCentre();
    const cases = [
        [yesterday, 'day is in past'],
        [twoHoursInPast, 'time cannot be in the past'],
        [oneHourInFuture, 'time must be over 2 hours in the future'],
        [twoHoursInFuture, 'time must be over 2 hours in the future'],
    ];
    test.each(cases)(
        "given %p as argument",
        (firstArg, errorThrown) => {
            expect(() => {cc.checkIfCallIsMinimumOfTwoHoursInFuture(firstArg)}).toThrow(errorThrown);
        }
    );
});

describe("will allow calls more than 2 hours in future", () => {
    cc = new CallCentre();
    const now = new Date().getTime();
    const twoHoursOneMinInFuture = new Date(now + (1000 * 60 * 60 * 2) + (1000 * 60));
    const threeHoursInFuture = new Date(now + (1000 * 60 * 60 * 3));

    cc = new CallCentre();
    const cases = [
        [twoHoursOneMinInFuture, true],
        [threeHoursInFuture, true],
    ];
    test.each(cases)(
        "given %p as argument, returns %p",
        (firstArg, expectedResult) => {
            const result = cc.checkIfCallIsMinimumOfTwoHoursInFuture(firstArg);
            expect(result).toEqual(expectedResult);
        }
    );
});

describe("will add six working days to date", () => {
    cc = new CallCentre();
    const cases = [
        //monday
        [new Date('2022-11-03 09:01'), new Date('2022-11-10 09:01')],
        [new Date('2022-11-04 09:01'), new Date('2022-11-11 09:01')],
        [new Date('2022-11-05 09:01'), new Date('2022-11-12 09:01')],
        [new Date('2022-11-06 09:01'), new Date('2022-11-13 09:01')],
        [new Date('2022-11-07 09:01'), new Date('2022-11-13 09:01')],
        [new Date('2022-11-08 09:01'), new Date('2022-11-15 09:01')],
        [new Date('2022-11-09 09:01'), new Date('2022-11-16 09:01')],
    ];
    test.each(cases)(
        "given %p as argument, returns %p",
        (firstArg, expectedResult) => {
            const result = cc.getSixWorkingDaysInFutureFromDate(firstArg);
            expect(result).toEqual(expectedResult);
        }
    );
});

describe("will not allow date over six working days in future", () => {
    cc = new CallCentre();
    const cases = [
        [new Date('2023-11-03 09:01'), 'date cannot be more than six days in future'],
        // [new Date('2022-11-04 09:01'), new Date('2022-11-11 09:01')],
    ];
    test.each(cases)(
        "given %p as argument",
        (firstArg, errorThrown) => {
            expect(() => {
                cc.checkIfCallIsLessThanSixDaysInFuture(firstArg)
            }).toThrow(errorThrown);
        }
    );
});