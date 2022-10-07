class CallCentre {

  constructor() {
  }

  /**
   * @param {Date} myDate The date
   */
  checkIfCallCentreOpen(myDate) {
    const hour = myDate.getHours();
    const day = myDate.getDay();
    const minutes = myDate.getMinutes();

    if (day === 1 || day === 2 || day === 3) {
      if (hour < 9 || hour >= 18) {
        throw "Monday, Tuesday, Wednesday: Centre not open";
      }
      return true;
    } else if (day === 4 || day === 5) {
      if (hour < 9 || hour >= 20) {
        throw "Thursday, Friday: Centre not open";
      }
      return true;
    } else if (day === 6) {
      if (hour < 9 || hour > 12 || (hour === 12 && minutes > 30)) {
        throw "Saturday: Centre not open";
      }
      return true;
    } else if (day === 0) {
      throw "Can't book appts on Sundays";
    }
    return true
  }

  checkIfCallIsMinimumOfTwoHoursInFuture(myDate) {
    const today = new Date();
    if (myDate.getDay() < today.getDay()) {
      throw "day is in past";
    } else if (myDate.getDay() === today.getDay() && myDate.getHours() < today.getHours()) {
      throw "time cannot be in the past";
    } else if (myDate.getDay() === today.getDay() && myDate.getHours() <= today.getHours() + 2) {
      throw "time must be over 2 hours in the future";
    }
    return true
  }

  /**
   * @param {Date} myDate The date
   */
  callCentre(myDate) {
    if (!(myDate instanceof Date)) {
      throw "Invalid data type given";
    }
    this.checkIfCallCentreOpen(myDate)

    this.checkIfCallIsMinimumOfTwoHoursInFuture(myDate)

    return true
  }
}
module.exports = CallCentre;

//take requested time
// check time is valid format
//check whether call centre is open
//check whether call is more than 2 hours in future
// check call is not more than 6 days in future

//Boundary testing -
// 1 hour before opening on days,
// on open time
// just after opening on days,
// random time in middle of day,
// just before closing
// on closing
// after closing
// at weekend,
// just under 6 hours in future
// exactly 6 hours in future
// over 6 hours in future
// less than 2 hours in future
// exactly 2 hours in future
// more than 2 hours in future


